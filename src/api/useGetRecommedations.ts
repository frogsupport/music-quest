import { useEffect, useState } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { PlaylistedTrack, Track } from "@spotify/web-api-ts-sdk";

type UseGetRecommendationsRequest = {
  playlistId?: string;
};

type Recommendations = {
  recommendations: Track[];
  tracks: PlaylistedTrack<Track>[];
};

export function useGetRecommendations({
  playlistId,
}: UseGetRecommendationsRequest) {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<
    Recommendations | undefined
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
        body: JSON.stringify({ token, playlistId }),
      });

      const data: Recommendations = await response.json();

      setRecommendations(data);
      setLoading(false);
    }

    asyncGetRecommendations();
  }, [playlistId, token]);

  return { data: recommendations, loading };
}
