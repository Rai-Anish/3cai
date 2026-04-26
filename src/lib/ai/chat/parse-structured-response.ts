import type { StructuredAssistantResponse } from "./type";

export function parseStructuredResponse(
  raw: string,
): StructuredAssistantResponse {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const tryParse = (value: string) => {
    try {
      return JSON.parse(value) as {
        content?: unknown;
        input?: {
          kind?: unknown;
          options?: unknown;
        };
      };
    } catch {
      return null;
    }
  };

  const single = tryParse(cleaned) ?? tryParse(cleaned.replace(/\n/g, " "));
  if (single) {
    const content =
      typeof single.content === "string" && single.content.trim()
        ? single.content
        : raw;

    const kind = single.input?.kind;
    const options = single.input?.options;

    if (
      (kind === "single-select" || kind === "multi-select") &&
      Array.isArray(options) &&
      options.every((option) => typeof option === "string")
    ) {
      return {
        role: "assistant",
        content,
        input: { kind, options },
      };
    }

    return { role: "assistant", content };
  }

  const parts = cleaned
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(tryParse)
    .filter(Boolean);

  if (parts.length >= 2) {
    const merged = Object.assign({}, ...parts) as {
      content?: unknown;
      input?: {
        kind?: unknown;
        options?: unknown;
      };
    };

    const content =
      typeof merged.content === "string" && merged.content.trim()
        ? merged.content
        : raw;

    const kind = merged.input?.kind;
    const options = merged.input?.options;

    if (
      (kind === "single-select" || kind === "multi-select") &&
      Array.isArray(options) &&
      options.every((option) => typeof option === "string")
    ) {
      return {
        role: "assistant",
        content,
        input: { kind, options },
      };
    }

    return { role: "assistant", content };
  }

  return {
    role: "assistant",
    content: raw,
  };
}
