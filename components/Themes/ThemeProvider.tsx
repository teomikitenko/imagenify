"use client";
import { createContext, useState, useEffect } from "react";
import { ThemeObject } from "@/types/type";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";


export const ThemeContext = createContext<ThemeObject | undefined>(undefined);

const ThemeProvider = ({
  children,
  currentTheme,
}: {
  children: React.ReactNode;
  currentTheme: string;
}) => {
  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme};max-age=3600`;
      const html = document.querySelector("html");
      html?.classList.remove("dark", "light");
      html?.classList.add(theme);
    }
  }, [theme]);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ClerkProvider>
  );
};

export default ThemeProvider;
