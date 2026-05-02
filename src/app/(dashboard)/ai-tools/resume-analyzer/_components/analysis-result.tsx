// analysis-result.tsx
"use client";

import { SectionScoreCard } from "./section-score-card";
import { Button } from "@/components/ui/button";

export function AnalysisResult({
  analysis,
  onApplyText,
}: {
  analysis: any;
  onApplyText: (text: string) => void;
}) {
  if (!analysis) {
    return (
      <div className="rounded-md border border-border bg-card/70 p-5">
        <p className="font-mono text-sm text-muted-foreground">
          Feedback will appear here after analysis.
        </p>
      </div>
    );
  }

  const score = analysis?.score ?? analysis?.overall_score ?? 0;
  const summary = analysis?.summary ?? analysis?.summary_comment ?? "";
  const sections = Array.isArray(analysis?.sections)
    ? analysis.sections
    : Object.entries(analysis?.sections ?? {}).map(([name, value]: any) => ({
      name: name.replaceAll("_", " "),
      score: value.score,
      feedback: value.comment,
    }));

  return (
    <div className="rounded-md border border-border bg-card/70 p-5">
      <h2 className="mt-2 text-4xl font-bold">{score}/100</h2>
      <p className="mb-5 text-sm leading-6 text-muted-foreground">{summary}</p>

      {sections.map((section: any) => (
        <SectionScoreCard key={section.name} section={section} onApplyText={onApplyText} />
      ))}
    </div>
  );
}
