import { redirectToSpotify } from "../auth/redirectToSpotify";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => redirectToSpotify()}>Login to Spotify</button>
    </div>
  );
}
