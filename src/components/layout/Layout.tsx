import { Outlet } from "react-router";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="wrapper">
      <h1>Music Quest</h1>
      <Outlet />
    </div>
  );
}
