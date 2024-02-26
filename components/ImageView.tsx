"use client";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import type { Transformations } from "@/types/type";

const ImageView = ({ id, prompt }: { prompt?: Transformations; id: string }) => {
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(900, 600))}`;
  return (
    <div className="w-full h-full relative">
      <CldImage
        className="object-cover absolute top-0 left-0"
        src={id}
        fill
        alt="image"
        {...prompt}
        placeholder={dataUrl as PlaceholderValue}
      />
    </div>
  );
};

export default ImageView;
