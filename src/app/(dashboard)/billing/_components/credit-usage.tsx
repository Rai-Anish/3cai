"use client";

import { Zap, ZapOff } from "lucide-react"; // Added ZapOff for visual variety

export function CreditUsage({ 
  balance, 
  limit, 
  isFree, 
  isCancelled // New prop
}: { 
  balance: number; 
  limit: number; 
  isFree: boolean;
  isCancelled?: boolean; 
}) {
  const percentage = Math.min(Math.round((balance / limit) * 100), 100);
  const strokeDashoffset = 282.7 - (282.7 * percentage) / 100;
  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-between">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="45" fill="none" 
            stroke={isCancelled ? "#f43f5e" : "#bef264"} // Red stroke if cancelled
            strokeWidth="8"
            strokeDasharray="282.7"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
          <span className="text-3xl font-bold text-white leading-none">{percentage}%</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-tighter mt-1">Utilized</span>
        </div>
      </div>
      <div className="text-center mt-4">
        <h3 className="text-sm font-medium text-zinc-300">Computational Credits</h3>
        <p className="text-xs text-zinc-500 mt-1">{balance.toLocaleString()} / {limit.toLocaleString()} tokens remaining</p>
      </div>
    </div>
  );
}