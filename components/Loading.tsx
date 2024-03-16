"use client";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export const LoadingImagesGallery = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-5">
      {new Array(6).fill("1").map((l, index) => (
        <Skeleton key={index} className="h-56 w-full rounded-xl" />
      ))}
    </div>
  );
};

export const LoadingProfile = () => {
  return (
    <>
      <div className="w-full md:w-1/2 rounded-2xl">
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="w-[25%] h-12" />
        <LoadingImagesGallery />
      </div>
    </>
  );
};
