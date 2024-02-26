import { Json } from "./supabase";

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
  };

  export type TransformData={
    title:string,
    creater:string,
    url:string,
    prompt:Transformations
  }