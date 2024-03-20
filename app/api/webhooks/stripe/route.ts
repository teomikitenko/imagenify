const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request:Request) {
    const sig = request.headers.get('stripe-signature');
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.json(), sig, endpointSecret);
      } catch (err:any) {
       return  new Response(`Webhook Error: ${err.message}`,{status: 400});
      }
      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          console.log({chekdata:checkoutSessionCompleted})
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      return new Response('Success!', {
        status: 200,
      });
  }
