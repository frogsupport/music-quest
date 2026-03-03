import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";
import { getToken } from "../api/getToken";

export function useSetAccessToken() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAccessToken } = useAuthContext();

  useEffect(() => {
    async function asyncGetToken({ code }: { code: string }) {
      const token = await getToken({ code });

      if (token.error) {
        console.error(token.error);
      } else if (token.access_token) {
        setAccessToken({
          accessToken: token.access_token,
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
}
