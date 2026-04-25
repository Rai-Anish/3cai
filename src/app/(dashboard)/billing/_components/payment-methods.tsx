"use client";

import { CreditCard, Wallet, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PaymentMethods() {
  return (
    <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Payment Channels</h3>
        <button className="text-rose-400 text-xs font-bold flex items-center gap-1 hover:opacity-80">
          <Plus className="w-3 h-3" /> ADD METHOD
        </button>
      </div>

      <div className="space-y-3">
        {/* Primary Card */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-lime-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-white font-mono">•••• •••• •••• 9921</p>
              <p className="text-[10px] text-zinc-500 uppercase">Expires 12/28</p>
            </div>
          </div>
          <Badge className="bg-lime-500/10 text-lime-500 border-none text-[8px] font-bold">PRIMARY</Badge>
        </div>

        {/* Secondary Wallet */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/20 border border-transparent hover:border-zinc-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400 font-mono">Corporate Wallet (SEC-92)</p>
              <p className="text-[10px] text-zinc-600 uppercase">Digital Asset</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}