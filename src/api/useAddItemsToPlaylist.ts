import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { useCallback } from "react";

type UseAddItemsToPlaylistProps = {
  playlistId?: Parameters<SpotifyApi["playlists"]["addItemsToPlaylist"]>[0];
  uris?: Parameters<SpotifyApi["playlists"]["addItemsToPlaylist"]>[1];
};

export default function useAddItemsToPlaylist() {
  const { sdk } = useSpotifySdkContext();

  const addItemsToPlaylist = useCallback(
    async ({ playlistId, uris }: UseAddItemsToPlaylistProps) => {
      if (!playlistId || !uris?.length) {
        return;
      }

      await sdk.playlists.addItemsToPlaylist(playlistId, uris);
    },
    [sdk.playlists],
  );

  return { addItemsToPlaylist };
}
