import { useEffect, useState } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { Anthropic } from "@anthropic-ai/sdk/client";

type UseGetRecommendationsRequest = {
  playlistId?: string;
};

export function useGetRecommendations({
  playlistId,
}: UseGetRecommendationsRequest) {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    Anthropic.Messages.Message | undefined
  >(undefined);

  useEffect(() => {
    async function asyncGetRecommendations() {
      if (!token || !playlistId) {
        return;
      }
      setLoading(true);

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: token.access_token, playlistId }),
      });

      const data: Anthropic.Messages.Message = await response.json();

      setRecommendations(data);
      setLoading(false);
    }

    asyncGetRecommendations();
  }, [playlistId, token]);

  return { data: recommendations, loading };
}
