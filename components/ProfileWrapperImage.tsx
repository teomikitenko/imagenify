import Image from "next/image";
import Photo from "@/public/icons/photo.svg";
import { getDataByCreater } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs";
import ImagesGallery from "@/components/ImagesGallery";

const ProfileWrapperImage = async () => {
  const user = await currentUser();
  const edit = await getDataByCreater(user?.firstName! + " " + user?.lastName!);
  return (
    <>
      <div className="w-full md:w-1/2 border flex flex-col py-7 px-10 rounded-2xl shadow gap-4 dark:border-slate-900">
        <p className="text-base text-slate-500 font-medium">
          IMAGE MANIPULATION DONE
        </p>
        <div className="flex gap-3 ">
          <Image src={Photo} width={48} height={48} alt="photo" />
          <h2 className="flex items-center text-4xl font-extrabold text-blue-950 dark:text-slate-200  ">
            {edit?.length}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Recent Edits
        </h1>
        <ImagesGallery images={edit!} />
      </div>
    </>
  );
};

export default ProfileWrapperImage;
