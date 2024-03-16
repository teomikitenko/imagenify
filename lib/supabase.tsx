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
export const getCountPages = async () => {
  const { count } = await supabase
    .from("transformations")
    .select("*", { count: "exact", head: true });
  return count;
};

export const getSearchCountPages = async (search?: string) => {
  const { data } = await supabase
    .from("transformations")
    .select("*")
    .ilike("title", `%${search ? search : ""}%`)
    .select("*")
  return data?.length;
};
export const getAllTransformations = async (obj: {
  page?: string;
  search?: string;
}) => {
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
    .ilike("title", `%${obj.search ? obj.search : ""}%`)
    .range(from, to)
    .select("*")
    .order('created_at', { ascending: false })
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
    .select('*')
    .order('created_at', { ascending: false })
  return data;
};
