import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { addUser } from '@/lib/supabase'
import type { User } from '@/types/type'
 
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt:WebhookEvent 
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent 
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
  switch (evt.type) {
    case 'user.created':
      const firstName = evt.data.first_name
      const lastName = evt.data.last_name
      const userObject={
        name:firstName + " " + lastName,credits:'15'
       }
      await addUser(userObject as User)
  } 
  return new Response('all ok', { status: 200 })
}
 