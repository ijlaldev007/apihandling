import React, { createContext, useContext, type ReactNode, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Stripe publishable key with telemetry disabled
const stripePromise = loadStripe('pk_test_51N7yJrBOjaLETIrZACqk7WMeM5INr8ub5cnLxpJX8w3fZn65iGaQNN6ZYxO9kfnNE5JAwBYeUCPRz9vmW1TYuzMC00J1XO4XH7', {
  betas: ['stripe_js_analytics_disable_beta_1'],
});

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeContext = createContext(null);

export function StripeProvider({ children }: StripeProviderProps) {
  // Add a global error handler for unhandled promise rejections related to Stripe
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Only handle Stripe-related errors
      if (event.reason &&
          (event.reason.toString().includes('stripe') ||
           event.reason.toString().includes('r.stripe.com'))) {

        console.log('Handled Stripe-related rejection in StripeContext:', event.reason);

        // Prevent the error from appearing in the console
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0f172a',
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}

export const useStripe = () => useContext(StripeContext);
