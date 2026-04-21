import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { billingPlan } from "@/constant/billing";

// api/auth/stripe/webhook/route.ts
export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("stripe-signature") as string;

    // 1. Better Auth verifies the signature and updates its own tables
    const response = await auth.api.stripeWebhook({
        body,
        signature,
    });

    // 2. If signature check failed, return the 400 response Better Auth generated
    if (response.status !== 200) return response;

    // 3. Signature is confirmed. Parse the event for your CUSTOM TOKEN fulfillment
    const event = JSON.parse(body);
    
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        // Proceed with database update for tokens...
    }

    return response;
}