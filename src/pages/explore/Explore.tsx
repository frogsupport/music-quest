import { useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";
import recommendations from "../../../api/recommendations";
import { useAuthContext } from "../../providers/AuthProvider";

// TODO: Build a flow for getting a reccomended next track
// Click on a playlist
// Grab the tracks from that playlist
// Feed that to an llm (claude api) and ask for recommendations that are like those songs but not on that list
// Take that list and search spotify for the tracks
// If we find the track, get the id for each track
// Use the playback SDK to play the recommended track
// Go through that list of recommended tracks
// If we reach the end page for more

// If we click on another playlist go through the flow again

export default function Explore() {
  const { token } = useAuthContext();
  const { data: playlists } = useGetUserPlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<
    string | undefined
  >(undefined);

  const stuff = recommendations.fetch({
    accessToken: token?.access_token,
    playlistId: selectedPlaylistId,
  });

  return (
    <main>
      <h2>Explore</h2>
      {playlists?.map((playlist) => (
        <button
          style={{ margin: "4px" }}
          key={playlist.id}
          onClick={() => setSelectedPlaylistId(playlist.id)}
        >
          {playlist.name}
          {selectedPlaylistId === playlist.id ? <>✅</> : null}
        </button>
      ))}
      {stuff}
    </main>
  );
}
