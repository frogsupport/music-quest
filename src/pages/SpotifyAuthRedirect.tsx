import { useEffect } from "react";
import { getToken } from "../api/getToken";
import { useSearchParams } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";

export default function SpotifyAuthRedirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAccessToken, accessToken } = useAuthContext();

  useEffect(() => {
    async function asyncGetToken({ code }: { code: string }) {
      const token = await getToken({ code });

      if (token.error) {
        console.error(token.error);
      } else if (token.access_token) {
        setAccessToken({
          accessToken: token.access_token,
          expiresIn: token.expires_in,
          refreshToken: token.refresh_token,
        });
        setSearchParams((prev) => {
          prev.delete("code");
          return prev;
        });
      }
    }

    const code = searchParams.get("code");

    if (code) {
      asyncGetToken({ code });
    }
  }, [searchParams, setAccessToken, setSearchParams]);

  return (
    <div>
      <h1>Spotify Auth Redirect</h1>
      {accessToken ? accessToken : "No Token Saddd"}
    </div>
  );
}
