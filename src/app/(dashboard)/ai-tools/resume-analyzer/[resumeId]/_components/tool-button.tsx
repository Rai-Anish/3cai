"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  children?: ReactNode;
}

export const ToolButton = React.forwardRef<HTMLButtonElement, ToolButtonProps>(
  ({ label, active, children, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        title={label}
        onClick={onClick}
        {...props}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded transition",
          active 
            ? "bg-primary text-primary-foreground" 
            : "text-white/55 hover:bg-white/10 hover:text-white",
          className
        )}
      >
        <span className="[&_svg]:h-4 [&_svg]:w-4">{children}</span>
      </button>
    );
  }
);

ToolButton.displayName = "ToolButton";
