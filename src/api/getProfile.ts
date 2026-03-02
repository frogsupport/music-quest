type GetProfileResponse = {
  error?: { status: number };
};

export async function getProfile() {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const data: GetProfileResponse = await response.json();

  if (data.error?.status === 401) {
    // refetch our accessToken somehow?
  }

  return data;
}
