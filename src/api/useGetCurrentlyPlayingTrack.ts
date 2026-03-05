import { useEffect, useState } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { TrackItem } from "@spotify/web-api-ts-sdk";

export function useGetCurrentlyPlayingTrack() {
  const [track, setTrack] = useState<undefined | TrackItem>(undefined);
  const [loading, setLoading] = useState(false);
  const { sdk } = useSpotifySdkContext();
  const [random, setRandom] = useState(crypto.randomUUID());

  useEffect(() => {
    async function asyncGetUserProfile() {
      setLoading(true);

      const data = await sdk.player.getCurrentlyPlayingTrack();

      setTrack(data.item);
      setLoading(false);
    }

    asyncGetUserProfile();
  }, [sdk.player, random]);

  return {
    data: track,
    loading,
    refetch: () => setRandom(crypto.randomUUID()),
  };
}
