import { useMemo } from "react";
import { useAuthContext } from "../providers/AuthProvider";

export function useGetAuthHeader() {
  const { accessToken } = useAuthContext();

  const headers = useMemo(() => {
    const header = { Authorization: "Bearer " + accessToken };

    return header;
  }, [accessToken]);

  return headers;
}
