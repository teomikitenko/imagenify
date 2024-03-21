"use server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { TransformData,User } from "@/types/type";

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
export const getDataForProfile = async(id:string)=>{
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('user_id',id)
  .select(`user_id,credits,
  transformations(
    *
  )
  `)
  .order('created_at',{referencedTable:'transformations',ascending: false})
  return data
}
export const getUserCurrentCredits = async (id: string) => {
  const { data:credits, error } = await supabase
    .from("users")
    .select('*')
    .eq("user_id", id)
    .select('credits');
  return credits;
};
export const addUser = async(user:User)=>{
  const { error } = await supabase
  .from('users')
  .insert(user)
}
export const updateUserCredits = async(id:string,credits:number)=>{
  const { error } = await supabase
  .from('users')
  .update({ credits: credits })
  
}

export const decrementCredits=async(id:string)=>{
  const { data, error } = await supabase
  .rpc('decrement', {row_id: id })
}
export const updateCredits=async(count:number,id:string)=>{
  const { data, error } = await supabase
  .rpc('add_credits', {count:count,row_id: id })
}