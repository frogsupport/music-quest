import { AccessToken } from "@spotify/web-api-ts-sdk";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContext = {
  token?: AccessToken;
  setToken: (token: AccessToken) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

const isToken = (token: unknown): token is AccessToken => {
  return typeof token === "object" && token !== null && "access_token" in token;
};

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [token, setToken] = useState<AccessToken | undefined>(() => {
    try {
      const localStorageCachedToken = localStorage.getItem("access_token");
      const cachedToken = JSON.parse(localStorageCachedToken ?? "null");

      if (!isToken(cachedToken)) {
        localStorage.removeItem("access_token");
        return undefined;
      }

      const isTokenValid =
        cachedToken.expires && cachedToken.expires > Date.now();

      return isTokenValid ? cachedToken : undefined;
    } catch (e) {
      localStorage.removeItem("access_token");
      console.error(e);
    }
  });

  return (
    <AuthContext
      value={{
        token,
        setToken: (token: AccessToken) => {
          localStorage.setItem(
            "access_token",
            JSON.stringify({
              ...token,
              expires: token.expires ?? Date.now() + token.expires_in * 1000,
            }),
          );
          setToken(token);
        },
      }}
    >
      {children}
    </AuthContext>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContext");
  }

  return context;
};
