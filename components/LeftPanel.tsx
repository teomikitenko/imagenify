import React from "react";
import Home from "@/public/icons/home.svg";
import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import Logo from "@/public/images/logo-text.svg";
import Profile from "@/public/icons/profile.svg";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
const LeftPanel = () => {
  const links = [
    { title: "Home", href: "/", img: Home },
    { title: "Image Restore", href: "/restore", img: Pic },
    { title: "Generative Fill", href: "/fill", img: Stars },
    { title: "Object Remove", href: "/remove", img: Scan },
    { title: "Object Recolor", href: "/recolor", img: Filter },
  ];
  return (
    <div className="lg:block hidden  pl-8 w-[30%] border relative dark:bg-slate-800 dark:border-slate-800">
      <div className=" w-full py-5 h-[100vh] sticky top-0 flex flex-col gap-4">
        <div className="flex w-[90%] gap-4">
          <Image src={Logo} width={180} height={40} alt="logo" />
          <ThemeSwitcher />
        </div>
        <div className="flex h-full w-[90%] flex-col gap-20">
          <SignedIn>
            <ul className="flex flex-col h-full">
              {links.map((l) => (
                <li key={l.title}>
                  <Link href={l.href}>
                    <div className="flex gap-3 py-4 hover:shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl pl-2">
                      <Image
                        src={l.img}
                        height={24}
                        width={24}
                        alt="link-image"
                      />
                      <p className="font-semibold dark:text-slate-100">
                        {l.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col h-full justify-end gap-6">
              <li>
                <Link href={"/profile"}>
                  <div className="flex  w-full gap-3">
                    <Image
                      src={Profile}
                      height={24}
                      width={24}
                      alt="link-image"
                    />
                    <p className="text-slate-700 dark:text-slate-100 font-semibold">
                      Profile
                    </p>
                  </div>
                </Link>
              </li>
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "flex-row-reverse gap-3",
                    userButtonOuterIdentifier:
                      "text-slate-700 font-semibold text-base dark:text-slate-100",
                  },
                }}
                showName
              />
            </ul>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <div className="px-14 flex justify-center items-center rounded-2xl py-2 text-slate-100 cursor-pointer bg-purple-gradient font-semibold">
                Login
              </div>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
