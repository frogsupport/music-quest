import { useEffect, useState } from "react";
import { useSpotifySdkContext } from "../providers/SpotifySdkProvider";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

export function useGetUserPlaylists() {
  const [playlists, setPlaylists] = useState<undefined | SimplifiedPlaylist[]>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const { sdk } = useSpotifySdkContext();

  useEffect(() => {
    async function asyncGetUserProfile() {
      setLoading(true);

      const data = await sdk.currentUser.playlists.playlists();

      console.log({ data });

      setPlaylists(data.items);
      setLoading(false);
    }

    asyncGetUserProfile();
  }, [sdk.currentUser]);

  return { data: playlists, loading };
}
