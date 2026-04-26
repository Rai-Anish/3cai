"use client";

import * as React from "react";
import { deleteAccountAction } from "@/app/actions/get-profile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlowBg } from "@/components/glow-bg";

interface DangerZoneCardProps {
  hasPassword: boolean;
  email: string;
}

export function DangerZoneCard({ hasPassword, email }: DangerZoneCardProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [error, setError] = React.useState("");

  // Must type email to confirm
  const emailConfirmed = confirm.trim().toLowerCase() === email.toLowerCase();
  const canSubmit = emailConfirmed && (!hasPassword || password.length > 0);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setError("");

    const res = await deleteAccountAction(hasPassword ? password : "");
    if (res.error) {
      setError(res.error);
      setStatus("error");
      return;
    }

    // Sign out and redirect
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="rounded-xl border border-destructive/20 bg-card/50 backdrop-blur-xl overflow-hidden">
      <GlowBg className="bg-destructive/5" />
      <div className="p-6">
        <h3 className="font-mono text-[13px] text-rose-500 uppercase tracking-[0.2em]  mb-5">
          Danger Zone
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold text-foreground">
              Delete Account
            </p>
            <p className="font-mono text-[10px] text-muted-foreground mt-1 leading-relaxed max-w-xs">
              Permanently removes your account, all data, and cancels any active
              subscription. This cannot be undone.
            </p>
          </div>
          {!open && (
            <Button
              variant={"destructive"}
              onClick={() => setOpen(true)}
              className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-destructive border border-destructive/30 hover:border-destructive/60 hover:bg-destructive/5 rounded px-3 py-1.5 transition-colors"
            >
              Delete
            </Button>
          )}
        </div>

        {open && (
          <form
            onSubmit={handleDelete}
            className="mt-5 space-y-3 border-t border-border/30 pt-5"
          >
            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="font-mono text-[10px] text-destructive leading-relaxed">
                ⚠ This action is irreversible. All your data, history, and token
                balance will be permanently deleted.
              </p>
            </div>

            {hasPassword && (
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 font-mono text-sm text-foreground focus:border-destructive focus:outline-none focus:ring-1 focus:ring-destructive/30 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Type your email to confirm
                <span className="ml-1 text-destructive/70 normal-case tracking-normal">
                  ({email})
                </span>
              </label>
              <input
                type="text"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={email}
                className="mt-1 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 font-mono text-sm text-foreground focus:border-destructive focus:outline-none focus:ring-1 focus:ring-destructive/30 transition-colors placeholder:text-muted-foreground/30"
              />
            </div>

            {error && (
              <p className="font-mono text-xs text-destructive">{error}</p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={!canSubmit || status === "loading"}
                className="flex-1 rounded-lg bg-destructive text-white font-mono text-xs font-bold uppercase tracking-widest py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Deleting…" : "Delete My Account"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setPassword("");
                  setConfirm("");
                  setError("");
                }}
                className="px-4 rounded-lg border border-border/50 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
