"use client";

import type { ReactNode } from "react";

export function ToolButton({
  label,
  active,
  children,
  onClick,
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded transition ${
        active ? "bg-primary text-primary-foreground" : "text-white/55 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="[&_svg]:h-4 [&_svg]:w-4">{children}</span>
    </button>
  );
}

