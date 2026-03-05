import { Spinner } from "../spinner/Spinner";

export default function LoadingScreen() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}
    >
      <Spinner size={120} />
    </div>
  );
}
