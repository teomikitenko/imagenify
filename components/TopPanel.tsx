"use client";
import Logo from "@/public/images/logo-text.svg";
import Image from "next/image";
import BurgerMenuIcon from "@/public/icons/menu.svg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Context, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { ThemeContext } from "./Themes/ThemeProvider";
import { ThemeObject } from "@/types/type";
import clsx from "clsx";
const TopPanel = () => {
  const [open, setOpen] = useState(false);
  const {theme} = useContext(ThemeContext as Context<ThemeObject>)
  const darkTheme = clsx({
   'bg-slate-800 border-none': theme === 'dark',
   'bg-slate-50 border-b': theme === 'light'
  })
  return (
    <header className={`block lg:hidden w-full fixed top-0 px-8 py-3 ${darkTheme}`}>
      <div className="flex w-full justify-between">
        <Image src={Logo} width={180} height={40} alt="logo" />
        <div className="flex gap-2">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Image
            onClick={() => setOpen(!open)}
            src={BurgerMenuIcon}
            width={32}
            height={32}
            alt="burger-menu"
          />
        </div>
      </div>
      {open &&
        createPortal(
          <BurgerMenu open={open} setOpen={setOpen} />,
          document.body
        )}
    </header>
  );
};

export default TopPanel;
