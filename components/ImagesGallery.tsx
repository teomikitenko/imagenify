import type { ImagesType } from "@/types/type";
import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type DictionaryPic = {
  restore: any;
  aspectRatio: any;
  remove: any;
  recolor: any;
};

const ImagesGallery = ({ images }: { images: ImagesType[] }) => {
  const pic = {
    restore: Pic,
    aspectRatio: Stars,
    remove: Scan,
    recolor: Filter,
  };
  return (
    <div className="grid grid-cols-3 gap-5">
      {images?.map((i) => {
         const typePrompt: string = Object.keys(i.transformation!)[0]; 
        return (
          <Link key={i.id} href={`/transformations/${i.id}`}>
          <Card>
            <CardContent>
              <Image
                src={i.transformationUrl!}
                height={500}
                width={500}
                className="h-56"
                alt="image-gallery"
              />
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <p className="text-xl font-bold text-blue-800 truncate">
                  {i.title}
                </p>
                 <Image
                  src={pic[typePrompt as keyof DictionaryPic]}
                  width={24}
                  height={24}
                  alt="icon"
                /> 
              </div>
            </CardFooter>
          </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ImagesGallery;
