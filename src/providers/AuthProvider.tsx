import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type Token = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

// const currentToken = {
//   get accessToken() {
//     return localStorage.getItem("access_token") || undefined;
//   },
//   get refreshToken() {
//     return localStorage.getItem("refresh_token") || undefined;
//   },
//   get expiresIn() {
//     return localStorage.getItem("refresh_in") || undefined;
//   },
//   get expires() {
//     return localStorage.getItem("expires") || undefined;
//   },

//   save: function (response: {
//     accessToken: string;
//     refreshToken: string;
//     expiresIn: string;
//   }) {
//     const {
//       accessToken: access_token,
//       refreshToken: refresh_token,
//       expiresIn: expires_in,
//     } = response;
//     localStorage.setItem("access_token", access_token);
//     localStorage.setItem("refresh_token", refresh_token);
//     localStorage.setItem("expires_in", expires_in);

//     const now = new Date();
//     const expiry = new Date(now.getTime() + Number.parseInt(expires_in) * 1000);
//     localStorage.setItem("expires", expiry.toDateString());
//   },
// };

type AuthContext = {
  accessToken?: string;
  setAccessToken: (token: Token) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;
  const [token, setToken] = useState<Token | undefined>(undefined);

  const handleSetToken = useCallback((token: Token) => {
    setToken(token);
  }, []);

  return (
    <AuthContext
      value={{
        accessToken: token?.accessToken,
        setAccessToken: handleSetToken,
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
