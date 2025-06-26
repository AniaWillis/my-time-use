import { createContext } from "react";

import { AuthContextType } from "../types/auth_context";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
