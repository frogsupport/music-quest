import { useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";

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
  const { data: playlists } = useGetUserPlaylists();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | undefined>(
    undefined,
  );

  return (
    <main>
      <h2>Explore</h2>
      {playlists?.map((playlist) => (
        <button
          style={{ margin: "4px" }}
          key={playlist.id}
          onClick={() => setSelectedPlaylist(playlist.id)}
        >
          {playlist.name}
          {selectedPlaylist === playlist.id ? <>✅</> : null}
        </button>
      ))}
    </main>
  );
}
