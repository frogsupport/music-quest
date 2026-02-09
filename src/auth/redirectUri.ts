export const redirectUri = import.meta.env.PROD
  ? "https://music-quest.vercel.app/"
  : "http://127.0.0.1:5173";

console.log(redirectUri);
