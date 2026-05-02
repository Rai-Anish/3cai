"use client";

import { Bot, Check, Download, Loader2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeAnalysis, ResumeSuggestion } from "@/lib/ai/resume/resume-types";
import { MetricRow } from "./metric-row";

export function AiReviewPanel({
  resume,
  score,
  status,
  analysis,
  selectionText,
  isPending,
  onExportPdf,
  onSave,
  onReview,
  onApplySuggestion,
}: {
  resume: any;
  score: number;
  status: string;
  analysis: ResumeAnalysis | null;
  selectionText: string;
  isPending: boolean;
  onExportPdf: () => void;
  onSave: () => void;
  onReview: () => void;
  onApplySuggestion: (suggestion: ResumeSuggestion) => void;
}) {
  const clarity = Math.min(100, score + 8);
  const impact = Math.max(0, score - 12);
  const keywords = Math.max(0, score - 6);

  return (
    <aside className="h-screen chat-scroll border-l overflow-y-scroll border-white/10 bg-[#19191d]">
      <div className="p-5">
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Resume File</p>
          <h1 className="mt-1 truncate text-lg font-bold text-white">{resume.title || "resume_v4_final"}.pdf</h1>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={onExportPdf}>
              <Download className="mr-2 h-4 w-4" />
              Print PDF
            </Button>
            <Button variant="outline" onClick={onSave} disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button className="col-span-2" onClick={onReview} disabled={status === "processing" || isPending}>
              {status === "processing" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              AI Review
            </Button>
          </div>

          <p className="mt-2 text-xs leading-5 text-white/45">
            In the print dialog, turn off Headers and footers for a clean PDF.
          </p>
        </section>

        <section className="mt-6 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-lg font-bold text-white">AI Smart Review</h2>
              <p className="text-xs text-white/55">Live analysis based on selected text.</p>
            </div>
          </div>

          <div className="mt-7 grid place-items-center">
            <div
              className="grid h-32 w-32 place-items-center rounded-full"
              style={{ background: `conic-gradient(var(--primary) ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full bg-[#19191d] text-center">
                <div>
                  <p className="text-3xl font-bold text-white">{score}%</p>
                  <p className="font-mono text-[10px] uppercase text-white/50">Strong</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm leading-6 text-white/70">
            {analysis?.summary ?? "Select resume text to get focused suggestions, or review the whole document."}
          </p>
        </section>

        <section className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Current Context</p>
          <div className="mt-2 rounded-md bg-[#222228] p-3 text-xs leading-5 text-white/60">
            {selectionText || "No text selected. AI will use your summary or first section."}
          </div>

          <div className="mt-4 space-y-3">
            <MetricRow label="Clarity" value={clarity} color="bg-primary" />
            <MetricRow label="Impact" value={impact} color="bg-secondary" />
            <MetricRow label="Keywords" value={keywords} color="bg-accent" />
          </div>
        </section>

        <section className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Actionable Fixes</p>

          {status === "processing" && (
            <div className="mt-3 flex items-center gap-3 rounded-md bg-[#222228] p-4 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Reviewing your resume...
            </div>
          )}

          {status !== "processing" && !(analysis?.suggestions?.length ?? 0) && (
            <div className="mt-3 rounded-md bg-[#222228] p-4 text-sm text-white/60">
              No suggestions yet. Select text or run Review.
            </div>
          )}

          <div className="mt-3 space-y-3">
            {(analysis?.suggestions ?? []).map((suggestion, index) => (
              <article key={suggestion.id ?? index} className="rounded-md border-l-4 border-primary bg-[#222228] p-4">
                <p className="text-sm font-bold text-white">{suggestion.label}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{suggestion.reasoning}</p>

                {suggestion.after && (
                  <p className="mt-3 rounded bg-[#19191d] p-3 text-xs leading-5 text-white/65">
                    {suggestion.after}
                  </p>
                )}

                <Button className="mt-3 w-full" variant="outline" onClick={() => onApplySuggestion(suggestion)}>
                  <Check className="mr-2 h-4 w-4" />
                  Apply to selection
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

