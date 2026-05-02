// src/app/(dashboard)/ai-tools/resume-analyzer/_components/upload-zone.tsx
"use client";

import { useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";

export function UploadZone({
  model,
  targetRole,
  jobDescription,
  onCreated,
}: {
  model: string;
  targetRole: string;
  jobDescription: string;
  onCreated: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);
    formData.append("targetRole", targetRole);
    formData.append("jobDescription", jobDescription);

    const res = await fetch("/api/resume-analyzer", { method: "POST", body: formData });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      setLoading(false);
      setError(data?.error || "Resume upload failed");
      return;
    }

    onCreated(data.id);
  }

  return (
    <div className="mt-5">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-primary/40 bg-background/60 px-4 py-12 text-center transition hover:border-primary">
        {loading ? <Loader2 className="h-8 w-8 animate-spin text-primary" /> : <Upload className="h-8 w-8 text-primary" />}
        <span className="mt-3 font-mono text-xs uppercase tracking-widest">
          {loading ? "Creating workspace..." : "Upload resume"}
        </span>
        <span className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          PDF, DOCX, or TXT
        </span>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          disabled={loading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </label>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}
