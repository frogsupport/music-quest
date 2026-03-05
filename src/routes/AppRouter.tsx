import { BrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { SpotifySdkProvider } from "../providers/SpotifySdkProvider";
import { SpotifyWebPlaybackProvider } from "../providers/SpotifyWebPlaybackProvider";

const MusicQuestRoutes = lazy(() => import("./MusicQuestRoutes"));
const UnauthenticatedRoutes = lazy(() => import("./UnauthenticatedRoutes"));

export const AppRouter = () => {
  const { token } = useAuthContext();

  return (
    <BrowserRouter>
      {token ? (
        <SpotifySdkProvider token={token}>
          <SpotifyWebPlaybackProvider>
            <Suspense>
              <MusicQuestRoutes />
            </Suspense>
          </SpotifyWebPlaybackProvider>
        </SpotifySdkProvider>
      ) : (
        <Suspense>
          <UnauthenticatedRoutes />
        </Suspense>
      )}
    </BrowserRouter>
  );
};
