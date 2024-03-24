import React, { Suspense } from "react";
import TransformedFormWrapper from "@/components/wrappers/TransformedFormWrapper";
import { LoadingFormOneInput } from "@/components/Loading";

const Restore = () => {
  return (
    <div className="flex h-screen flex-col gap-8">
      <div>
        <h1 className="responsive-text pt-11 lg:pt-0 font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Restore Image
        </h1>
        <h3 className="text-slate-500 dark:text-slate-200">
          Refine images by removing noise and imperfections
        </h3>
      </div>
      <Suspense fallback={<LoadingFormOneInput />}>
        <TransformedFormWrapper type="restore" />
      </Suspense>
    </div>
  );
};

export default Restore;
