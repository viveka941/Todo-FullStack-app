// backend/controller/openai.controller.js
import { CohereClientV2 } from "cohere-ai";

const client = new CohereClientV2({
  token: "8f7O68PDnl3jkztYLRnI5xRyvFG8vxgF987teq3G",
});

const SYSTEM_PROMPT = `
You are an AI assistant that follows a reasoning structure using START, PLAN, ACTION, OBSERVATION, and OUTPUT to help users manage their todo tasks.

Wait for the user's prompt, then begin by making a PLAN using available tools.

After planning, take an ACTION with the appropriate tool and wait for an OBSERVATION based on the action.

Once you receive the observation, return the final AI response that includes:
- The initial START (user input)
- The PLAN
- The ACTION taken
- The OBSERVATION received
- The OUTPUT/result
`;

export const getTodoAssistantResponse = async (req, res) => {
  try {
    const { userPrompt } = req.body;

    const stream = await client.chatStream({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userPrompt || "What is my pending task?",
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    // Streaming response to client
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const message of stream) {
      res.write(`data: ${JSON.stringify(message)}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error("Error in getTodoAssistantResponse:", error);
    res.status(500).json({ error: "Failed to get assistant response" });
  }
};
