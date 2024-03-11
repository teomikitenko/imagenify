import { getAllTransformations } from "@/lib/supabase";
import ImagesGallery from "./ImagesGallery";
import Caret from "@/public/icons/caret-down.svg";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

const ImagesGalleryWrapper = async ({
  count,
  page,
  search,
}: {
  search: string;
  count: number;
  page: string;
}) => {
  console.log("image gallery" + " " + search);
  const images = page
    ? await getAllTransformations({
        page,
      })
    : await getAllTransformations({
        search,
      });
  return (
    <>
      <ImagesGallery images={images!} />
      <div className="mt-4 flex justify-between">
        <Link
          href={
            Number(page) - 1 === 0 ? `/?page=1` : `/?page=${Number(page) - 1}`
          }
        >
          <button
            disabled={Number(page) - 1 === 0}
            className={`bg-purple-gradient px-6 py-2 rounded-2xl ${
              Number(page) - 1 === 0 && "grayscale"
            }`}
          >
            <div className="flex gap-2 justify-center items-center ">
              <Image
                className="rotate-90 invert"
                src={Caret}
                width={16}
                height={16}
                alt="prev"
              />
              <p className="font-medium text-slate-100">Previous</p>
            </div>
          </button>
        </Link>
        <p className="flex items-center text-sm font-bold text-slate-500">{`${
          page ? page : "1"
        }/${count}`}</p>
        <Link href={page ? `/?page=${Number(page) + 1}` : "/?page=2"}>
          <button
            disabled={images?.length! < 6}
            className={`bg-purple-gradient px-6 py-2 rounded-2xl ${
              images?.length! < 6 && "grayscale"
            }`}
          >
            <div className="flex gap-2 justify-center items-center">
              <p className="text-slate-100 font-medium">Next</p>
              <Image
                className="rotate-[-90deg] invert"
                src={Caret}
                width={16}
                height={16}
                alt="prev"
              />
            </div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default ImagesGalleryWrapper;
