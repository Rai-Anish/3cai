// (dashboard)/billing/_components/transaction-history.tsx
import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import Stripe from "stripe";

export function TransactionHistory({ invoices }: { invoices: Stripe.Invoice[] }) {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Transaction History</h2>
      </div>
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/50 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="p-4 font-medium">INVOICE ID</th>
              <th className="p-4 font-medium">DATE</th>
              <th className="p-4 font-medium">AMOUNT</th>
              <th className="p-4 font-medium">STATUS</th>
              <th className="p-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="text-zinc-300 hover:bg-zinc-900/30 transition-colors">
                <td className="p-4 font-mono text-xs uppercase">{inv.number}</td>
                <td className="p-4">{new Date(inv.created * 1000).toLocaleDateString()}</td>
                <td className="p-4 font-bold">${(inv.amount_paid / 100).toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase">
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                    <a href={inv.invoice_pdf || "#"} target="_blank">
                      <DownloadCloud className="w-4 h-4 mr-2" /> Download PDF
                    </a>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}