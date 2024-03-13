"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";

const BurgerMenu = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const [close, setClose] = useState(false);
  const animateOpen = clsx({
    "right-0 animate-burger-right-open": open&&!close,
    "right-[-500px] animate-burger-right-close": close,
  });
  useEffect(() => {
    document.body.classList.add("!overflow-hidden");
    return () => document.body.classList.remove("!overflow-hidden");
  }, []);
   useEffect(()=>{
    let timer:NodeJS.Timeout;
    if(close){
      setTimeout(()=>setOpen(false),380)
    }
    return ()=>clearTimeout(timer)
  },[close])
  return (
    <div className="h-screen fixed top-0 w-full flex">
      <div className="relative w-full h-full ">
        <div onClick={()=>setClose(true)} className="bg-black opacity-85 h-full w-full z-10"></div>
        <div
          className={`absolute h-full ${animateOpen} z-50 top-0 w-[30%] bg-slate-50`}
        >
          <span
            onClick={() =>setClose(true)
            }
          >
            &#10005;
          </span>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
