// src/app/(auth)/reset-password/page.tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

const MIN_LENGTH = 8;

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-destructive" };
  if (score <= 3) return { score, label: "Fair", color: "bg-yellow-400" };
  return { score, label: "Strong", color: "bg-primary" };
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, setState] = React.useState<State>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const strength = getStrength(password);
  const mismatch = confirm.length > 0 && password !== confirm;
  const isValid =
    password.length >= MIN_LENGTH && password === confirm && token;

  // No token in URL — link is broken or expired
  if (!token) {
    return (
      <div>
        <div className="text-center">
          <h1 className="font-mono text-xl font-bold text-foreground">
            Invalid reset link
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            This link is missing a reset token. It may be expired or malformed.
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div>
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-mono text-xl font-bold text-foreground">
            Password updated
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your password has been changed successfully.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 font-mono text-sm font-bold tracking-widest text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setState("loading");
    setErrorMsg("");

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (error) {
      const msg =
        error.code === "INVALID_TOKEN" || error.status === 400
          ? "This reset link has expired or already been used. Please request a new one."
          : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setState("error");
      return;
    }

    setState("success");
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="font-mono text-xl font-bold tracking-tight text-foreground">
          Set a new password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a strong password for your 3CAI account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            New password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={state === "loading"}
              placeholder="Min. 8 characters"
              className="text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength meter */}
          {password.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength.score ? strength.color : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className={`font-mono text-xs ${
                strength.score <= 1 ? "text-destructive" :
                strength.score <= 3 ? "text-yellow-500" : "text-primary"
              }`}>
                {strength.label}
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label
            htmlFor="confirm"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            Confirm password
          </Label>
          <Input
            id="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={state === "loading"}
            placeholder="Re-enter password"
            className={`text-white ${
              mismatch
                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                : "border-border focus:border-primary focus:ring-primary/20"
            }`}
          />
          {mismatch && (
            <p className="font-mono text-xs text-destructive">Passwords do not match</p>
          )}
        </div>

        {/* Error */}
        {state === "error" && errorMsg && (
          <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
            <p className="text-xs text-destructive leading-relaxed">{errorMsg}</p>
            {errorMsg.includes("expired") && (
              <Link
                href="/forgot-password"
                className="mt-1 inline-block font-mono text-xs text-destructive underline"
              >
                Request a new link →
              </Link>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || state === "loading"}
          className="w-full rounded-md bg-primary px-4 py-3 font-mono text-sm font-bold tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "loading" ? "Updating…" : "Update Password"}
        </button>
      </form>
    </div>
  );
}



function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}