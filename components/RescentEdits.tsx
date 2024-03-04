"use client"
import { Input } from "./ui/input";
import Search from "@/public/icons/search.svg";
import Image from "next/image";
import ImagesGallery from "./ImagesGallery";
import type { ImagesType } from "@/types/type";
const RescentEdits = ({images}:{images:ImagesType[]}) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold text-blue-950">Rescent Edits</h1>
        <div className="flex w-[35%] border rounded-2xl overflow-hidden">
            <div className="flex items-center pl-3 pr-1">
            <Image src={Search} height={24} width={24} alt="search" />
            </div>
          <Input placeholder="Search" className="grow py-6 border-none text-base" />
        </div>
      </div>
      <ImagesGallery images = {images}/>
    </div>
  );
};

export default RescentEdits;
