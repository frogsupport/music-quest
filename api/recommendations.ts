import Anthropic from "@anthropic-ai/sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";

const claudeApiKey = process.env.CLAUDE_API_KEY;

const client = new Anthropic({
  apiKey: claudeApiKey,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude. Be super brief." }],
    model: "claude-sonnet-4-6",
  });

  return res.status(200).json(message);
}
