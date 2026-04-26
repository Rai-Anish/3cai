import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";

import { db } from "../db";
import * as schema from "../db/schemas";
import { billingPlan } from "@/constant/billing";
import { grantFreeTokens } from "../services/tokens/token-service";
import { inngest } from "../inngest/client";
import { sendEmail } from "./email";
import {
  getVerificationTemplate,
  getExistingAccountTemplate,
  getPasswordResetTemplate,
} from "./email-template";
import {
  clearUserSubscriptionTokens,
  getPlanTokenLimit,
  grantInvoicePaidTokens,
  queueCancellationEmail,
  resolvePlan,
  sendPlanUpdatedEmail,
  sendWelcomePlanEmail,
  shouldRefreshTokensFromSubscriptionUpdate,
  updateUserSubscriptionTokens,
} from "@/services/auth-helper/get-user-prev-plan";
import { after } from "next/server";

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, _request) => {
      after(async () => {
        await sendEmail({
          to: user.email,
          subject: "Reset your password — 3CAI",
          html: getPasswordResetTemplate(url),
        });
      });
    },
    onPasswordReset: async ({ user }, _request) => {
      console.log(`[auth] Password reset completed for ${user.email}`);
      // Optional: send a "your password was changed" confirmation email here
    },

    onExistingUserSignUp: async ({ user }) => {
      await sendEmail({
        to: user.email,
        subject: "Sign-in attempt on your account",
        html: getExistingAccountTemplate(),
      });
    },
  },

  emailVerification: {
    expiresIn: 60 * 60 * 24,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await db
        .delete(schema.verification)
        .where(eq(schema.verification.identifier, user.email));

      after(async () => {
        await sendEmail({
          to: user.email,
          subject: "Verify your account — 3CAI",
          html: getVerificationTemplate(url),
        });
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await grantFreeTokens(user.id);

          await inngest.send({
            name: "token/grant-free",
            data: { userId: user.id },
          });
        },
      },
    },
  },

  plugins: [
    nextCookies(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,

      subscription: {
        enabled: true,
        plans: billingPlan,

        onSubscriptionComplete: async ({ subscription, plan }) => {
          const tokenLimit = getPlanTokenLimit(subscription.plan, plan);

          await updateUserSubscriptionTokens(
            subscription.referenceId,
            tokenLimit,
            subscription.periodEnd ?? null,
          );

          const resolvedPlan = resolvePlan(subscription.plan, plan);
          const planName = resolvedPlan?.name ?? subscription.plan;

          await sendWelcomePlanEmail(subscription.referenceId, planName);
        },

        onSubscriptionCreated: async ({ subscription, plan }) => {
          const tokenLimit = getPlanTokenLimit(subscription.plan, plan);

          await updateUserSubscriptionTokens(
            subscription.referenceId,
            tokenLimit,
            subscription.periodEnd ?? null,
          );
        },

        onSubscriptionUpdate: async ({ event, subscription }) => {
          if (event) {
            const stripeSub = event.data.object as Stripe.Subscription;

            console.log("SUB UPDATE EVENT", {
              eventId: event.id,
              cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
              cancelAt: stripeSub.cancel_at,
              canceledAt: stripeSub.canceled_at,
              status: stripeSub.status,
            });
          }

          const previousAttributes = (event?.data.previous_attributes ??
            {}) as Record<string, unknown>;

          const shouldRefreshTokens =
            shouldRefreshTokensFromSubscriptionUpdate(previousAttributes) &&
            (subscription.status === "active" ||
              subscription.status === "trialing");

          if (shouldRefreshTokens) {
            const tokenLimit = getPlanTokenLimit(subscription.plan);
            await updateUserSubscriptionTokens(
              subscription.referenceId,
              tokenLimit,
              subscription.periodEnd ?? null,
            );
          }

          // Safe nested extraction
          const planObj =
            typeof previousAttributes.plan === "object" &&
            previousAttributes.plan !== null
              ? (previousAttributes.plan as Record<string, unknown>)
              : null;

          const itemsArr =
            typeof previousAttributes.items === "object" &&
            previousAttributes.items !== null
              ? ((previousAttributes.items as Record<string, unknown>)
                  .data as unknown[])
              : null;

          const firstItem =
            Array.isArray(itemsArr) && itemsArr.length > 0
              ? (itemsArr[0] as Record<string, unknown>)
              : null;

          const firstItemPrice =
            firstItem?.price !== null && typeof firstItem?.price === "object"
              ? (firstItem.price as Record<string, unknown>)
              : null;

          const prevPriceId =
            (typeof planObj?.id === "string" ? planObj.id : undefined) ??
            (typeof firstItemPrice?.id === "string"
              ? firstItemPrice.id
              : undefined);

          if (!prevPriceId) return;

          const prevPlan = billingPlan.find((p) => p.priceId === prevPriceId);
          const newPlan = billingPlan.find((p) => p.name === subscription.plan);

          await sendPlanUpdatedEmail(
            subscription.referenceId,
            prevPlan?.name ?? "Previous Plan",
            subscription.plan,
            newPlan?.limits.tokens ?? 0,
          );
        },

        onSubscriptionCancel: async ({
          event,
          subscription,
          stripeSubscription,
          cancellationDetails,
        }) => {
          console.log("SUB CANCEL EVENT", {
            eventId: event?.id,
            stripeSubscriptionId: stripeSubscription.id,
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
            cancelAt: stripeSubscription.cancel_at,
            canceledAt: stripeSubscription.canceled_at,
            status: stripeSubscription.status,
            cancellationDetails,
          });

          await queueCancellationEmail(
            subscription.referenceId,
            subscription.plan,
            subscription.periodEnd ?? null,
          );
        },

        onSubscriptionDeleted: async ({ subscription }) => {
          await clearUserSubscriptionTokens(subscription.referenceId);

          console.log(
            `Subscription fully deleted for user: ${subscription.referenceId}`,
          );
        },
      },

      onEvent: async (event) => {
        if (event.type === "invoice.paid") {
          await grantInvoicePaidTokens(event);
        }
      },
    }),
  ],
});
