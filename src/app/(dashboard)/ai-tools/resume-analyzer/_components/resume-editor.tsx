// resume-editor.tsx
"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  function downloadTxt() {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "improved-resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-md border border-border bg-card/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Editable Draft
          </p>
          <h2 className="mt-1 text-xl font-bold">Resume Editor</h2>
        </div>

        <Button type="button" variant="outline" onClick={downloadTxt}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your editable resume draft will appear here..."
        className="min-h-170 w-full resize-none rounded-md border border-border bg-background px-4 py-4 font-mono text-sm leading-6 outline-none focus:border-primary"
      />
    </div>
  );
}
