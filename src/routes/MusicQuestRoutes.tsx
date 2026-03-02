import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

const Explore = lazy(() => import("../pages/Explore"));

const MusicQuestRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/explore" />} />
      <Route
        path="explore"
        element={
          <Suspense>
            <Explore />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MusicQuestRoutes;
