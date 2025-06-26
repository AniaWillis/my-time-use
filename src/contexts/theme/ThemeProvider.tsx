import { useCallback, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Theme, ThemeProviderProps } from "../../types/theme_context";

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : "system";
  });

  const getSystemTheme = useCallback(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme()
  );
  const [componentTheme, setcomponentTheme] = useState<"light" | "dark">(
    theme === "system" ? getSystemTheme() : theme
  );

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      const effectiveTheme =
        newTheme === "system" ? getSystemTheme() : newTheme;

      document.documentElement.setAttribute("data-theme", effectiveTheme);
      setcomponentTheme(effectiveTheme);
    },
    [getSystemTheme]
  );

  useEffect(() => {
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      if (theme === "system") {
        applyTheme("system");
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme, applyTheme]);

  const selectTheme = useCallback(
    (selection: Theme) => {
      if (selection === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", selection);
      }
      setTheme(selection);
      applyTheme(selection);
    },
    [applyTheme]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        systemTheme,
        componentTheme,
        selectTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };
