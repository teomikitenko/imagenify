import TransformedFormWrapper from "@/components/wrappers/TransformedFormWrapper";
import { Suspense } from "react";
import { LoadingFormTwoInput } from "@/components/Loading";

const Recolor = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="responsive-text pt-11 lg:pt-0 font-extrabold text-blue-950 mb-3 dark:text-slate-200">
          Object Recolor
        </h1>
        <h3 className="text-slate-500 dark:text-slate-200">
          Identify and recolor objects from the image
        </h3>
      </div>
        <Suspense fallback={<LoadingFormTwoInput/>}>
          <TransformedFormWrapper type='recolor'/>
        </Suspense>   
    </div>
  );
};
export default Recolor;
