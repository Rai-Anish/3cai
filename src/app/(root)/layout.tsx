import React from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";

// Destructure children from the props object
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen antialiased p-8 bg-background text-foreground transition-colors duration-500">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
