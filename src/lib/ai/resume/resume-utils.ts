// src/lib/resume/resume-utils.ts
import type { ResumeAnalysis, ResumeDocument, ResumeSuggestion } from "./resume-types";

export function resumeDocumentFromText(text: string): ResumeDocument {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

  return {
    basics: {
      fullName: lines[0] ?? "",
      headline: lines[1] ?? "",
      links: [],
      summary: lines.slice(2, 6).join(" "),
    },
    sections: [
      {
        id: "imported",
        title: "Imported Resume",
        type: "custom",
        items: [
          {
            id: "imported-item",
            title: "Resume Content",
            content: lines.slice(2).join("\n"),
            bullets: [],
          },
        ],
      },
    ],
  };
}

export function renderResumeDocumentToText(document: ResumeDocument) {
  const basics = document.basics ?? {};
  const output: string[] = [];

  if (basics.fullName) output.push(basics.fullName);
  if (basics.headline) output.push(basics.headline);
  if (basics.email || basics.phone || basics.location) {
    output.push([basics.email, basics.phone, basics.location].filter(Boolean).join(" | "));
  }
  if (basics.links?.length) output.push(basics.links.join(" | "));
  if (basics.summary) output.push(`\nSummary\n${basics.summary}`);

  for (const section of document.sections ?? []) {
    output.push(`\n${section.title}`);
    for (const item of section.items ?? []) {
      if (item.title) output.push(item.title);
      if (item.subtitle || item.meta || item.location) {
        output.push([item.subtitle, item.meta, item.location].filter(Boolean).join(" | "));
      }
      if (item.content) output.push(item.content);
      for (const bullet of item.bullets ?? []) output.push(`- ${bullet}`);
    }
  }

  return output.join("\n");
}

export function estimateResumeScore(document: ResumeDocument) {
  const text = renderResumeDocumentToText(document);
  let score = 35;

  if (document.basics?.fullName) score += 8;
  if (document.basics?.email) score += 8;
  if (document.basics?.summary && document.basics.summary.length > 80) score += 10;
  if ((document.sections ?? []).some((section) => section.type === "experience")) score += 14;
  if ((document.sections ?? []).some((section) => section.type === "skills")) score += 8;
  if (/\d+%|\$\d+|\b\d+\b/.test(text)) score += 10;
  if (text.length > 1800) score += 7;

  return Math.min(100, score);
}

export function normalizeResumeAnalysis(raw: any, fallbackText: string): ResumeAnalysis {
  const resumeDocument = raw?.resumeDocument ?? resumeDocumentFromText(raw?.improvedResumeText ?? fallbackText);

  return {
    score: raw?.score ?? raw?.overall_score ?? estimateResumeScore(resumeDocument),
    summary: raw?.summary ?? raw?.summary_comment ?? "Resume analysis completed.",
    sectionFeedback: Array.isArray(raw?.sectionFeedback)
      ? raw.sectionFeedback
      : Object.entries(raw?.sections ?? {}).map(([id, value]: any) => ({
          id,
          name: id.replaceAll("_", " "),
          score: value?.score ?? 0,
          feedback: value?.comment ?? "",
        })),
    suggestions: Array.isArray(raw?.suggestions) ? raw.suggestions : [],
    keywords: raw?.keywords ?? [],
    strengths: raw?.strengths ?? raw?.whats_good ?? [],
    issues: raw?.issues ?? raw?.needs_improvement ?? [],
    improvedResumeText: raw?.improvedResumeText ?? raw?.improved_resume_text ?? fallbackText,
    resumeDocument,
    originalText: fallbackText,
  };
}

export function applySuggestion(document: ResumeDocument, suggestion: ResumeSuggestion): ResumeDocument {
  if (!suggestion.after) return document;

  if (suggestion.field === "basics.summary") {
    return {
      ...document,
      basics: { ...document.basics, summary: suggestion.after },
    };
  }

  return {
    ...document,
    sections: document.sections.map((section) => {
      if (section.id !== suggestion.sectionId) return section;

      if (suggestion.field === "section.title") {
        return { ...section, title: suggestion.after };
      }

      return {
        ...section,
        items: section.items.map((item) => {
          if (suggestion.itemId && item.id !== suggestion.itemId) return item;

          if (suggestion.field?.startsWith("bullet:")) {
            const index = Number(suggestion.field.split(":")[1]);
            const bullets = [...(item.bullets ?? [])];
            bullets[index] = suggestion.after;
            return { ...item, bullets };
          }

          if (suggestion.field === "item.title") return { ...item, title: suggestion.after };
          if (suggestion.field === "item.subtitle") return { ...item, subtitle: suggestion.after };
          if (suggestion.field === "item.meta") return { ...item, meta: suggestion.after };
          if (suggestion.field === "item.content") return { ...item, content: suggestion.after };

          return item;
        }),
      };
    }),
  };
}
