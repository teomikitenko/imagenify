import Image from "next/image";
import Photo from "@/public/icons/photo.svg";
import Coins from "@/public/icons/coins.svg";
import { getDataForProfile } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs";
import ImagesGallery from "@/components/ImagesGallery";
import ShowToast from "../ShowToast";

const ProfileWrapperImage = async ({ credits }: { credits: string }) => {
  const user = await currentUser();
  const profileInfo = await getDataForProfile(user?.id as string);
  const profieInfoCard = [
    {
      title: "CREDITS AVAILABLE",
      image: Coins,
      data: profileInfo![0].credits,
      alt: "coins",
    },
    {
      title: "IMAGE MANIPULATION DONE",
      image: Photo,
      data: profileInfo![0].transformations.length,
      alt: "photo",
    },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row w-full gap-4 sm:gap-12">
        {profieInfoCard.map((c) => (
          <div
            key={c.title}
            className="w-full border flex flex-col py-7 px-10 rounded-2xl shadow gap-4 dark:border-slate-900"
          >
            <p className="text-sm md:text-base text-slate-500 font-medium">
              {c.title}
            </p>
            <div className="flex gap-3">
              <Image
                src={c.image}
                sizes="100wv"
                className=" w-[35px] md:w-[48px]"
                alt={c.alt}
              />
              <h2 className="flex items-center text-2xl md:text-4xl font-extrabold text-blue-950 dark:text-slate-200  ">
                {c.data}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Recent Edits
        </h1>
        <ImagesGallery images={profileInfo![0].transformations} />
        {credits && <ShowToast credits={credits} />}
      </div>
    </>
  );
};

export default ProfileWrapperImage;
