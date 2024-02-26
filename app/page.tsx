import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import Image from "next/image";

export default function Home() {
  const iconsLink = [
    {
      title: "Image Restore",
      image: Pic,
    },
    {
      title: "Generative Fill",
      image: Stars,
    },
    {
      title: "Object Remove",
      image: Scan,
    },
    {
      title: "Object Recolor",
      image: Filter,
    },
  ];
  return (
    <div className="bg-banner w-full flex flex-col rounded-xl py-10 px-12 gap-5 justify-center items-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-extrabold	text-4xl text-slate-50">
          Your AI magic artist
        </h1>
        <h1 className="font-extrabold	text-4xl">who never gets tired!</h1>
      </div>
      <div className="flex justify-between w-full px-48">
       {iconsLink.map(i=>(
        <div key={i.title} className="flex flex-col gap-2 items-center">
          <span className="p-4 bg-slate-50 rounded-full w-fit ">
        <Image src={i.image} width={26} height={26} alt="icon"/></span> 
        <p className="text-slate-50 text-sm font-semibold">{i.title}</p>
        </div>
      
       ))}
      </div>
    </div>
  );
}
