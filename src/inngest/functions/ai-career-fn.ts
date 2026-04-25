import { inngest } from "../client";
import { aiCareerQnA } from "./career-agent";

export const aiCareerAgent = inngest.createFunction(
  {
    id: "aiCareerAgent",
    triggers: [{ event: "aiCareerAgent" }],
  },
  async ({ event, step }) => {
    const { userInput } = event.data;

    const response = await step.run("generate-career-response", async () => {
      const result = await aiCareerQnA.run(userInput);

      const firstTextMessage = Array.isArray(result.output)
        ? result.output.find(
            (message) =>
              typeof message === "object" &&
              message !== null &&
              "type" in message &&
              message.type === "text" &&
              "content" in message &&
              typeof message.content === "string",
          )
        : null;

      const content =
        firstTextMessage && "content" in firstTextMessage
          ? firstTextMessage.content
          : "";

      return {
        role: "assistant" as const,
        content,
      };
    });

    return response;
  },
);
