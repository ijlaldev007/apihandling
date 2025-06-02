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
    if (!payment_intent) {
      navigate('/products'); // Redirect if no payment intent found
      return;
    }
    setPaymentIntent(payment_intent);
  }, [searchParams, navigate]);

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
            {paymentIntent && (
              <div className="border rounded p-4">
                <p className="text-sm text-muted-foreground">Payment ID:</p>
                <p className="font-mono text-xs break-all">{paymentIntent}</p>
              </div>
            )}
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email will be sent to your email address.
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
