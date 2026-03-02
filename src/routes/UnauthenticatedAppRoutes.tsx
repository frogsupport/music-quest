import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const SpotifyAuthRedirect = lazy(() => import("../pages/SpotifyAuthRedirect"));
const Login = lazy(() => import("../pages/Login"));

const MusicQuestRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route
        path="login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="auth"
        element={
          <Suspense>
            <SpotifyAuthRedirect />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MusicQuestRoutes;
