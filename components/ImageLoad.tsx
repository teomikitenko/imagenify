"use client";

import { CldUploadWidget } from "next-cloudinary";
import type CldUploadWidgetInfo from "next-cloudinary";
import AddImage from "/public/icons/add.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
const ImageLoad = ({
  setId,
  setActive,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const [info, setInfo] = useState<
    CldUploadWidgetInfo.CldUploadWidgetInfo | undefined
  >(undefined);

  useEffect(() => {
    if (info) {
      setId(info.public_id);
    }
  }, [info]);

  return (
    <>
      <CldUploadWidget
        onSuccess={(results) => {
          setInfo(results!.info as CldUploadWidgetInfo.CldUploadWidgetInfo);
          setActive(false);
        }}
        uploadPreset="j3yzmj6s"
      >
        {({ open }) => {
          return (
            <div
              onClick={() => open()}
              className="flex flex-col w-full h-full min-h-80 justify-center items-center gap-3 cursor-pointer"
            >
              <span className="p-5 border shadow rounded-xl dark:border-gray-900">
                <Image src={AddImage} width={24} height={24} alt="add" />
              </span>
              <p className="text-slate-500 text-sm font-medium">
                Click here to upload image
              </p>
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageLoad;
