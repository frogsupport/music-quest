import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import AuthLayout from "../components/layout/AuthLayout";

const SpotifyAuthRedirect = lazy(() => import("../pages/auth/Auth"));
const Login = lazy(() => import("../pages/login/Login"));

const UnauthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
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
      </Route>
    </Routes>
  );
};

export default UnauthenticatedRoutes;
