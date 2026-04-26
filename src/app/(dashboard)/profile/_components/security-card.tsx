"use client";

import * as React from "react";
import { changePasswordAction } from "@/app/actions/get-profile";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { GlowBg } from "@/components/glow-bg";

interface LinkedAccount {
  providerId: string;
  accountId: string;
  createdAt: Date;
}

interface SecurityCardProps {
  linkedAccounts: LinkedAccount[];
  hasPassword: boolean;
}

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  credential: "Password",
};

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  google: (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  ),
  github: (
    <svg
      className="h-4 w-4 text-foreground"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  credential: (
    <svg
      className="h-4 w-4 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
      />
    </svg>
  ),
};

function PasswordSection({ hasPassword }: { hasPassword: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState("");
  const [next, setNext] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState("");

  const strength = (() => {
    let s = 0;
    if (next.length >= 8) s++;
    if (next.length >= 12) s++;
    if (/[A-Z]/.test(next)) s++;
    if (/[0-9]/.test(next)) s++;
    if (/[^A-Za-z0-9]/.test(next)) s++;
    return s;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const res = await changePasswordAction(current, next);
    if (res.error) {
      setError(res.error);
      setStatus("error");
    } else {
      setStatus("success");
      setCurrent("");
      setNext("");
      setOpen(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="py-4 border-b border-border/30 last:border-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs font-semibold text-foreground">
            Password
          </p>
          <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
            {hasPassword
              ? "Last changed recently"
              : "No password set — social login only"}
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary border border-border/40 hover:border-primary/40 rounded px-3 py-1.5 transition-colors"
        >
          {open ? "Cancel" : hasPassword ? "Change" : "Set Password"}
        </button>
      </div>

      {status === "success" && (
        <p className="font-mono text-xs text-primary mt-2">
          ✓ Password updated successfully
        </p>
      )}

      {open && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {hasPassword && (
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Current Password
              </label>
              <input
                type={show ? "text" : "password"}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
              />
            </div>
          )}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2.5 pr-10 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {show ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>

            {/* Strength bar */}
            {next.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                      i <= strength
                        ? strength <= 1
                          ? "bg-destructive"
                          : strength <= 3
                            ? "bg-yellow-400"
                            : "bg-primary"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="font-mono text-xs text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={
              status === "loading" || !next || (hasPassword && !current)
            }
            className="w-full rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "loading" ? "Updating…" : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

function LinkedAccountRow({ account }: { account: LinkedAccount }) {
  const label = PROVIDER_LABELS[account.providerId] ?? account.providerId;
  const icon = PROVIDER_ICONS[account.providerId] ?? null;
  const isCredential = account.providerId === "credential";

  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-muted/40 border border-border/30 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-mono text-xs font-semibold text-foreground">
            {label}
          </p>
          {!isCredential && (
            <p className="font-mono text-[10px] text-muted-foreground">
              Connected
            </p>
          )}
        </div>
      </div>
      <span className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
        Active
      </span>
    </div>
  );
}

export function SecurityCard({
  linkedAccounts,
  hasPassword,
}: SecurityCardProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
      <GlowBg className="bg-success/5" />
      <div className="p-6">
        <h3 className="font-mono text-[13px] uppercase tracking-[0.2em]  mb-5">
          Security
        </h3>

        <PasswordSection hasPassword={hasPassword} />

        {/* Linked accounts */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
            Connected Accounts
          </p>
          {linkedAccounts.length === 0 ? (
            <p className="font-mono text-xs text-muted-foreground">
              No accounts linked.
            </p>
          ) : (
            linkedAccounts.map((a) => (
              <LinkedAccountRow
                key={`${a.providerId}-${a.accountId}`}
                account={a}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
