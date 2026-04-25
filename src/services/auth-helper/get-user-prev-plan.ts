
import { db } from "@/db";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schemas/index";
import { billingPlan } from "@/constant/billing";
import { sendEmail } from "@/lib/email";
import { getWelcomeTemplate, getUpdateTemplate } from "@/lib/email-template";
import { inngest } from "@/inngest/client";
import Stripe from "stripe";

export async function getPreviousPlanName(subscriptionId: string): Promise<string> {
  const row = await db.query.subscription.findFirst({
    where: eq(schema.subscription.id, subscriptionId),
    columns: { plan: true },
  });
  return row?.plan ?? "Previous Plan";
}


export async function getEmailByUserId(userId: string): Promise<string | null> {
  const dbUser = await db.query.user.findFirst({
    where: eq(schema.user.id, userId),
    columns: { email: true },
  });
  return dbUser?.email ?? null;
}


export function resolvePlan(planName?: string, fallbackPlan?: unknown) {
  const pluginPlan = fallbackPlan as
    | { name?: string; limits?: { tokens?: number } }
    | undefined;

  return (
    pluginPlan ??
    billingPlan.find((p) => p.name === planName)
  );
}

export function getPlanTokenLimit(planName?: string, fallbackPlan?: unknown) {
  const plan = resolvePlan(planName, fallbackPlan);
  return typeof plan?.limits?.tokens === "number" ? plan.limits.tokens : 100;
}


export async function updateUserSubscriptionTokens(
  userId: string,
  tokenLimit: number,
  nextResetAt?: Date | null
) {
  await db
    .update(schema.tokenBalance)
    .set({
      subscriptionBalance: tokenLimit,
      lastResetAt: new Date(),
      nextResetAt: nextResetAt ?? null,
      updatedAt: new Date(),
    })
    .where(eq(schema.tokenBalance.userId, userId));
}

export async function clearUserSubscriptionTokens(userId: string) {
  await db
    .update(schema.tokenBalance)
    .set({
      subscriptionBalance: 0,
      nextResetAt: null,
      updatedAt: new Date(),
    })
    .where(eq(schema.tokenBalance.userId, userId));
}

export function shouldRefreshTokensFromSubscriptionUpdate(
  previousAttributes?: Record<string, any>
) {
  const planChanged = !!previousAttributes?.plan || !!previousAttributes?.items;
  const periodChanged =
    previousAttributes?.current_period_end !== undefined ||
    previousAttributes?.current_period_start !== undefined;

  return planChanged || periodChanged;
}

export async function sendWelcomePlanEmail(userId: string, planName: string) {
  const email = await getEmailByUserId(userId);
  if (!email) return;

  await sendEmail({
    to: email,
    subject: `You're on ${planName} — 3CAI`,
    html: getWelcomeTemplate(planName),
  });
}

export async function sendPlanUpdatedEmail(
  userId: string,
  previousPlanName: string,
  newPlanName: string,
  newPlanTokens: number
) {
  const email = await getEmailByUserId(userId);
  if (!email) return;

  await sendEmail({
    to: email,
    subject: `Your plan has been updated to ${newPlanName} — 3CAI`,
    html: getUpdateTemplate(previousPlanName, newPlanName, newPlanTokens),
  });
}

export async function queueCancellationEmail(
  userId: string,
  planName: string,
  accessUntil?: Date | null
) {
  const email = await getEmailByUserId(userId);
  if (!email) return;

  await inngest.send({
    name: "email/subscription-cancelled",
    data: {
      email,
      planName,
      accessUntil: accessUntil ?? null,
    },
  });
}

export async function grantInvoicePaidTokens(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;

  const validReasons = [
    "subscription_cycle",
    "subscription_create",
    "subscription_update",
  ];

  if (!validReasons.includes(invoice.billing_reason || "")) return;

  type LineItemPricing = {
    price_details?: { price?: string };
  };

  const lineItem = invoice.lines.data[0];
  const pricing = lineItem?.pricing as LineItemPricing | null;
  const priceId = pricing?.price_details?.price;
  const plan = billingPlan.find((p) => p.priceId === priceId);

  if (!plan || plan.price === "$0") return;

  const stripeCustomerId = invoice.customer as string;

  const dbUser = await db.query.user.findFirst({
    where: eq(schema.user.stripeCustomerId, stripeCustomerId),
    columns: { id: true, email: true },
  });

  if (!dbUser) {
    console.warn(
      `No user found for Stripe Customer: ${stripeCustomerId}. Skipping token grant.`
    );
    return;
  }

  const nextResetAt =
    lineItem?.period?.end != null
      ? new Date(lineItem.period.end * 1000)
      : null;

  await updateUserSubscriptionTokens(
    dbUser.id,
    plan.limits.tokens,
    nextResetAt
  );

  console.log(`Granted ${plan.limits.tokens} tokens to ${dbUser.email}`);
}