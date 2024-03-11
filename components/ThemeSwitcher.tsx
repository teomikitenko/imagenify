"use client";
import React, { useContext } from "react";
import { ThemeContext } from "./Themes/ThemeProvider";
import { ThemeObject } from "@/types/type";
import MoonIcon from "@/public/icons/moon-stars.svg";
import SunIcon from "@/public/icons/sun.svg";
import Image from "next/image";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeObject;
  return (
    <div className={`${theme === 'dark'?'invert':'invert-0'} p-1`}>
      <Image  className={`${theme === 'dark'? 'block':'hidden'} cursor-pointer`}  onClick={() => setTheme("light")}  src={SunIcon} width={24} height={24} alt="sun" />
      <Image  className={`${theme === 'light' || !theme? 'block':'hidden'} cursor-pointer`} onClick={() => setTheme("dark")} src={MoonIcon} width={24} height={24} alt="moon" />
    </div>
  );
};

export default ThemeSwitcher;
