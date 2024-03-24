"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Home from "@/public/icons/home.svg";
import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import Logo from "@/public/images/logo-text.svg";
import Profile from "@/public/icons/profile.svg";
import Replace from "@/public/icons/replace.svg";
import Login from "@/public/icons/login.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import clsx from "clsx";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Buy from "@/public/icons/bag.svg";

const BurgerMenu = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [close, setClose] = useState(false);
  const links = [
    { title: "Home", href: "/", img: Home },
    { title: "Image Restore", href: "/restore", img: Pic },
    { title: "Generative Fill", href: "/fill", img: Stars },
    { title: "Object Remove", href: "/remove", img: Scan },
    { title: "Object Recolor", href: "/recolor", img: Filter },
    { title: "Object Replace", href: "/replace", img: Replace },
    { title: "Buy Credits", href: "/credits", img: Buy },
  ];

  const animateOpen = clsx({
    "right-0 animate-burger-right-open": open && !close,
    "right-[-500px] animate-burger-right-close": close,
  });
  useEffect(() => {
    document.body.classList.add("!overflow-hidden");
    return () => document.body.classList.remove("!overflow-hidden");
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (close) {
      setTimeout(() => setOpen(false), 380);
    }
    return () => clearTimeout(timer);
  }, [close]);
  return (
    <div className="h-screen z-20 fixed top-0 w-full flex">
      <div className="overflow-scroll relative w-full h-full">
        <div
          onClick={() => setClose(true)}
          className="bg-black opacity-85 h-full w-full z-10"
        ></div>
        <div
          className={`absolute h-full ${animateOpen} z-50 top-0 w-[57%] sm:w-[35%] md:w-[28%] bg-slate-50 dark:bg-slate-800`}
        >
          <div className="flex py-4 px-6 relative h-full">
            <span
              className="absolute top-3 text-sm dark:text-slate-50 right-3"
              onClick={() => setClose(true)}
            >
              &#10005;
            </span>
            <div className="flex flex-col h-full pt-3">
              <Image src={Logo} width={153} alt="logo" />
              <div className="flex flex-col h-full justify-between ">
                <div className="mt-8 flex flex-col  gap-5">
                  {links.map((l) => (
                    <Link href={l.href}>
                      <div className="flex gap-3">
                        <Image
                          src={l.img}
                          width={22}
                          height={22}
                          alt="link-icon"
                        />
                        <p className="font-semibold text-slate-700 dark:text-slate-100">
                          {l.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <SignedIn>
                  <Link href={"/profile"}>
                    <div className="flex gap-3 mb-3">
                      <Image
                        src={Profile}
                        width={22}
                        height={22}
                        alt="link-icon"
                      />
                      <p className="font-semibold text-slate-700 dark:text-slate-100">
                        Profile
                      </p>
                    </div>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                  <div className="flex gap-3 mb-3">
                      <Image
                        src={Login}
                        width={22}
                        height={22}
                        alt="link-icon"
                      />
                      <p className="font-semibold text-slate-700 dark:text-slate-100">
                        Login
                      </p>
                    </div>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
