"use client";

import * as React from "react";
import { updateNameAction } from "@/app/actions/get-profile";
import { GlowBg } from "@/components/glow-bg";

interface PersonalInfoCardProps {
  name: string;
  email: string;
  createdAt: Date;
  hasPassword: boolean;
}

export function PersonalInfoCard({
  name,
  email,
  createdAt,
  hasPassword,
}: PersonalInfoCardProps) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(name);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState("");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    if (value.trim() === name) {
      setEditing(false);
      return;
    }
    setStatus("loading");
    setError("");
    const res = await updateNameAction(value);
    if (res.error) {
      setError(res.error);
      setStatus("error");
    } else {
      setStatus("success");
      setEditing(false);
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const memberSince = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
      <GlowBg />
      <div className="p-6">
        <h3 className="font-mono text-[13px] uppercase tracking-[0.2em]  mb-5">
          Personal Info
        </h3>

        {/* Avatar + name row */}
        <div className="flex items-center gap-5 mb-6">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="font-mono text-xl font-bold text-primary">
                {initials}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary border-2 border-card" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Display name
            </p>
            {editing ? (
              <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") setEditing(false);
                }}
                className="mt-1 w-full bg-transparent border-b border-primary font-mono text-lg font-bold text-foreground focus:outline-none pb-0.5"
              />
            ) : (
              <p className="font-mono text-lg font-bold text-foreground truncate">
                {value}
              </p>
            )}
          </div>
        </div>

        {/* Fields grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Email
              </p>
              <p className="font-mono text-sm text-foreground mt-0.5">
                {email}
              </p>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Member Since
              </p>
              <p className="font-mono text-sm text-foreground mt-0.5">
                {memberSince}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Auth Method
              </p>
              <p className="font-mono text-sm text-foreground mt-0.5">
                {hasPassword ? "Password + Social" : "Social Only"}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="font-mono text-xs text-destructive mt-3">{error}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={status === "loading"}
                className="flex-1 rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "loading" ? "Saving…" : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setValue(name);
                  setError("");
                }}
                className="px-4 rounded-lg border border-border/50 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg border border-border/50 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-border transition-colors px-4 py-2.5"
            >
              Edit Name
            </button>
          )}
          {status === "success" && (
            <span className="font-mono text-xs text-primary self-center">
              ✓ Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
