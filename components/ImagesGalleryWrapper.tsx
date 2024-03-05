import { getAllTransformations } from "@/lib/supabase";
import ImagesGallery from "./ImagesGallery";

export const dynamic = "force-dynamic";

const ImagesGalleryWrapper = async () => {
  const images = await getAllTransformations();
  return <ImagesGallery images={images!} />;
};

export default ImagesGalleryWrapper;
