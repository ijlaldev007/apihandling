import React, { useState, useEffect, useRef } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';
import { post } from '@/api/client';
import { AxiosError } from 'axios';

interface PaymentFormProps {
  product: Product;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export function PaymentForm({ product, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMounted = useRef(true);

  // Initialize the mounted ref
  useEffect(() => {
    isMounted.current = true;
    // Cleanup is now handled in the main effect
  }, []);

  useEffect(() => {
    // Create PaymentIntent when component mounts
    const createPaymentIntent = async () => {
      try {
        console.log('Creating payment intent for product:', product);
        interface PaymentIntentResponse {
          clientSecret: string;
          paymentIntentId: string;
        }

        const response = await post<PaymentIntentResponse>('/payments/create-payment-intent', {
          amount: product.price,
          metadata: {
            productId: product.id.toString(),
            productName: product.name,
          },
        });

        if (isMounted.current) {
          console.log('Payment intent created successfully:', response.data);
          setClientSecret(response.data.clientSecret);
        }
      } catch (error) {
        console.error('Payment intent creation error:', error);

        // More detailed error logging
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as AxiosError;
          console.error('Error response:', axiosError.response);
          console.error('Error status:', axiosError.response?.status);
          console.error('Error data:', axiosError.response?.data);
        }

        if (isMounted.current) {
          setErrorMessage(`Failed to initialize payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
          onError(`Failed to initialize payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    };

    createPaymentIntent();

    // Add a global error handler for unhandled promise rejections related to Stripe
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Only handle Stripe-related errors
      if (event.reason &&
          (event.reason.toString().includes('stripe') ||
           event.reason.toString().includes('r.stripe.com'))) {

        console.log('Handled Stripe-related rejection:', event.reason);

        // Prevent the error from appearing in the console
        event.preventDefault();

        // Don't show errors for analytics/telemetry failures
        if (!event.reason.toString().includes('r.stripe.com/b')) {
          if (isMounted.current) {
            setErrorMessage('There was an issue with the payment processor. Your payment can still be processed.');
          }
        }
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      isMounted.current = false;
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [product, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Payment form submitted');

    if (!stripe || !elements || !clientSecret) {
      console.error('Cannot process payment:', {
        stripe: !!stripe,
        elements: !!elements,
        clientSecret: !!clientSecret
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      console.log('Submitting payment elements');
      // Submit the Elements form first
      const { error: submitError } = await elements.submit();

      if (submitError) {
        console.error('Elements submission error:', submitError);
        setErrorMessage(submitError.message || 'An error occurred during payment submission.');
        onError(submitError.message || 'An error occurred during payment submission.');
        setIsLoading(false);
        return;
      }

      console.log('Elements submitted successfully, confirming payment with client secret:', clientSecret);
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required',
      });

      console.log('Payment confirmation result:', result);

      if (result.error) {
        console.error('Payment error:', result.error);
        setErrorMessage(result.error.message || 'An error occurred during payment.');
        onError(result.error.message || 'An error occurred during payment.');
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', result.paymentIntent);
        onSuccess(result.paymentIntent.id);
      } else if (result.paymentIntent) {
        console.log('Payment status:', result.paymentIntent.status);
        // Handle other payment statuses
        if (result.paymentIntent.status === 'requires_action') {
          setErrorMessage('Additional authentication required. Please follow the instructions.');
        } else {
          setErrorMessage(`Payment status: ${result.paymentIntent.status}. Please try again.`);
        }
      }
    } catch (err) {
      console.error('Unexpected payment error:', err);
      setErrorMessage('An unexpected error occurred.');
      onError('An unexpected error occurred.');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 min-h-[300px]">
      <div className="space-y-6">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errorMessage}
          </div>
        )}
        <PaymentElement />
      </div>
      <div className="flex justify-end pt-4 sticky bottom-0 bg-background">
        <Button
          type="submit"
          disabled={!stripe || !elements || !clientSecret || isLoading}
        >
          {isLoading ? 'Processing...' : `Pay $${product.price.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
