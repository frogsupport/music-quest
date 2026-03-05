import { AccessToken } from "@spotify/web-api-ts-sdk";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContext = {
  token?: AccessToken;
  setToken: (token: AccessToken) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;

  const [token, setToken] = useState<AccessToken | undefined>(() => {
    const cached = JSON.parse(localStorage.getItem("access_token") ?? "null");
    const isTokenValid = cached?.expires > Date.now();
    return isTokenValid ? cached : undefined;
  });

  return (
    <AuthContext
      value={{
        token: token,
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
