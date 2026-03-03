export const getToken = async ({
  code,
  signal,
}: {
  code: string;
  signal: AbortSignal;
}) => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";

  if (!codeVerifier || !code) {
    return;
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.VITE_SPOTIFY_AUTH_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
    signal,
  };

  const body = await fetch(url, payload);
  const response = await body.json();

  return response;
};
