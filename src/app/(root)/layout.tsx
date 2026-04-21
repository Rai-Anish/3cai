import React from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";

// Destructure children from the props object
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen 2xl:max-w-2xl mx-auto bg-background text-foreground transition-colors duration-500">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
