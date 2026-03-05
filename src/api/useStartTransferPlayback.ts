import { useEffect } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";

type UseStartTransferPlaybackProps = { deviceId?: string; play?: boolean };

export default function useStartTransferPlayback({
  deviceId,
  play,
}: UseStartTransferPlaybackProps) {
  const { sdk } = useSpotifySdkContext();

  useEffect(() => {
    async function asyncTransferPlayback() {
      if (!deviceId) {
        return;
      }

      await sdk.player.transferPlayback([deviceId], play);
    }

    asyncTransferPlayback();
  }, [deviceId, play, sdk.player]);
}
