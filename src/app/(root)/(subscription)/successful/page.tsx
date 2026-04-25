import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBillingDashboardData } from "@/services/billing/billing.service";
// Optional: If you have a confetti component, import it here
// import Confetti from "@/components/ui/confetti"; 

export default async function BillingSuccessPage() {
    const { subscription } = await getBillingDashboardData();

    const planName = subscription?.plan;
    const nextBillingDate = subscription?.periodEnd
        ? new Date(subscription.periodEnd).toLocaleDateString()
        : null;

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
            {/* Optional: <Confetti /> */}
            
            <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.1)]">
                <p className="text-xs font-bold tracking-[0.3em] text-cyan-400 uppercase">
                    Congratulation
                </p>

                <h1 className="mt-4 text-4xl font-black tracking-tighter text-white uppercase italic">
                    Subscription Activated
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                    Your account has been upgraded to the <span className="text-white font-bold">{planName}</span>. 
                    Full access to all specialized tools and features is now unlocked.
                </p>

                {nextBillingDate && (
                    <p className="mt-4 text-sm font-mono text-zinc-300">
                        Next renewal on {nextBillingDate}
                    </p>
                )}

                <div className="mt-8 flex items-center justify-center gap-4">
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-900">
                        <Link href="/billing">View Invoice</Link>
                    </Button>

                    <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold">
                        <Link href="/workspace">Start Creating</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}