import { Outlet } from "react-router";
import "./Layout.css";
import { useGetUserProfile } from "../../api/useGetUserProfile";

export default function Layout() {
  const { data } = useGetUserProfile();

  return (
    <div className="wrapper">
      <header style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <h1>Music Quest</h1>
        <img src={data?.images[1]?.url} style={{ borderRadius: "24px" }} />
      </header>
      <Outlet />
    </div>
  );
}
