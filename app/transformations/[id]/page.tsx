import { getTransformationById } from "@/lib/supabase";
import TransformationView from "@/components/TransformationView";

const Transformation = async ({ params }: { params: { id: string } }) => {
  const transformation = await getTransformationById(params.id);
  const readPrompt = () => {
    const promptHeader = Object.keys(transformation![0].transformation!);
    if (promptHeader.includes("aspectRatio")) {
      return (
        <>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200">
              Transformation:
            </h3>
            <h3 className="text-base text-blue-400 font-medium dark:text-slate-200">Fill</h3>
          </div>
          <p className="text-gray-400">●</p>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200">
              Aspect Ratio:
            </h3>
            <h3 className="text-base text-blue-400 font-medium ">
              {transformation![0].prompt}
            </h3>
          </div>
        </>
      );
    }
    if (promptHeader[0] === "recolor") {
      return (
        <>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200">
              Transformation:
            </h3>
            <h3 className="text-base text-blue-400 font-medium">
              {promptHeader[0]}
            </h3>
          </div>
          <p className="text-gray-400">●</p>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200 ">Prompt:</h3>
            <h3 className="text-base text-blue-400 font-medium">
              {transformation![0].prompt}
            </h3>
          </div>
          <p className="text-gray-400">●</p>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200">Color:</h3>
            <h3 className="text-base text-blue-400 font-medium">
              {transformation![0].color}
            </h3>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium">
              Transformation:
            </h3>
            <h3 className="text-base text-blue-400 font-medium">
              {promptHeader[0]}
            </h3>
          </div>
          <p className="text-gray-400">●</p>
          <div className="flex gap-1">
            <h3 className="text-base text-blue-950 font-medium dark:text-slate-200">Prompt:</h3>
            <h3 className="text-base text-blue-400 font-medium">
              {transformation![0].prompt}
            </h3>
          </div>
        </>
      );
    }
  };
  return (
    <div className="flex pt-11 lg:pt-0 flex-col gap-11">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold text-blue-950 mb-3 dark:text-slate-400">
          {transformation![0].title}
        </h1>
        <div className="flex gap-8">{readPrompt()}</div>
        <div className="h-[1px] mt-7 border-slate-200 w-full border-t-2"></div>
      </div>
      {/* @ts-expect-error Server Component */}
      <TransformationView
        original={transformation![0].originalUrl!}
        transformed={transformation![0].transformationUrl!}
      />
    </div>
  );
};

export default Transformation;
