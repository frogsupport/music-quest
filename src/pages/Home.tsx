import { useEffect, useState } from "react";
import { getProfile } from "../api/getProfile";
import { getToken } from "../auth/getToken";
import { redirectToSpotify } from "../auth/redirectToSpotify";

export default function Home() {
  let accessToken = localStorage.getItem("access_token");
  if (accessToken === "undefined") {
    accessToken = null;
  }
  const code = new URLSearchParams(window.location.search).get("code");
  const [clientId, setClientId] = useState(localStorage.getItem("client_id"));
  const [profileData, setProfileData] = useState(undefined);

  const handleSubmit = (formData: FormData) => {
    const clientIdFormValue = formData.get("clientId")?.toString();
    if (!clientIdFormValue) {
      return;
    }
    setClientId(clientIdFormValue);
    localStorage.setItem("client_id", clientIdFormValue);
  };

  useEffect(() => {
    if (accessToken || !clientId) {
      return;
    }

    if (code) {
      getToken({ clientId, code });
    } else {
      redirectToSpotify({ clientId });
    }
  }, [accessToken, clientId, code]);

  useEffect(() => {
    async function getProfileData() {
      if (!accessToken) {
        return;
      }
      const data = await getProfile();
      setProfileData(data);
    }
    getProfileData();
  }, [accessToken]);

  return (
    <div>
      <h1>Music Quest</h1>
      {!accessToken && !clientId ? (
        <form action={handleSubmit}>
          <label htmlFor="client-id">Client ID:</label>
          <input id="client-id" name="clientId" type="text" />
          <button type="submit">Set</button>
        </form>
      ) : null}
      <div>{JSON.stringify(profileData)}</div>
    </div>
  );
}
