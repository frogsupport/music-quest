import { redirectToSpotify } from "../../auth/redirectToSpotify";
import Button from "../../components/button/Button";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <h2>Login</h2>
      <Button style={{ marginTop: "16px" }} onClick={() => redirectToSpotify()}>
        Login to Spotify
      </Button>
    </div>
  );
}
