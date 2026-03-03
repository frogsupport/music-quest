import { useSetAccessToken } from "../hooks/useSetAccessToken";

export default function Auth() {
  useSetAccessToken();

  return (
    <div>
      <h1>Spotify Auth Redirect</h1>
    </div>
  );
}
