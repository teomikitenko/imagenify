"use client";
import Logo from "@/public/images/logo-text.svg";
import Image from "next/image";
import BurgerMenuIcon from "@/public/icons/menu.svg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import { createPortal } from "react-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
const TopPanel = () => {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`block z-10 lg:hidden w-full fixed top-0 px-8 py-3 bg-slate-50 border-b dark:bg-slate-800 dark:border-none `}
    >
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Link href={"/"}>
            <Image src={Logo} width={180} height={40} alt="logo" />
          </Link>
          <ThemeSwitcher />
        </div>
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
