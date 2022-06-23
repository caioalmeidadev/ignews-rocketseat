import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeProps {
   priceId : string;
}

export function SubscribeButton({priceId}:SubscribeProps) {
   const {data: Session} = useSession();
   const router = useRouter();

   async function handleSubscribe() {
      if(!Session){
         signIn('github')
         return;
      }

      if(Session.activeSubscription){
         router.push('/posts');
         return;
      }

      try{
         const response = await api.post('subscribe');

         const {sessionId} = response.data;

         const stripe = await getStripeJs();

         stripe.redirectToCheckout({sessionId})
      }catch(err){
         alert(err.message);
      }
   }

 return (
     <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
     >
        Subscribe NOW
     </button>
 );
}