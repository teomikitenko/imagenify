import Image from "next/image";
import Download from "@/public/icons/download.svg";

const TransformationView = async ({
  original,
  transformed,
}: {
  original: string;
  transformed: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-3xl font-extrabold text-blue-950 dark:text-slate-400">
          Original
        </h1>
        <div className="min-h-80 h-fit relative rounded-2xl ">
          <Image
            src={original}
            className="object-cover"
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="100vw"
            alt="original"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-extrabold text-blue-950 dark:text-slate-400">
            Transformed
          </h1>
          <a href={transformed}>
            <Image src={Download} width={24} height={24} alt="download"/>
          </a>
        </div>

        <div className="relative min-h-80 h-fit rounded-2xl">
          <Image
            src={transformed}
            className="object-content"
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="100vw"
            alt="transformed"
          />
        </div>
      </div>
    </div>
  );
};

export default TransformationView;
