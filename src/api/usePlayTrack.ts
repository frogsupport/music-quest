import { useCallback } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { useSpotifyWebPlaybackContext } from "../providers/SpotifyWebPlaybackProvider";

export function usePlayTrack() {
  const { sdk } = useSpotifySdkContext();
  const { deviceId } = useSpotifyWebPlaybackContext();

  const playTrack = useCallback(
    async (trackUris: string[]) => {
      await sdk.player.startResumePlayback(deviceId, undefined, trackUris);
    },
    [deviceId, sdk.player],
  );

  return { playTrack };
}
