import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import RouterLink from "../RouterLink";

type AvailableThemes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {

    const storageTheme = localStorage.getItem("theme") as AvailableThemes;
    
    return storageTheme === "light" ? "light" : "dark";
  
  });

  function handleTheme(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    setTheme((prevTheme) => {
      const nextTheme = prevTheme === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  const nextThemeIcon = {
    dark: <SunIcon/>,
    light: <MoonIcon/>,
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        href="/"
        className={styles.menuLink}
        aria-label="Ir para a Home"
        title="Ir para a home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href="#"
        className={styles.menuLink}
        aria-label="Ver Histórico"
        title="Ver Histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href="#"
        className={styles.menuLink}
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href="#"
        className={styles.menuLink}
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleTheme}
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
