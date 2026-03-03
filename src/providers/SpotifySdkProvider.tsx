import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createContext, PropsWithChildren, useContext } from "react";

type SpotifySdkContext = {
  sdk: SpotifyApi;
};

const SpotifySdkContext = createContext<SpotifySdkContext | undefined>(
  undefined,
);

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export function SpotifySdkProvider(
  props: PropsWithChildren<{ token: AccessToken }>,
) {
  const { children, token } = props;

  const sdk = SpotifyApi.withAccessToken(clientId, token);

  return <SpotifySdkContext value={{ sdk }}>{children}</SpotifySdkContext>;
}

export const useSpotifySdkContext = () => {
  const context = useContext(SpotifySdkContext);

  if (!context) {
    throw new Error(
      "useSpotifySdkContext must be used within an SpotifySdkContext",
    );
  }

  return context;
};
