import { redirectToSpotify } from "../../auth/redirectToSpotify";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <button onClick={() => redirectToSpotify()}>Login to Spotify</button>
    </div>
  );
}
