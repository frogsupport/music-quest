import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthProvider";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import useStartTransferPlayback from "../api/useStartTransferPlayback";

type SpotifyWebPlaybackContext = {
  player: Spotify.Player;
  deviceId: string;
};

const SpotifyWebPlaybackContext = createContext<
  SpotifyWebPlaybackContext | undefined
>(undefined);

export function SpotifyWebPlaybackProvider(props: PropsWithChildren) {
  const { children } = props;
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token.access_token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.connect();

      setPlayer(player);
    };
  }, [token]);

  useStartTransferPlayback({ deviceId, play: false });

  const isReady = player && deviceId;

  return isReady ? (
    <SpotifyWebPlaybackContext value={{ player, deviceId }}>
      {children}
    </SpotifyWebPlaybackContext>
  ) : (
    <LoadingScreen />
  );
}

export const useSpotifyWebPlaybackContext = () => {
  const context = useContext(SpotifyWebPlaybackContext);

  if (!context) {
    throw new Error(
      "useSpotifyWebPlaybackContext must be used within a SpotifyWebPlaybackProvider",
    );
  }

  return context;
};
