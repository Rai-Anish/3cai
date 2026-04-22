// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tokenBalance, user } from "@/db/schemas";
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
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "invoice.paid") { 
    const invoice = event.data.object as Stripe.Invoice;

    const validReasons = [
      "subscription_cycle",
      "subscription_create",
      "subscription_update", 
    ];
    if (!validReasons.includes(invoice.billing_reason || "")) {
      return NextResponse.json({ received: true });
    }

    type LineItemPricing = {
      price_details?: { price?: string };
    };

    const lineItem = invoice.lines.data[0];
    const pricing = lineItem?.pricing as LineItemPricing | null;
    const priceId = pricing?.price_details?.price;
    const plan = billingPlan.find((p) => p.priceId === priceId);

    if (!plan || plan.price === "$0") {
      console.warn(`Webhook received for unknown or free priceId: ${priceId}`);
      return NextResponse.json({ received: true });
    }

    const stripeCustomerId = invoice.customer as string;
    const dbUser = await db.query.user.findFirst({
      where: eq(user.stripeCustomerId, stripeCustomerId),
    });

    // SAFEGUARD: If user isn't in DB, return 200 so Stripe stops retrying
    if (!dbUser) {
      console.warn(`No user found for Stripe Customer: ${stripeCustomerId}. Skipping token grant.`);
      return NextResponse.json({ received: true });
    }

    const nextResetAt = new Date(lineItem.period.end * 1000);

    await db
      .update(tokenBalance)
      .set({
        subscriptionBalance: plan.limits.tokens,
        lastResetAt: new Date(),
        nextResetAt: nextResetAt,
        updatedAt: new Date(),
      })
      .where(eq(tokenBalance.userId, dbUser.id));

    console.log(`Granted ${plan.limits.tokens} tokens to ${dbUser.email}`);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const stripeCustomerId = subscription.customer as string;

    const dbUser = await db.query.user.findFirst({
      where: eq(user.stripeCustomerId, stripeCustomerId),
    });

    // SAFEGUARD: Simply check if user exists before attempting update
    if (dbUser) {
      await db
        .update(tokenBalance)
        .set({
          subscriptionBalance: 0,
          nextResetAt: null,
          updatedAt: new Date(),
        })
        .where(eq(tokenBalance.userId, dbUser.id));
    } else {
      console.log(`User for ${stripeCustomerId} already removed from database.`);
    }
  }

  return NextResponse.json({ received: true });
}
