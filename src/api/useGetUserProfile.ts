import { useEffect, useState } from "react";
import { useGetAuthHeader } from "../auth/useGetAuthHeader";

export function useGetUserProfile() {
  const [userProfile, setUserProfile] = useState<undefined | { name?: string }>(
    undefined,
  );
  const headers = useGetAuthHeader();

  useEffect(() => {
    async function asyncGetUserProfile() {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers,
      });

      const data = await response.json();

      if (data.error) {
        setUserProfile(undefined);
        return;
      }

      setUserProfile(data);
    }

    asyncGetUserProfile();
  }, [headers]);

  return userProfile;
}
