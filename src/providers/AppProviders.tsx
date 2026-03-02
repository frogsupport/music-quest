import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";

export function AppProviders(props: PropsWithChildren) {
  return <AuthProvider>{props.children}</AuthProvider>;
}
