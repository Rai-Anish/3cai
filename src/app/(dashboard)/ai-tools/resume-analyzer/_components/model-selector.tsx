// src/app/(dashboard)/ai-tools/resume-analyzer/_components/model-selector.tsx
"use client";

export function ModelSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-md border border-border bg-background p-1">
      {["gemini", "groq"].map((model) => (
        <button
          key={model}
          type="button"
          onClick={() => onChange(model)}
          className={`rounded px-3 py-2 font-mono text-xs uppercase tracking-widest transition ${
            value === model
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {model}
        </button>
      ))}
    </div>
  );
}

