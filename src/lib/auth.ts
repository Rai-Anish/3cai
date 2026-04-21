import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getVerificationTemplate, sendEmail } from "./email";
import { getExistingAccountTemplate } from "./email-template";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import * as schema from "../db/schemas";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";
import { billingPlan } from "@/constant/billing";
import { grantFreeTokens } from "./tokens/token-service";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

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
      // Cleaning old tokens because better auth doesn't cleanup old tokens
      await db
        .delete(schema.verification)
        .where(eq(schema.verification.identifier, user.email));

      await sendEmail({
        to: user.email,
        subject: "Verify your account",
        html: getVerificationTemplate(url),
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
          // Runs after every new user is created (email or social)
          await grantFreeTokens(user.id);
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
      },
    }),
  ],
});
