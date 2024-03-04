"use client";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import type { Transformations } from "@/types/type";

export const dynamic = "force-dynamic";

const ImageView = ({
  id,
  transformation,
}: {
  transformation?: Transformations;
  id: string;
}) => {
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
    <CldImage
      className="object-content"
      src={id}
      width={1000}
      height={1000}
      style={{
        width: "100%",
        height: "auto",
      }}
      sizes="100vw"
      alt="image"
      {...transformation}
      placeholder={dataUrl as PlaceholderValue}
    />
  );
};

export default ImageView;
