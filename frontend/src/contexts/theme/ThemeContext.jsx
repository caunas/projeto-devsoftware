import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContextValue";

const STORAGE_KEY = "portal-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) || "light");

  /**
   * O tema é aplicado no atributo data-theme do <html>.
   * As variáveis CSS em src/styles/variables.css reagem a esse atributo.
   */
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: theme === "dark",
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
