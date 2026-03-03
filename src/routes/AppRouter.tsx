import { BrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { useAuthContext } from "../providers/AuthProvider";

const MusicQuestRoutes = lazy(() => import("./MusicQuestRoutes"));
const UnauthenticatedRoutes = lazy(() => import("./UnauthenticatedRoutes"));

export const AppRouter = () => {
  const { accessToken } = useAuthContext();

  return (
    <BrowserRouter>
      {accessToken ? (
        <Suspense>
          <MusicQuestRoutes />
        </Suspense>
      ) : (
        <Suspense>
          <UnauthenticatedRoutes />
        </Suspense>
      )}
    </BrowserRouter>
  );
};
