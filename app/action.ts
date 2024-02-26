"use server"
import { revalidatePath } from 'next/cache'
import { addData } from "@/lib/supabase"

export async function save(obj:any) {
     try {
        await addData(obj)
     } catch (error) {
        throw error
     }

     revalidatePath('/')
}