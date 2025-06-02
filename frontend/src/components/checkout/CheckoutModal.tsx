import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PaymentForm } from './PaymentForm';
import type { Product } from '@/types/product';
import { useToast } from '@/hooks/useToast';

// Stripe publishable key with telemetry disabled
const stripePromise = loadStripe('pk_test_51N7yJrBOjaLETIrZACqk7WMeM5INr8ub5cnLxpJX8w3fZn65iGaQNN6ZYxO9kfnNE5JAwBYeUCPRz9vmW1TYuzMC00J1XO4XH7', {
  betas: ['stripe_js_analytics_disable_beta_1'],
});

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
}

export function CheckoutModal({ product, isOpen, onClose, onSuccess, onError }: CheckoutModalProps) {
  const { toast } = useToast();

  const handleSuccess = (paymentIntentId: string) => {
    toast({
      title: 'Payment Successful!',
      description: `Thank you for purchasing ${product.name}`,
    });
    // Call the provided onSuccess callback if it exists
    if (onSuccess) {
      onSuccess(paymentIntentId);
    }
    onClose();
  };

  const handleError = (error: string) => {
    toast({
      title: 'Payment Failed',
      description: error,
      variant: 'destructive',
    });
    // Call the provided onError callback if it exists
    if (onError) {
      onError(error);
    }
  };

  // Configure Stripe Elements appearance
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0f172a',
    },
  };

  // Default options for Stripe Elements
  const options = {
    mode: 'payment' as const,
    amount: Math.round(product.price * 100),
    currency: 'usd',
    appearance,
    // Use automatic payment methods to avoid needing a client secret upfront
    paymentMethodCreation: 'manual' as const,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Checkout: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-y-auto pr-2 flex-1">
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm
              product={product}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
}
