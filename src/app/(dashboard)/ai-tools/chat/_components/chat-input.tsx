import React from "react";
import { Input } from "@base-ui/react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t bg-background/85 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-4xl items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3 shadow-sm">
        <Input
          value={value}
          placeholder="Ask a career question..."
          className={cn(
            "h-12 flex-1 border-0 bg-transparent px-4 text-sm outline-none ring-0 placeholder:text-muted-foreground",
          )}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button
          size="icon"
          className="h-11 w-11 rounded-xl"
          onClick={onSend}
          disabled={loading || !value.trim()}
        >
          {loading ? "..." : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

