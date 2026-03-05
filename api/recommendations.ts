import Anthropic from "@anthropic-ai/sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";

const claudeApiKey = process.env.CLAUDE_API_KEY;

const client = new Anthropic({
  apiKey: claudeApiKey,
});

// Grab the tracks from that playlist
// Feed that to an llm (claude api) and ask for recommendations that are like those songs but not on that list
// Take that list and search spotify for the tracks
// If we find the track, get the id for each track

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { accessToken, playlistId } = req.body;

  if (typeof accessToken !== "string" || typeof playlistId !== "string") {
    return res.status(400);
  }

  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude." }],
    model: "claude-sonnet-4-6",
  });

  return res.status(200).json(message);
}
