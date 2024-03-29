"use client";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export const LoadingImagesGallery = () => {
  return (
    <div className="responsive-gallery">
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
export const LoadingFormOneInput = () => {
  return (
    <div className="flex flex-col w-full space-y-12 mt-9">
      <Skeleton className="w-full rounded-2xl p-7" />
      <Skeleton className="min-h-80 rounded-2xl" />
    </div>
  );
};
export const LoadingFormTwoInput = () => {
  return (
    <div className="flex flex-col mt-9 space-y-12 w-full ">
      <Skeleton className="w-full rounded-2xl p-7" />
      <Skeleton className="w-full rounded-2xl p-7" />
      <Skeleton className="min-h-80 rounded-2xl" />
    </div>
  );
};
