import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";
import { getToken } from "../api/getToken";

export function useSetAccessToken() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setToken: setAccessToken } = useAuthContext();

  useEffect(() => {
    // Because this function runs twice with the code in the search params
    // we need to cancel fetch when it runs twice with an AbortController
    const controller = new AbortController();

    async function asyncGetToken({ code }: { code: string }) {
      try {
        const token = await getToken({ code, signal: controller.signal });

        if (token.error) {
          console.error(token.error);
        } else if (token.access_token) {
          setAccessToken(token);
          setSearchParams((prev) => {
            prev.delete("code");
            return prev;
          });
        }
      } catch (e) {
        if (controller.signal.aborted) {
          return;
        }
        console.error(e);
      }
    }

    const code = searchParams.get("code");

    if (code) {
      asyncGetToken({ code });
    }

    return () => controller.abort();
  }, [searchParams, setAccessToken, setSearchParams]);
}
