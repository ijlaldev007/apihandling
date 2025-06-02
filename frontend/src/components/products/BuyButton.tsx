import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import type { Product } from '@/types/product';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

interface BuyButtonProps {
  product: Product;
}

export function BuyButton({ product }: BuyButtonProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSuccess = (paymentIntentId: string) => {
    setIsCheckoutOpen(false);
    toast({
      title: 'Payment Successful!',
      description: `Thank you for purchasing ${product.name}`,
      variant: 'default',
    });
    // Navigate to success page
    navigate(`/checkout/success?payment_intent=${paymentIntentId}`);
  };

  const handleError = (error: string) => {
    toast({
      title: 'Payment Failed',
      description: error,
      variant: 'destructive',
    });
  };

  return (
    <>
      <Button onClick={() => setIsCheckoutOpen(true)}>
        Buy Now - ${product.price.toFixed(2)}
      </Button>

      <CheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </>
  );
}
