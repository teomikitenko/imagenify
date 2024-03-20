import { Dispatch, SetStateAction } from "react";
import type { Database } from "./supabase";


export type ThemeObject = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};
export type TransformationData = {
  transformProps: Transformations;
  prompt: string;
  color?: string;
  replacement?:string
};
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
    replace?:{
      from: string,
      to: string,
      preserveGeometry:boolean
    }
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
    color?:string,
    replacement?:string 
  }
  export type Prompt = {
    type: keyof Transformations,
    transformations:[string]
  }
  export type ImagesType = Database['public']['Tables']['transformations']['Row']
  export type DictionaryPic = {
    restore: any;
    aspectRatio: any;
    remove: any;
    recolor: any;
    replace:any
  };
  export type User = Database['public']['Tables']['users']['Insert']

  export type PurchaseObject = {
    price:number,
    name:string | null | undefined,
    plan_name:string
  }
 export type CardDetails = {
    planName:string,
    planPrice:number,
    creditsAmount: number,
    planDetail:[string,boolean][]
}

 export type CardType = CardDetails[] 
