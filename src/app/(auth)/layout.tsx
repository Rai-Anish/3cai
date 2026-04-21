import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3CAI Sign In",
  description: "Access your AI Resume Analyzer and Career Tools.",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // 1. min-h-screen ensures the container takes up the full height of the device
    // 2. The background effects are moved to the root to keep the flow clean
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-6">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Neon Bleed */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        
        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}