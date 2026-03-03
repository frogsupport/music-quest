type RecommendationRequest = {
  accessToken?: string;
  playlistId?: string;
};

export default {
  fetch({ accessToken, playlistId }: RecommendationRequest) {
    if (!accessToken || !playlistId) {
      return;
    }
    return "hello world";
  },
};
