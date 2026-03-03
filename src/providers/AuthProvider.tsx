import { createContext, PropsWithChildren, useContext, useState } from "react";

type Token = {
  accessToken: string;
};

type AuthContext = {
  accessToken?: string;
  setAccessToken: (token: Token) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;
  const [token, setToken] = useState<Token | undefined>(undefined);

  return (
    <AuthContext
      value={{
        accessToken: token?.accessToken,
        setAccessToken: setToken,
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
