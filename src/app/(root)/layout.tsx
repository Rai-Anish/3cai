import React from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";

// Destructure children from the props object
export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (
    <div className="min-h-screen antialiased p-8 bg-background text-foreground transition-colors duration-500">
      <Navbar session={session} />
      {children}
      <Footer />
    </div>
  );
}
