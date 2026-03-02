import { BrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { useAuthContext } from "./providers/AuthProvider";

const MusicQuestRoutes = lazy(() => import("./routes/MusicQuestRoutes"));
const UnauthenticatedAppRoutes = lazy(
  () => import("./routes/UnauthenticatedAppRoutes"),
);

export const App = () => {
  const { accessToken } = useAuthContext();

  return (
    <BrowserRouter>
      {accessToken ? (
        <Suspense>
          <MusicQuestRoutes />
        </Suspense>
      ) : (
        <Suspense>
          <UnauthenticatedAppRoutes />
        </Suspense>
      )}
    </BrowserRouter>
  );
};
