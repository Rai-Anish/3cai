// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tokenBalance } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { billingPlan } from "@/constant/billing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_TOKEN_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Better Auth handles most subscription events itself.
  // We hook in here only to sync token balances.
  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.created"
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const priceId = subscription.items.data[0]?.price.id;
    const stripeCustomerId = subscription.customer as string;

    const plan = billingPlan.find((p) => p.priceId === priceId);
    if (!plan) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
    }

    // Look up user by stripeCustomerId
    const user = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.stripeCustomerId, stripeCustomerId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // On upgrade: set balance to new plan's token limit.
    // On paid plans: clear nextResetAt (Stripe billing cycle manages renewals).
    const isPaidPlan = plan.price !== "$0";

    await db
      .update(tokenBalance)
      .set({
        balance: plan.limits.tokens,
        lifetimeGranted: plan.limits.tokens,
        nextResetAt: isPaidPlan ? null : undefined, // paid = no biweekly reset
        updatedAt: new Date(),
      })
      .where(eq(tokenBalance.userId, user.id));
  }

  // Replenish tokens on each billing cycle renewal
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;

    // Only refill on real subscription renewals, not manual invoices
    if (invoice.billing_reason !== "subscription_cycle") {
      return NextResponse.json({ received: true });
    }

    const stripeCustomerId = invoice.customer as string;

    // Price ID is nested under pricing.price_details.price
    const lineItem = invoice.lines.data[0];
    const priceId = lineItem?.pricing?.price_details?.price;

    if (!priceId) return NextResponse.json({ received: true });

    const plan = billingPlan.find((p) => p.priceId === priceId);
    if (!plan || plan.price === "$0")
      return NextResponse.json({ received: true });

    const user = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.stripeCustomerId, stripeCustomerId),
    });

    if (!user) return NextResponse.json({ received: true });

    await db
      .update(tokenBalance)
      .set({
        balance: plan.limits.tokens,
        lastResetAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(tokenBalance.userId, user.id));
  }
  return NextResponse.json({ received: true });
}
