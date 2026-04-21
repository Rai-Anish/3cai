"use client";

import { useState, useEffect, useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LuRefreshCw, LuLoader } from "react-icons/lu";

const COOLDOWN_SECONDS = 60;

export function ResendVerification({
  initialEmail,
}: {
  initialEmail?: string;
}) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (cooldown > 0) return;

    setLoading(true);
    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: "/verify-account",
      });

      if (error) {
        toast.error(error.message ?? "Failed to send verification email.");
      } else {
        toast.success("Verification email sent. Check your inbox.");
        setCooldown(COOLDOWN_SECONDS);
      }
    } finally {
      setLoading(false);
    }
  }, [email, cooldown]);

  const isDisabled = loading || cooldown > 0;

  return (
    <div className="w-full space-y-4">
      {!initialEmail && (
        <div className="space-y-2 text-left">
          <label className="text-xs font-medium text-muted-foreground">
            Email address
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>
      )}

      <Button
        onClick={handleResend}
        disabled={isDisabled}
        className="w-full"
        variant="outline"
      >
        {loading ? (
          <LuLoader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LuRefreshCw className="mr-2 h-4 w-4" />
        )}
        {cooldown > 0
          ? `Resend available in ${cooldown}s`
          : "Resend verification email"}
      </Button>

      {cooldown > 0 && (
        <p className="text-xs text-center text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder.
        </p>
      )}
    </div>
  );
}