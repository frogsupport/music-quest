import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "../components/layout/Layout";

const Explore = lazy(() => import("../pages/explore/Explore"));

const MusicQuestRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<Navigate to="/explore" />} />
        <Route
          path="explore"
          element={
            <Suspense>
              <Explore />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default MusicQuestRoutes;
