import { useEffect } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { useSpotifyWebPlaybackContext } from "../providers/SpotifyWebPlaybackProvider";

type UsePlayTrackProps = {
  contextUri?: Parameters<
    ReturnType<
      typeof useSpotifySdkContext
    >["sdk"]["player"]["startResumePlayback"]
  >[1];
  trackUris?: Parameters<
    ReturnType<
      typeof useSpotifySdkContext
    >["sdk"]["player"]["startResumePlayback"]
  >[2];
};

export function usePlayTrack({ contextUri, trackUris }: UsePlayTrackProps) {
  const { sdk } = useSpotifySdkContext();
  const { deviceId } = useSpotifyWebPlaybackContext();

  useEffect(() => {
    async function asyncGetUserProfile() {
      await sdk.player.startResumePlayback(deviceId, contextUri, trackUris);
    }

    asyncGetUserProfile();
  }, [contextUri, deviceId, sdk.player, trackUris]);
}
