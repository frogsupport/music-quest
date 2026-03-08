import { useEffect, useState } from "react";
import { useGetUserPlaylists } from "../../api/useGetUserPlaylists";
import "./Explore.css";
import { useGetRecommendations } from "../../api/useGetRecommedations";
import { Spinner } from "../../components/spinner/Spinner";
import { useSpotifyWebPlaybackContext } from "../../providers/SpotifyWebPlaybackProvider";
import { usePlayTrack } from "../../api/usePlayTrack";
import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import useAddItemsToPlaylist from "../../api/useAddItemsToPlaylist";
import Button from "../../components/button/Button";

export default function Explore() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<
    SimplifiedPlaylist | undefined
  >(undefined);
  const [
    hasStartedPlayingRecommendations,
    setHasStartedPlayingRecommendations,
  ] = useState(false);
  const [currentlyPlayingPlaylist, setCurrentlyPlayingPlaylist] = useState<
    SimplifiedPlaylist | undefined
  >(undefined);
  const [currentlyPlayingTrackUri, setCurrentlyPlayingTrackUri] = useState<
    string | undefined
  >(undefined);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { data: playlists } = useGetUserPlaylists();
  const { player, currentTrack, isPlaying } = useSpotifyWebPlaybackContext();
  const { playTrack } = usePlayTrack();
  const { addItemsToPlaylist } = useAddItemsToPlaylist();

  useEffect(() => {
    async function asyncSetCurrentlyPlayingTrackUri() {
      setCurrentlyPlayingTrackUri(currentTrack?.uri);
    }
    asyncSetCurrentlyPlayingTrackUri();
  }, [currentTrack]);

  const { data: recommendations, loading: loadingRecommendations } =
    useGetRecommendations({
      playlistId: selectedPlaylist?.id,
    });

  const recommendationUris = recommendations?.recommendations.map((r) => r.uri);

  const shouldShowPlayNextRecommendationButton =
    !loadingRecommendations &&
    recommendations &&
    recommendations.recommendations.length > 0 &&
    !hasStartedPlayingRecommendations;

  const shouldShowPlayer = recommendations && hasPlayed;

  const shouldShowAddButton =
    currentlyPlayingTrackUri && currentlyPlayingPlaylist;

  return (
    <main>
      {shouldShowPlayer ? (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "120px 44px",
            rowGap: "16px",
            backgroundColor: "#CDFF00",
            borderRadius: "20px",
            padding: "12px",
            margin: "12px 0 0 0",
          }}
        >
          <div
            style={{
              display: "grid",
              columnGap: "8px",
              gridTemplateColumns: "120px 1fr",
            }}
          >
            <img
              style={{ borderRadius: "12px", maxWidth: "120px" }}
              src={currentTrack?.album.images[0]?.url}
            />
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 40px",
                justifyItems: "center",
              }}
            >
              <span
                style={{ alignSelf: "center" }}
              >{`${currentTrack?.name} - ${currentTrack?.artists[0]?.name}`}</span>
              {isPlaying ? (
                <svg
                  width="100"
                  height="40"
                  viewBox="0 0 200 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,20 C10,10 20,30 30,20 C40,10 50,30 60,20 C70,10 80,30 90,20 C100,10 110,30 120,20 C130,10 140,30 150,20 C160,10 170,30
  180,20 C190,10 200,30 210,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="-30 0"
                      to="0 0"
                      dur="0.6s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              ) : null}
            </div>
          </div>
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <Button onClick={() => player.resume()}>Play</Button>
            <Button onClick={() => player.pause()}>Pause</Button>
            <Button onClick={() => player.nextTrack()}>Next</Button>
            {shouldShowAddButton ? (
              <Button
                onClick={() =>
                  addItemsToPlaylist({
                    playlistId: currentlyPlayingPlaylist.id,
                    uris: [currentlyPlayingTrackUri],
                  })
                }
              >
                Add
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          margin: "8px 0",
          minHeight: "64px",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Explore</h2>
        {shouldShowPlayNextRecommendationButton ? (
          <Button
            onClick={() => {
              if (!hasStartedPlayingRecommendations && recommendationUris) {
                playTrack(recommendationUris);
                setHasStartedPlayingRecommendations(true);
                setHasPlayed(true);
                setCurrentlyPlayingPlaylist(selectedPlaylist);
              }
            }}
          >
            Play {selectedPlaylist?.name} Recommendations
          </Button>
        ) : null}
        {loadingRecommendations ? (
          <span style={{ justifySelf: "center" }}>
            <Spinner />
          </span>
        ) : null}
      </div>
      {playlists?.map((playlist) => (
        <Button
          style={{ margin: "4px" }}
          key={playlist.id}
          onClick={() => {
            setSelectedPlaylist(playlist);
            setHasStartedPlayingRecommendations(false);
          }}
        >
          {playlist.name}
          {selectedPlaylist?.id === playlist.id ? <>✅</> : null}
        </Button>
      ))}
    </main>
  );
}
