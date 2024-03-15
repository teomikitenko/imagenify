import {LoadingProfile} from "@/components/Loading";
import { Suspense } from "react";
import ProfileWrapperImage from "@/components/ProfileWrapperImage";

const Profile = async () => {
  return (
    <div className="w-full pt-11 lg:pt-0 flex flex-col gap-10">
      <h1 className="text-4xl font-extrabold text-blue-950 mb-3 dark:text-slate-200">Profile</h1>
      <Suspense fallback={<LoadingProfile/>}>
        {/* @ts-expect-error Server Component */}
        <ProfileWrapperImage />
      </Suspense>
    </div>
  );
};

export default Profile;
