import { getBillingDashboardData } from "@/services/billing/billing.service";
import { billingPlan } from "@/constant/billing";
import { SubscriptionCard } from "./_components/subscription-card";
import { CreditUsage } from "./_components/credit-usage";
import { TransactionHistory } from "./_components/transaction-history";
import { PaymentMethods } from "./_components/payment-methods";

export default async function BillingPage() {
  const { subscription, balance, invoices } = await getBillingDashboardData();
  
  const currentPlan = billingPlan.find(p => p.name === (subscription?.plan ?? "Free"));
  const tokenLimit = currentPlan?.limits.tokens ?? 100;
  
  // Total usable balance from both your sub and top-ups
  const totalBalance = (balance?.subscriptionBalance ?? 0) + (balance?.creditBalance ?? 0);

    // FIXED: Added optional chaining and safe fallback for plan comparison
  const isFree = !subscription || subscription?.plan?.toLowerCase() === "free";

  return (
    <div className="max-w-6xl mx-auto p-8 bg-black min-h-screen text-zinc-100 font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-white italic uppercase">Billing Terminal</h1>
        <p className="text-zinc-500 text-sm">Manage your AI computational power and credit distribution.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SubscriptionCard 
            isFree={isFree}
            subscription={subscription} 
            tokenBalance={balance}
            planDetails={currentPlan} 
          />
        </div>
        <CreditUsage balance={totalBalance} limit={tokenLimit} isFree={isFree} isCancelled={subscription?.cancelAtPeriodEnd || false} />
      </div>

      <TransactionHistory invoices={invoices} />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <PaymentMethods />
        <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Need a custom enterprise tier?</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We provide bespoke solutions for high-volume neural processing and dedicated AI clusters.
            </p>
          </div>
          <button className="text-fuchsia-400 text-sm font-medium flex items-center gap-2 mt-4 hover:opacity-80 transition-opacity">
            TALK TO ARCHITECTURE TEAM →
          </button>
        </div>
      </div> */}
    </div>
  );
}