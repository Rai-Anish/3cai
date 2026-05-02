"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { TableKit } from "@tiptap/extension-table";
import { Loader2 } from "lucide-react";
import type { ResumeAnalysis, ResumeSuggestion } from "@/lib/ai/resume/resume-types";
import { AiReviewPanel } from "./ai-review-panel";
import { EditorCanvas } from "./editor-canvas";
import { EditorToolbar } from "./editor-toolbar";
import {
  buildPrintHtml,
  escapeHtml,
  getEditorText,
  localScore,
  resumeToContent,
  selectedOrSummary,
} from "../_lib/resume-editor-utils";

export default function ResumeWorkspace({ resume }: { resume: any }) {
  const printFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(resume.analysis ?? null);
  const [status, setStatus] = useState(resume.status);
  const [selectionText, setSelectionText] = useState("");
  const [editorText, setEditorText] = useState("");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      TextStyleKit,
      TableKit.configure({ table: { resizable: true } }),
    ],
    content: resumeToContent(resume),
    onCreate: ({ editor }) => {
      setEditorText(getEditorText(editor));
      setSelectionText(selectedOrSummary(editor, analysis));
    },
    onSelectionUpdate: ({ editor }) => setSelectionText(selectedOrSummary(editor, analysis)),
    onUpdate: ({ editor }) => {
      setEditorText(getEditorText(editor));
      setSelectionText(selectedOrSummary(editor, analysis));
    },
  });

  const score =
    status === "processing"
      ? localScore(editorText)
      : analysis?.score ?? resume.score ?? localScore(editorText);

  useEffect(() => {
    if (status !== "processing") return;

    const poll = window.setInterval(async () => {
      const res = await fetch(`/api/resume-analyzer/${resume.id}`);
      const data = await res.json();

      setStatus(data.status);
      if (data.status === "completed") setAnalysis(data.analysis);
    }, 1800);

    return () => window.clearInterval(poll);
  }, [resume.id, status]);

  function save() {
    if (!editor) return;

    startTransition(async () => {
      await fetch(`/api/resume-analyzer/${resume.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editedText: getEditorText(editor),
          resumeJson: {
            editor: "tiptap-v1",
            content: editor.getJSON(),
            html: editor.getHTML(),
          },
        }),
      });
    });
  }

  function reanalyze(instruction = "Full resume review.") {
    if (!editor) return;

    startTransition(async () => {
      setStatus("processing");

      await fetch(`/api/resume-analyzer/${resume.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editedText: getEditorText(editor),
          resumeJson: {
            editor: "tiptap-v1",
            content: editor.getJSON(),
            html: editor.getHTML(),
          },
          instruction,
          selectedText: selectedOrSummary(editor, analysis),
        }),
      });
    });
  }

  function exportPdf() {
    if (!editor || !printFrameRef.current?.contentWindow) return;

    const doc = printFrameRef.current.contentWindow.document;
    doc.open();
    doc.write(buildPrintHtml(resume.title || "resume", editor.getHTML()));
    doc.close();

    window.setTimeout(() => {
      printFrameRef.current?.contentWindow?.focus();
      printFrameRef.current?.contentWindow?.print();
    }, 250);
  }

  function applySuggestion(suggestion: ResumeSuggestion) {
    if (!editor || !suggestion.after) return;

    const { from, to } = editor.state.selection;

    if (from !== to) {
      editor.chain().focus().insertContent(suggestion.after).run();
      return;
    }

    editor.chain().focus().insertContent(`<p>${escapeHtml(suggestion.after)}</p>`).run();
  }

  function improveSelection() {
    reanalyze("Rewrite the selected text with stronger grammar, clarity, and measurable impact.");
  }

  if (!editor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101012] text-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101012] text-foreground">
      <iframe ref={printFrameRef} className="fixed h-0 w-0 opacity-0" title="Resume export" />

      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="relative max-h-screen chat-scroll overflow-y-scroll min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(223,255,143,0.10),transparent_34%),#09090b]">
          <EditorToolbar editor={editor} />
          <EditorCanvas editor={editor} resume={resume} onImproveSelection={improveSelection} />
        </section>

        <AiReviewPanel
          resume={resume}
          score={score}
          status={status}
          analysis={analysis}
          selectionText={selectionText}
          isPending={isPending}
          onExportPdf={exportPdf}
          onSave={save}
          onReview={() => reanalyze()}
          onApplySuggestion={applySuggestion}
        />
      </div>
    </main>
  );
}











