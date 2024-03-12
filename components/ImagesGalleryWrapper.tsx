import { getAllTransformations } from "@/lib/supabase";
import ImagesGallery from "./ImagesGallery";
import Caret from "@/public/icons/caret-down.svg";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

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
  const images = await getAllTransformations({ page, search });
  const prevDisabledStyle = clsx({
    grayscale: Number(page) - 1 === 0 || !page,
  });
  const nextDisabedStyle = clsx({
    grayscale: images?.length! < 6,
  });
  const generatePath = () => {
    const prevLinkPath = page
      ? Number(page) - 1 === 0
        ? `/`
        : search
        ? `/?page=${Number(page) - 1}&search=${search}`
        : `/?page=${Number(page) - 1}`
      : "/";

    const nextLinkPath = page
      ? search
        ? `?page=${Number(page) + 1}&search=${search}`
        : `/?page=${Number(page) + 1}`
      : search
      ? `/?page=2&search=${search}`
      : "/?page=2";
    return { prevLinkPath, nextLinkPath };
  };
  return (
    <>
      <ImagesGallery images={images!} />
      <div className="mt-4 flex justify-between">
        <Link href={generatePath().prevLinkPath}>
          <button
            disabled={Number(page) - 1 === 0 || count === 1 || !page}
            className={`bg-purple-gradient px-6 py-2 rounded-2xl ${prevDisabledStyle}`}
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
        <Link href={generatePath().nextLinkPath}>
          <button
            disabled={images?.length! < 6}
            className={`bg-purple-gradient px-6 py-2 rounded-2xl ${nextDisabedStyle}`}
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
