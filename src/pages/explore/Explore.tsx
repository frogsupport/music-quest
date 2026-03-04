import { useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";
import { useGetRecommendations } from "../../api/useGetRecommedations";
import { Spinner } from "../../components/spinner/Spinner";

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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<
    string | undefined
  >(undefined);

  const { data: recommendations, loading } = useGetRecommendations({
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
      {loading ? (
        <Spinner />
      ) : (
        recommendations?.content.map((content) =>
          content.type === "text" ? (
            <div key={content.text}>{content.text}</div>
          ) : null,
        )
      )}
    </main>
  );
}
