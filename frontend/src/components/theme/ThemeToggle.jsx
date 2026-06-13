import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import "./ThemeToggle.css";

function ThemeToggle({ className = "" }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button className={`theme-toggle ${className}`.trim()} type="button" onClick={toggleTheme}>
      {isDarkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      <span>{isDarkMode ? "Claro" : "Escuro"}</span>
    </button>
  );
}

export default ThemeToggle;
