
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBillingDashboardData } from "@/services/billing/billing.service";

export default async function BillingCancelledPage() {
    const { subscription } = await getBillingDashboardData();

    const accessUntil = subscription?.cancelAt
        ? new Date(subscription.cancelAt).toLocaleDateString()
        : subscription?.periodEnd
            ? new Date(subscription.periodEnd).toLocaleDateString()
            : null;

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
            <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-10">
                <p className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">
                    Subscription Updated
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tighter text-white uppercase italic">
                    Cancellation Scheduled
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                    Your subscription remains active until the end of the current billing
                    cycle.
                </p>

                {accessUntil && (
                    <p className="mt-4 text-sm font-mono text-zinc-300">
                        Access until {accessUntil}
                    </p>
                )}

                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button variant="outline">
                        <Link href="/billing">Back to Billing</Link>
                    </Button>

                    <Button>
                        <Link href="/workspace">Back to Workspace</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
