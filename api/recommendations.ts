import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const isAccessToken = (token: unknown): token is AccessToken =>
  typeof token === "object" &&
  token !== null &&
  "access_token" in token &&
  typeof (token as AccessToken).access_token === "string" &&
  "token_type" in token &&
  typeof (token as AccessToken).token_type === "string" &&
  "expires_in" in token &&
  typeof (token as AccessToken).expires_in === "number" &&
  "refresh_token" in token &&
  typeof (token as AccessToken).refresh_token === "string";

const RecommendationsSchema = z.object({
  recommendations: z.array(
    z.object({
      artist: z.string(),
      song: z.string(),
    }),
  ),
});

const claudeApiKey = process.env.CLAUDE_API_KEY;
const clientId = process.env.SPOTIFY_CLIENT_ID;

const client = new Anthropic({
  apiKey: claudeApiKey,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token, playlistId } = req.body;

  if (!isAccessToken(token) || typeof playlistId !== "string" || !clientId) {
    return res.status(400);
  }

  const sdk = SpotifyApi.withAccessToken(clientId, token);

  // Grab the tracks from that playlist
  const tracks = await sdk.playlists.getPlaylistItems(playlistId);

  const listOfTracks = tracks.items.map(
    (track) => `${track.track.artists[0]?.name}-${track.track.name}`,
  );

  // Feed that to an llm (claude api) and ask for recommendations that are like those songs but not on that list
  const message = await client.messages.parse({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system:
      "You are a music recommendation engine. Recommend songs similar to the user's playlist that are NOT already in it.",
    messages: [
      {
        role: "user",
        content: `Here are songs from my playlist:\n${listOfTracks.join("\n")}\n\nRecommend 10 songs I would enjoy that are NOT in the list above.`,
      },
    ],
    output_config: {
      format: zodOutputFormat(RecommendationsSchema),
    },
  });

  const recs = message.parsed_output?.recommendations ?? [];

  const resolvedTracks = (
    await Promise.all(
      recs.map(({ artist, song }) =>
        sdk
          .search(`track:${song} artist:${artist}`, ["track"])
          .then((r) => r.tracks?.items[0] ?? null)
          .catch(() => null),
      ),
    )
  ).filter((t) => t !== null);

  return res.status(200).json({
    recommendations: resolvedTracks,
    tracks: tracks.items,
  });
}
