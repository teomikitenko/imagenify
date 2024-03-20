"use server"
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { addData } from "@/lib/supabase"
import Stripe from "stripe";
import { PurchaseObject } from '@/types/type';

export async function save(obj:any) {
     try {
        await addData(obj)
     } catch (error) {
        throw error
     }
     revalidatePath('/')
}

export const onCheckout = async(data:PurchaseObject)=>{
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const session = await stripe.checkout.sessions.create({
   success_url: process.env.NEXT_PUBLIC_SERVER_URL,
   line_items: [
     {
       price_data:{
         currency:'usd',
         unit_amount:data.price*100,
         product_data:{
            name:data.plan_name
         }
       },
       quantity: 1,
     },
   ],
   mode: 'payment',
   metadata:{
    user:data.name!,
    credits:data.price,
    userId:data.userId!
   }
 });
 redirect(session.url!)
}