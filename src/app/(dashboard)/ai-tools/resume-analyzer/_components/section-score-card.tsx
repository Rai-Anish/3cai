// section-score-card.tsx
"use client";

import { Button } from "@/components/ui/button";

export function SectionScoreCard({
  section,
  onApplyText,
}: {
  section: any;
  onApplyText: (text: string) => void;
}) {
  return (
    <article className="rounded-md border border-border bg-background/70 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold">{section.name}</h3>
        <span className="font-mono text-xs text-primary">{section.score}/100</span>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">{section.feedback}</p>

      {section.rewrite && (
        <Button
          type="button"
          variant="ghost"
          className="mt-3 px-0 text-primary hover:text-primary"
          onClick={() => onApplyText(section.rewrite)}
        >
          Apply rewrite
        </Button>
      )}
    </article>
  );
}
