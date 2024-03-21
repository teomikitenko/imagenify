import { updateCredits } from "@/lib/supabase";
import Stripe from "stripe";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request:Request) {
    const sig = request.headers.get('stripe-signature');
    const body = await request.text()
    let event
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      } catch (err:any) {
       return  new Response(`Webhook Error: ${err.message}`,{status: 400});
      }
      switch (event.type) {
        case 'checkout.session.completed':
          const data:Stripe.Checkout.Session = event.data.object;
          await updateCredits(data!.metadata!.credits! as unknown as number,data!.metadata!.userId!)
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      return new Response('Success!', {
        status: 200,
      });
  }
