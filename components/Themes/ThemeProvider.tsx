"use client";
import { createContext, useState, useEffect } from "react";
import { ThemeObject } from "@/types/type";
import clsx from "clsx";

export const ThemeContext = createContext<ThemeObject | undefined>(undefined);

const ThemeProvider = ({
  children,
  currentTheme,
}: {
  children: React.ReactNode;
  currentTheme: string;
}) => {
  const [theme, setTheme] = useState(currentTheme);
  const curentStyle = clsx({
    "dark": theme === "dark",
    "light": theme === "light",
  });

  useEffect(() => {
    if (theme) {
     document.cookie = `theme=${theme};max-age=3600`;
      const html = document.querySelector("html");
      html?.classList.remove('dark','light');
      html?.classList.add(curentStyle)

    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
