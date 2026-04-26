export type StructuredAssistantResponse = {
  role: "assistant";
  content: string;
  input?: {
    kind: "single-select" | "multi-select";
    options: string[];
  };
};

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};
