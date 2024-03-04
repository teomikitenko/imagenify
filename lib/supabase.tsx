"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { TransformData } from "@/types/type";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const addData = async (transformData:TransformData) => {
  const { data, error } = await supabase
    .from("transformations")
    .insert( transformData )
    .select();
};

export const getAllTransformations = async () => {
  let { data: transformations, error } = await supabase
    .from("transformations")
    .select("*");
  return transformations;
};
export const getTransformationData = async (id:string)=>{
  const { data, error } = await supabase
  .from('transformations')
  .select()
  .eq('id', id)
  .select()
  return data
}


