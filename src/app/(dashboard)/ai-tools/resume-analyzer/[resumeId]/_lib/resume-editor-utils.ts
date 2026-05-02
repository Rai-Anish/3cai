import type { ResumeAnalysis } from "@/lib/ai/resume/resume-types";

export function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function linesToHtml(text: string) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

  if (!lines.length) {
    return "<h1>Your Name</h1><p>Professional headline</p><h2>Summary</h2><p>Write your summary here.</p>";
  }

  return lines
    .map((line, index) => {
      const clean = escapeHtml(line.replace(/^-+\s*/, ""));
      if (index === 0) return `<h1>${clean}</h1>`;
      if (line.startsWith("-")) return `<ul><li>${clean}</li></ul>`;
      if (line === line.toUpperCase() && line.length < 42) return `<h2>${clean}</h2>`;
      return `<p>${clean}</p>`;
    })
    .join("");
}

export function resumeToContent(resume: any) {
  if (resume.resumeJson?.editor === "tiptap-v1" && resume.resumeJson.content) {
    return resume.resumeJson.content;
  }

  if (resume.resumeJson?.editor === "blocks-v1" && Array.isArray(resume.resumeJson.blocks)) {
    return linesToHtml(
      resume.resumeJson.blocks
        .map((block: any) => (block.type === "bullet" ? `- ${block.text}` : block.text))
        .join("\n"),
    );
  }

  return linesToHtml(resume.editedText ?? resume.originalText ?? "");
}

export function getEditorText(editor: any) {
  return editor?.getText({ blockSeparator: "\n" }) ?? "";
}

export function selectedOrSummary(editor: any, analysis: ResumeAnalysis | null) {
  if (!editor) return analysis?.summary ?? "";

  const { from, to } = editor.state.selection;
  const selected = editor.state.doc.textBetween(from, to, " ").trim();

  if (selected) return selected;

  const fullText = getEditorText(editor);
  const summaryMatch = fullText.match(/summary\s+([\s\S]{0,650})/i);

  return summaryMatch?.[1]?.trim() || analysis?.summary || fullText.slice(0, 650);
}

export function localScore(text: string) {
  let score = 35;

  if (/@/.test(text)) score += 10;
  if (/experience/i.test(text)) score += 12;
  if (/skills/i.test(text)) score += 8;
  if ((text.match(/^- /gm) ?? []).length >= 5) score += 10;
  if (/\d+%|\$\d+|\b\d+\b/.test(text)) score += 12;
  if (text.length > 1800) score += 13;

  return Math.min(100, score);
}

export function buildPrintHtml(title: string, html: string) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: A4; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #ffffff;
      color: #111827;
      font-family: Arial, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .resume {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 22px 28px;
      border-top: 4px solid #dfff8f;
    }
    h1 {
      margin: 0 0 8px;
      font-size: 34px;
      line-height: 1.08;
      font-weight: 800;
      text-align: center;
      color: #111111;
    }
    h2 {
      margin: 24px 0 10px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #9ca3af;
    }
    h3 {
      margin: 14px 0 3px;
      font-size: 16px;
      line-height: 1.25;
      color: #111111;
    }
    p {
      margin: 5px 0;
      font-size: 13px;
      line-height: 1.55;
      color: #1f2937;
    }
    ul, ol {
      margin: 7px 0;
      padding-left: 22px;
    }
    li {
      margin: 4px 0;
      font-size: 13px;
      line-height: 1.5;
      color: #1f2937;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 12px;
    }
    td, th {
      border: 1px solid #d1d5db;
      padding: 7px;
      vertical-align: top;
    }
    a { color: #111827; text-decoration: none; }
  </style>
</head>
<body>
  <main class="resume">${html}</main>
</body>
</html>`;
}
