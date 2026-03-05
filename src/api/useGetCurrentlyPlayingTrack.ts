import { useEffect, useState } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { PlaybackState } from "@spotify/web-api-ts-sdk";

export function useGetPlaybackState() {
  const [track, setPlaybackState] = useState<undefined | PlaybackState>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const { sdk } = useSpotifySdkContext();

  useEffect(() => {
    async function asyncGetUserProfile() {
      setLoading(true);

      const data = await sdk.player.getPlaybackState();

      setPlaybackState(data);
      setLoading(false);
    }

    asyncGetUserProfile();
  }, [sdk.player]);

  return {
    data: track,
    loading,
  };
}
