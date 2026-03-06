const generateRandomString = ({ length }: { length: number }) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));

  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const redirectToSpotify = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const scopes =
    "user-read-private user-read-email streaming user-modify-playback-state user-read-currently-playing playlist-modify-public playlist-modify-private";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const codeVerifier = generateRandomString({ length: 64 });
  window.localStorage.setItem("code_verifier", codeVerifier);

  const sha256 = async ({ plain }: { plain: string }) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);

    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const hashed = await sha256({ plain: codeVerifier });
  const codeChallenge = base64encode(hashed);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: import.meta.env.VITE_SPOTIFY_AUTH_REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};
