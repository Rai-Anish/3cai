import { db } from "@/db";
import { subscription, tokenBalance, user } from "@/db/schemas";
import { and, eq, gte, sql } from "drizzle-orm";
import { billingPlan } from "@/constant/billing";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripeClient } from "@/lib/auth";


export async function getBillingDashboardData() {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session) throw new Error("Unauthorized")

    const userId = session.user?.id;

    // fetch subscription and balance
    const [userSub, balance] = await Promise.all([
        db.query.subscription.findFirst({
            where: eq(subscription.referenceId, userId),
        }),
        db.query.tokenBalance.findFirst({
            where: eq(tokenBalance.userId, userId),
        }),
    ]);

    // fetching invoice from stripe for real-time accuracy
    let invoices: Stripe.Invoice[] = [];

    if (userSub?.stripeCustomerId) {
        const stripeInvoices = await stripeClient.invoices.list({
            customer: userSub.stripeCustomerId,
            limit: 1000,
        })

        invoices = stripeInvoices.data;
    }

    return {
        subscription: userSub,
        balance,
        invoices,
    };

}
