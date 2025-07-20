import { ReactNode } from "react";

export interface AuthProps {
  isSignUp: boolean;
  onSignUp: (val: boolean) => void;
}

export type ProtectedRouteProps = {
  children: ReactNode;
};
