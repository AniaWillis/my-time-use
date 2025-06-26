import { createContext } from "react";
import { ThemeContextType } from "../../types/theme_context";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
