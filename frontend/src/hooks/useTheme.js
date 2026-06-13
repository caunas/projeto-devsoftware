import { useContext } from "react";
import { ThemeContext } from "../contexts/theme/ThemeContextValue";

export function useTheme() {
  return useContext(ThemeContext);
}
