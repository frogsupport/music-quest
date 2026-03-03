import { Outlet } from "react-router";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
}
