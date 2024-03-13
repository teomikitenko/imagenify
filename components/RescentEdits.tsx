import SearchIcon from "@/public/icons/search.svg";
import Image from "next/image";
import ImagesGalleryWrapper from "./ImagesGalleryWrapper";
import { Suspense } from "react";
import { LoadingImagesGallery } from "./Loading";
import SearchInput from "./SearchInput";
const RescentEdits = ({
  page,
  count,
  search,
}: {
  count: number;
  page: string;
  search: string;
}) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold text-blue-950 dark:text-slate-200">
          Rescent Edits
        </h1>
        <div className="flex w-[35%] border rounded-2xl overflow-hidden dark:border-transparent">
          <div className="flex items-center pl-3 pr-1 ">
            <Image src={SearchIcon} height={24} width={24} alt="search" />
          </div>
          <SearchInput />
        </div>
      </div>
      <Suspense fallback={<LoadingImagesGallery />}>
        {/* @ts-expect-error Server Component */}
        <ImagesGalleryWrapper count={count} page={page} search={search} />
      </Suspense>
    </div>
  );
};

export default RescentEdits;
