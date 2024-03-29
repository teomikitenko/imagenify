import type { ImagesType, DictionaryPic} from "@/types/type";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Pic from "@/public/icons/image.svg";
import Stars from "@/public/icons/stars.svg";
import Scan from "@/public/icons/scan.svg";
import Filter from "@/public/icons/filter.svg";
import Replace from "@/public/icons/replace.svg";


const ImagesGallery = ({ images}: {images?: ImagesType[] }) => {
  const pic = {
    restore: Pic,
    aspectRatio: Stars,
    remove: Scan,
    recolor: Filter,
    replace:Replace
  };
  return (
    <div className="responsive-gallery">
      {images?.map((i) => {
        const prom = Object.keys(i.transformation!);
        const typePrompt: string[] = prom.filter((t) =>
          Object.keys(pic).find((p) => t === p)
        );
        return (
          <Link key={i.id} href={`/transformations/${i.id}`}>
            <Card>
              <CardContent>
                <div className="w-full">
                  <Image
                    src={i.transformationUrl!}
                    height={500}
                    width={500}
                    className="h-56 object-cover w-full"
                    alt="image-gallery"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between">
                  <p className="text-xl font-bold text-blue-800 truncate dark:text-slate-100">
                    {i.title}
                  </p>
                  <Image
                    src={pic[typePrompt[0] as keyof DictionaryPic]}
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
