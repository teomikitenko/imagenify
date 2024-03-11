"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { TransformData } from "@/types/type";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const addData = async (transformData: TransformData) => {
  const { data, error } = await supabase
    .from("transformations")
    .insert(transformData)
    .select();
};
export const getCountPages = async (search?:string) => {
  const { count, error } = await supabase
    .from("transformations")
    /* .ilike('title',`%${search? search:''}%`) */    // need give actual count info if i use search param
    .select("*", { count: "exact", head: true });
  return count;
};

/* export const getCountByName = async () => {
  const { count, error } = await supabase
    .from("transformations")
    .select("*", { count: "exact", head: true });
  return count;
}; */

export const getAllTransformations = async (obj:{page?: string,search?:string}) => {
  const from = obj.page
    ? obj.page === "1"
      ? Number(obj.page) * 5 - 5
      : Number(obj.page) * 5 - 5 + 1
    : 0;
  const to = obj.page
    ? obj.page === "1"
      ? Number(obj.page) * 5
      : Number(obj.page) * 5 + 1
    : 5;
  let { data: transformations, error } = await supabase
    .from("transformations")
    .select("*")
    .ilike('title',`%${obj.search? obj.search:''}%`)
    .range(from, to)
    .select("*");
  return transformations;
};
export const getTransformationById = async (id: string) => {
  const { data, error } = await supabase
    .from("transformations")
    .select()
    .eq("id", id)
    .select();
  return data;
};
export const getDataByCreater = async (creater: string) => {
  const { data, error } = await supabase
    .from("transformations")
    .select()
    .eq("creater", creater)
    .select();
  return data;
};
