import React from "react";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PROVIDERS } from "@/lib/ai/chat/providers-constant";


export type ChatProvider = (typeof PROVIDERS)[number]["value"];

type ChatInputProps = {
  value: string;
  loading: boolean;
  provider: ChatProvider;
  onChange: (value: string) => void;
  onProviderChange: (provider: ChatProvider) => void;
  onSend: () => void;
};

export function ChatInput({
  value,
  loading,
  provider,
  onChange,
  onProviderChange,
  onSend,
}: ChatInputProps) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const selected = PROVIDERS.find((p) => p.value === provider) ?? PROVIDERS[0];

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-background/85 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-4xl">
        {/* Input pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/70 p-3 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20">
          <Input
            value={value}
            placeholder="Ask a career question..."
            disabled={loading}
            className="h-11 flex-1 border-0 bg-transparent! px-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
          />

          {/* Divider */}
          <div className="h-6 w-px shrink-0 bg-border/60" />

          {/* Model selector */}
          <div ref={dropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary",
                open && "border-primary/40 text-primary",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  selected.value === "gemini" ? "bg-blue-500" : "bg-orange-500",
                )}
              />
              {selected.label}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>

            {open && (
              <div className="absolute bottom-full right-0 z-50 mb-2 w-52 overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg">
                <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  AI Model
                </div>
                {PROVIDERS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      onProviderChange(p.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/60",
                      p.value === provider && "bg-primary/5 text-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 shrink-0 rounded-full",
                        p.value === "gemini" ? "bg-blue-500" : "bg-orange-500",
                      )}
                    />
                    <span className="flex-1 font-medium">{p.label}</span>
                    <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                      {p.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send */}
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl"
            onClick={onSend}
            disabled={loading || !value.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-2 text-center text-[11px] text-muted-foreground/50">
          Career Coach AI · Responses may not always be accurate. Use your judgment.
        </p>
      </div>
    </div>
  );
}

