// src/lib/ai/parser/parse-resume.ts
import mammoth from "mammoth";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function extractResumeText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "text/plain") {
    return buffer.toString("utf-8");
  }

  if (file.type === "application/pdf") {
    const blob = new Blob([new Uint8Array(buffer)], {
      type: "application/pdf",
    });

    const loader = new WebPDFLoader(blob, {
      splitPages: false,
      pdfjs: () => import("pdfjs-dist/legacy/build/pdf.mjs"),
    });

    const docs = await loader.load();
    return docs.map((doc) => doc.pageContent).join("\n\n");
  }

  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const parsed = await mammoth.extractRawText({ buffer });
    return parsed.value;
  }

  throw new Error("Unsupported resume file type");
}



