import { redirectToSpotify } from "../../auth/redirectToSpotify";
import "./Login.css";

export default function Login() {
  return (
    <div className="wrapper">
      <div>
        <h1 className="title">Login</h1>
        <button className="login-button" onClick={() => redirectToSpotify()}>
          Login to Spotify
        </button>
      </div>
    </div>
  );
}
