import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Editorial & Body Font (Manrope)
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Tech-Brutalist & Display Font (Space Grotesk)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Humane & Elegant Serif Font
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "3CAI",
  description: "High-fidelity AI ecosystem for career and design optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased noise-overlay`}
        suppressHydrationWarning
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
