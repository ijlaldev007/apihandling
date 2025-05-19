# Stripe Integration Plan for Products API

This document provides a comprehensive plan for integrating Stripe payment processing into your existing Products API application. The integration will allow customers to purchase products through a secure checkout process.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Testing](#testing)
6. [Deployment Considerations](#deployment-considerations)
7. [Advanced Features](#advanced-features)
8. [Resources](#resources)

## Overview

The Stripe integration will consist of:

1. **Backend API endpoints** for creating payment intents, handling webhooks, and managing orders
2. **Frontend components** for displaying product checkout, payment forms, and order confirmation
3. **Custom hooks** for interacting with the Stripe API
4. **Type definitions** for Stripe-related data structures

## Prerequisites

Before starting the implementation, you'll need:

1. **Stripe Account**: Sign up at [stripe.com](https://stripe.com)
2. **API Keys**: Obtain test API keys from your Stripe dashboard
3. **Dependencies**: Install required packages for both frontend and backend

## Backend Implementation

### Step 1: Install Dependencies

```bash
cd backend
npm install stripe cors dotenv
```

### Step 2: Configure Environment Variables

Create a `.env` file in the backend directory:

```
STRIPE_SECRET_KEY=sk_test_your_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=http://localhost:5173
```

### Step 3: Create Stripe Configuration

Create a new file `backend/config/stripe.js`:

```javascript
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
```

### Step 4: Create Payment Routes

Create a new file `backend/routes/api/payments.js`:

```javascript
import express from 'express';
import stripe from '../../config/stripe.js';

const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Send the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle Stripe webhook events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Handle successful payment
      console.log('PaymentIntent was successful:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment
      console.log('Payment failed:', event.data.object.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

export default router;
```

### Step 5: Update API Index

Update `backend/routes/api/index.js` to include the new payment routes:

```javascript
import paymentsRouter from './payments.js';

// Add this line with the other router imports
router.use('/payments', paymentsRouter);
```

### Step 6: Update Express Configuration

Update `backend/index.js` to handle Stripe webhook raw body:

```javascript
// Add this before the express.json() middleware
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Keep the existing middleware for other routes
app.use(express.json());
```

## Frontend Implementation

### Step 1: Install Dependencies

```bash
cd frontend
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Step 2: Create Stripe Context

Create a new file `frontend/src/contexts/StripeContext.tsx`:

```tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your publishable key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_your_publishable_key');

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeContext = createContext(null);

export const StripeProvider = ({ children }: StripeProviderProps) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export const useStripe = () => useContext(StripeContext);
```

### Step 3: Add Stripe Provider to App

Update `frontend/src/App.tsx` to include the Stripe provider:

```tsx
import { StripeProvider } from '@/contexts/StripeContext';

function App() {
  return (
    <BrowserRouter>
      <StripeProvider>
        <Routes>
          {/* Existing routes */}
        </Routes>
      </StripeProvider>
    </BrowserRouter>
  );
}
```

### Step 4: Create Payment API Hook

Create a new file `frontend/src/hooks/usePayment.ts`:

```tsx
import { useMutation } from '@tanstack/react-query';
import { post } from '@/api/client';

interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: async (params: CreatePaymentIntentParams): Promise<PaymentIntentResponse> => {
      const response = await post<PaymentIntentResponse>('/payments/create-payment-intent', params);
      return response.data;
    },
  });
}
```

### Step 5: Create Checkout Component

Create a new file `frontend/src/components/checkout/CheckoutForm.tsx`:

```tsx
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useCreatePaymentIntent } from '@/hooks/usePayment';
import { Product } from '@/types/product';

interface CheckoutFormProps {
  product: Product;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

export function CheckoutForm({ product, onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createPaymentIntent = useCreatePaymentIntent();

  useEffect(() => {
    // Create a payment intent when the component mounts
    if (product) {
      createPaymentIntent.mutate(
        {
          amount: product.price,
          metadata: {
            productId: product.id.toString(),
            productName: product.name,
          },
        },
        {
          onSuccess: (data) => {
            setClientSecret(data.clientSecret);
          },
          onError: (error) => {
            setErrorMessage('Failed to initialize payment. Please try again.');
            console.error('Payment intent error:', error);
          },
        }
      );
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An error occurred during payment.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  if (!clientSecret) {
    return <div>Loading payment form...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <AddressElement options={{ mode: 'shipping' }} />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || isLoading}>
          {isLoading ? 'Processing...' : `Pay $${product.price.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
```

### Step 6: Create Checkout Modal

Create a new file `frontend/src/components/checkout/CheckoutModal.tsx`:

```tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckoutForm } from './CheckoutForm';
import { Product } from '@/types/product';

// Replace with your publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
}

export function CheckoutModal({ product, isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#10b981', // emerald-500
    },
  };

  const options = {
    clientSecret: '',
    appearance,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checkout: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              product={product}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Step 7: Create Buy Button Component

Create a new file `frontend/src/components/products/BuyButton.tsx`:

```tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/useToast';

interface BuyButtonProps {
  product: Product;
}

export function BuyButton({ product }: BuyButtonProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();

  const handleSuccess = (paymentIntentId: string) => {
    setIsCheckoutOpen(false);
    toast({
      title: 'Payment Successful!',
      description: `Thank you for purchasing ${product.name}`,
    });
    // You could redirect to an order confirmation page here
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
      />
    </>
  );
}
```

### Step 8: Create Toast Hook

Create a new file `frontend/src/hooks/useToast.tsx`:

```tsx
import { useState, useCallback } from 'react';
import { Toast, ToastAction } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';

interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { ...options, id }]);

    // Auto-dismiss after duration
    if (options.duration !== 0) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, options.duration || 5000);
    }

    return id;
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const ToastContainer = () => (
    <Toaster>
      {toasts.map((toast, index) => (
        <Toast key={index} onClose={() => dismissToast(toast.id)}>
          <div className="grid gap-1">
            <div className="font-medium">{toast.title}</div>
            {toast.description && <div className="text-sm">{toast.description}</div>}
          </div>
          {toast.action && (
            <ToastAction onClick={toast.action.onClick}>
              {toast.action.label}
            </ToastAction>
          )}
        </Toast>
      ))}
    </Toaster>
  );

  return { toast, dismissToast, ToastContainer };
}
```

### Step 9: Update Product Details Page

Update `frontend/src/pages/products/ProductDetailsPage.tsx` to include the Buy Button:

```tsx
// Import the BuyButton component
import { BuyButton } from '@/components/products/BuyButton';

// Add this inside the product details card
<CardFooter className="flex justify-between">
  <Button variant="outline" onClick={() => navigate(-1)}>
    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
  </Button>
  <BuyButton product={product} />
</CardFooter>
```

### Step 10: Create Checkout Success Page

Create a new file `frontend/src/pages/checkout/CheckoutSuccessPage.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    // Get the payment_intent from the URL
    const payment_intent = searchParams.get('payment_intent');
    setPaymentIntent(payment_intent);

    // In a real app, you would verify the payment status with your backend here
  }, [searchParams]);

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
          <CardDescription className="text-center">
            Thank you for your purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground">Payment ID:</p>
              <p className="font-mono text-xs break-all">{paymentIntent}</p>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### Step 11: Update App Routes

Update `frontend/src/App.tsx` to include the checkout success route:

```tsx
// Import the CheckoutSuccessPage
import CheckoutSuccessPage from '@/pages/checkout/CheckoutSuccessPage';

// Add this inside the Routes component
<Route path="checkout/success" element={<CheckoutSuccessPage />} />
```

## Testing

### Step 1: Set Up Stripe CLI for Webhook Testing

1. Download and install the [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward events to your local server:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/payments/webhook
   ```
4. Note the webhook signing secret provided by the CLI and add it to your `.env` file

### Step 2: Test Payments with Test Cards

Stripe provides test card numbers for different scenarios:

| Card Number         | Scenario           |
|---------------------|-------------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Declined payment  |
| 4000 0000 0000 3220 | 3D Secure authentication |

Use these cards with any future expiration date, any 3-digit CVC, and any postal code.

### Step 3: Test Webhook Events

Use the Stripe CLI to trigger test webhook events:

```bash
stripe trigger payment_intent.succeeded
```

## Deployment Considerations

### Environment Variables

Ensure you set the following environment variables in your production environment:

1. **Backend**:
   - `STRIPE_SECRET_KEY` (use the live key in production)
   - `STRIPE_WEBHOOK_SECRET` (from your Stripe dashboard)
   - `FRONTEND_URL` (your production frontend URL)

2. **Frontend**:
   - Update the publishable key in your Stripe provider

### Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **Webhook Signatures**: Always verify webhook signatures
3. **API Keys**: Never expose your secret key in the frontend
4. **PCI Compliance**: Using Stripe Elements ensures you don't handle card data directly

## Advanced Features

Once you have the basic Stripe integration working, you can implement these advanced features:

### 1. Shopping Cart

Implement a shopping cart to allow users to purchase multiple products at once:

1. Create a cart context to manage the cart state
2. Add "Add to Cart" buttons on product cards and details pages
3. Create a cart page to display cart items and total
4. Modify the checkout process to handle multiple items

### 2. Saved Payment Methods

Allow users to save and reuse payment methods:

1. Implement user authentication
2. Use Stripe Customer API to create and manage customers
3. Store customer IDs in your database
4. Use Stripe's Payment Element with saved payment methods

### 3. Subscription Products

Implement recurring payments for subscription-based products:

1. Add subscription fields to product model (interval, price)
2. Create subscription plans in Stripe dashboard
3. Implement subscription checkout flow
4. Add subscription management UI

### 4. Order History

Create an order history page for users:

1. Store order information in your database
2. Create an orders API endpoint
3. Implement an order history page
4. Add order details page with payment and shipping information

## Resources

### Official Documentation

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe.js and Elements](https://stripe.com/docs/js)
- [React Stripe.js](https://stripe.com/docs/stripe-js/react)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

### Tutorials and Guides

- [Accept a Payment](https://stripe.com/docs/payments/accept-a-payment)
- [Build a Checkout Page](https://stripe.com/docs/payments/checkout/custom)
- [Handle Webhook Events](https://stripe.com/docs/webhooks/build)
- [Test Stripe Integration](https://stripe.com/docs/testing)

### Tools

- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com/)
