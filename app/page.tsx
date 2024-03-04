import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import Image from "next/image";
import RescentEdits from "@/components/RescentEdits";
import { getAllTransformations } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  const images = await getAllTransformations();
  const iconsLink = [
    {
      title: "Image Restore",
      image: Pic,
      page: "/restore",
    },
    {
      title: "Generative Fill",
      image: Stars,
      page: "/fill",
    },
    {
      title: "Object Remove",
      image: Scan,
      page: "/remove",
    },
    {
      title: "Object Recolor",
      image: Filter,
      page: "/recolor",
    },
  ];
  return (
    <div className="flex flex-col gap-16 min-h-[100vh]">
      <div className="bg-banner w-full flex flex-col rounded-xl py-10 px-12 gap-5 justify-center items-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-extrabold	text-4xl text-slate-50">
            Your AI magic artist
          </h1>
          <h1 className="font-extrabold	text-4xl">who never gets tired!</h1>
        </div>
        <div className="flex justify-between w-full px-48">
          {iconsLink.map((i) => (
            <Link key={i.title} href={i.page}>
              <div className="flex flex-col gap-2 items-center">
                <span className="p-4 bg-slate-50 rounded-full w-fit ">
                  <Image src={i.image} width={26} height={26} alt="icon" />
                </span>
                <p className="text-slate-50 text-sm font-semibold">{i.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <RescentEdits images={images!} />
    </div>
  );
}
