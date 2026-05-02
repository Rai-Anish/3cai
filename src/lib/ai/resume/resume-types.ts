// src/lib/resume/resume-types.ts
export type ResumeProvider = "gemini" | "groq";

export type ResumeBasics = {
  fullName?: string;
  headline?: string;
  email?: string;
  phone?: string;
  location?: string;
  links?: string[];
  summary?: string;
};

export type ResumeItem = {
  id: string;
  title?: string;
  subtitle?: string;
  meta?: string;
  location?: string;
  content?: string;
  bullets?: string[];
};

export type ResumeSection = {
  id: string;
  title: string;
  type: string;
  items: ResumeItem[];
};

export type ResumeDocument = {
  basics: ResumeBasics;
  sections: ResumeSection[];
};

export type ResumeSuggestion = {
  id: string;
  blockId?: string;
  category: "grammar" | "clarity" | "impact" | "ats" | "tone" | "structure";
  severity: "low" | "medium" | "high";
  label: string;
  sectionId?: string;
  itemId?: string;
  field?: string;
  before?: string;
  after: string;
  reasoning: string;
};

export type ResumeAnalysis = {
  score: number;
  summary: string;
  sectionFeedback: Array<{
    id: string;
    name: string;
    score: number;
    feedback: string;
  }>;
  suggestions: ResumeSuggestion[];
  keywords: string[];
  strengths: string[];
  issues: string[];
  improvedResumeText: string;
  resumeDocument: ResumeDocument;
  originalText?: string;
};

export function uid(prefix = "id") {
  return `${prefix}-${crypto.randomUUID()}`;
}
