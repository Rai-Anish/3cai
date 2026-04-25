
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserSubscriptionStatus() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { session: null, isSubscribed: false };

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });

  const activeSubscription = subscriptions?.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  return { session, isSubscribed: !!activeSubscription };
}