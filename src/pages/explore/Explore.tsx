import { useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";
import { useGetRecommendations } from "../../api/useGetRecommedations";
import { Spinner } from "../../components/spinner/Spinner";
import { useSpotifyWebPlaybackContext } from "../../providers/SpotifyWebPlaybackProvider";
import { usePlayTrack } from "../../api/usePlayTrack";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

// TODO:
// If we reach the end page for more

export default function Explore() {
  const { data: playlists } = useGetUserPlaylists();
  const [selectedPlaylist, setSelectedPlaylistId] = useState<
    SimplifiedPlaylist | undefined
  >(undefined);
  const { player } = useSpotifyWebPlaybackContext();
  const { playTrack } = usePlayTrack();
  const [started, setStarted] = useState(false);

  const { data: recommendations, loading } = useGetRecommendations({
    playlistId: selectedPlaylist?.id,
  });

  const recommendationUris = recommendations?.recommendations.map((r) => r.uri);

  return (
    <main>
      {recommendations ? (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            margin: "8px",
          }}
        >
          <button
            onClick={() => {
              if (!started && recommendationUris) {
                playTrack(recommendationUris);
                setStarted(true);
              } else {
                player.resume();
              }
            }}
          >
            Play
          </button>
          <button onClick={() => player.pause()}>Pause</button>
          <button
            onClick={() => {
              player.nextTrack();
            }}
          >
            Next Track
          </button>
        </div>
      ) : null}
      {loading ? (
        <Spinner />
      ) : (
        recommendations?.recommendations.map((track) => (
          <div key={track.id}>
            {track.name} - {track.artists[0]?.name}
          </div>
        ))
      )}
      <h2>Explore</h2>
      {playlists?.map((playlist) => (
        <button
          style={{ margin: "4px" }}
          key={playlist.id}
          onClick={() => {
            setSelectedPlaylistId(playlist);
            setStarted(false);
          }}
        >
          {playlist.name}
          {selectedPlaylist?.id === playlist.id ? <>✅</> : null}
        </button>
      ))}
    </main>
  );
}
