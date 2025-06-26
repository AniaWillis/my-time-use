import { ReactNode } from "react";

export interface AuthProps {
  isSignUp: boolean;
}

export type ProtectedRouteProps = {
  children: ReactNode;
};
