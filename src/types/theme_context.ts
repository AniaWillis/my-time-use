import { ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  componentTheme: Theme;
  systemTheme: string;
  selectTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
