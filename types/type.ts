import { Json } from "./supabase";
import type { Database } from "./supabase";

export type Transformations = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
      prompt: string;
      removeShadow?: boolean;
      multiple?: boolean;
    };
    recolor?: {
      prompt?: string;
      to: string;
      multiple?: boolean;
    };
    removeBackground?: boolean;
    aspectRatio?:string
    crop?: "fill" | "lfill" | "fill_pad" | "crop" | "thumb" | "scale" | "fit" | "limit" | "mfit" | "pad" | "lpad" | "mpad" | "imagga_scale" | "imagga_crop" | undefined;
  };

  export type TransformData={
    title:string,
    creater:string,
    url:string,
    transformation:Transformations,
    prompt:string,
    color?:string 
  }

  export type Prompt = {
    type: keyof Transformations,
    transformations:[string]
  }
  export type ImagesType = Database['public']['Tables']['transformations']['Row']