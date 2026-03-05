import { useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";
import { useGetRecommendations } from "../../api/useGetRecommedations";
import { Spinner } from "../../components/spinner/Spinner";
import { useSpotifyWebPlaybackContext } from "../../providers/SpotifyWebPlaybackProvider";
import { usePlayTrack } from "../../api/usePlayTrack";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { useGetCurrentlyPlayingTrack } from "../../api/useGetCurrentlyPlayingTrack";

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
  const [selectedPlaylist, setSelectedPlaylistId] = useState<
    SimplifiedPlaylist | undefined
  >(undefined);
  const { player } = useSpotifyWebPlaybackContext();

  const { data: recommendations, loading } = useGetRecommendations({
    playlistId: selectedPlaylist?.id,
  });

  const { data: currentTrack, refetch } = useGetCurrentlyPlayingTrack();

  usePlayTrack({
    trackUris: recommendations?.recommendations.map(
      (recommendation) => recommendation.uri,
    ),
  });

  return (
    <main>
      <button onClick={() => player.resume()}>Play</button>
      <button onClick={() => player.pause()}>Pause</button>
      <button
        onClick={() => {
          player.nextTrack();
          refetch();
        }}
      >
        Next Track
      </button>
      <div>Now Playing - {currentTrack?.name}</div>
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
          onClick={() => setSelectedPlaylistId(playlist)}
        >
          {playlist.name}
          {selectedPlaylist?.id === playlist.id ? <>✅</> : null}
        </button>
      ))}
    </main>
  );
}
