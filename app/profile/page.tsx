import {LoadingProfile} from "@/components/Loading";
import { Suspense } from "react";
import ProfileWrapperImage from "@/components/wrappers/ProfileWrapperImage";

const Profile = async ({searchParams}:{searchParams:{credits:string}}) => {
  return (
    <div className="w-full pt-11 lg:pt-0 flex flex-col gap-3 lg:gap-10">
      <h1 className="responsive-text font-extrabold text-blue-950 mb-3 dark:text-slate-200">Profile</h1>
      <Suspense fallback={<LoadingProfile/>}>
        <ProfileWrapperImage credits = {searchParams.credits} />
      </Suspense>
    </div>
  );
};

export default Profile;
