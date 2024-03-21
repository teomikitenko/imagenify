import { currentUser } from '@clerk/nextjs';
import TransformedForm from '../TransformedForm'
import { getUserCurrentCredits } from '@/lib/supabase';
import { Transformations } from '@/types/type';

const TransformedFormWrapper = async({type}:{type:keyof Transformations}) => {
    const user = await currentUser();
    const credits = await getUserCurrentCredits(user?.id!)
  return <TransformedForm key={type} type={type} credits={credits![0].credits}/>
}

export default TransformedFormWrapper