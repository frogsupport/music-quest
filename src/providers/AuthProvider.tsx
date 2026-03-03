import { AccessToken } from "@spotify/web-api-ts-sdk";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContext = {
  token?: AccessToken;
  setToken: (token: AccessToken) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;
  const [token, setToken] = useState<AccessToken | undefined>(undefined);

  return (
    <AuthContext
      value={{
        token: token,
        setToken: setToken,
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
