// src/app/(auth)/forgot-password/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type State = "idle" | "loading" | "success" | "error";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<State>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    setErrorMsg("");

    const { error } = await authClient.requestPasswordReset({
      email: email.trim().toLowerCase(),
      redirectTo: "/reset-password",
    });

    if (error) {
      console.error("[forgot-password]", error);
    }

    // Always show success to prevent email enumeration
    setState("success");
  };

  if (state === "success") {
    return (
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MailIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-mono text-xl font-bold tracking-tight text-foreground">
            Check your inbox
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            If an account exists for <strong>{email}</strong>, you&apos;ll
            receive a password reset link within a few minutes.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder.
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold tracking-tight text-foreground">
          Forgot your password?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Enter your email address and we&apos;ll send you a secure reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-wide pb-1 "
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "loading"}
            placeholder="you@example.com"
            className="text-white mb-2"
          />
        </div>

        {errorMsg && <p className="text-xs text-destructive">{errorMsg}</p>}

        <button
          type="submit"
          disabled={state === "loading" || !email.trim()}
          className="w-full rounded-md bg-primary px-4 py-3 font-mono text-sm font-bold tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "loading" ? "Sending…" : "Send Reset Link"}
        </button>
      </form>

      <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
        Remembered it?{" "}
        <Link href="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75"
      />
    </svg>
  );
}
