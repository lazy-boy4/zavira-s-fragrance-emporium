'use client';
import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function MockPaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const orderId = searchParams.get('orderId');
    const method = searchParams.get('method') || 'bkash';
    const [processing, setProcessing] = useState(false);

    const handlePayment = async (success: boolean) => {
        setProcessing(true);
        try {
            // Call webhook to update order
            const response = await fetch('/api/payment/webhook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    status: success ? 'success' : 'failed',
                    transactionId: `mock_trx_${Date.now()}`
                })
            });

            if (!response.ok) {
                // Even if webhook fails (e.g. order not found because we fake it), we proceed for UI demo
                console.error('Webhook failed, potentially due to fake order ID');
            }

            if (success) {
                toast({ title: 'Payment Successful', description: 'Your order has been placed.' });
                router.push(`/checkout/confirmation?orderId=${orderId}`);
            } else {
                toast({ title: 'Payment Failed', description: 'Transaction was cancelled.', variant: 'destructive' });
                router.push('/checkout/payment'); // Go back to payment selection
            }

        } catch (error) {
            toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
        } finally {
            setProcessing(false);
        }
    };

    if (!orderId) return <div className="p-10 text-center">Invalid Order ID</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Simulated {method === 'bkash' ? 'bKash' : 'Nagad'} Payment
                    </CardTitle>
                    <CardDescription className="text-center">
                        This is a mock payment gateway for testing.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded text-center">
                        <p className="text-sm text-gray-500">Amount to pay</p>
                        <p className="text-2xl font-bold">BDT 1,500.00</p>
                        <p className="text-xs text-gray-400 mt-1">Order ID: {orderId}</p>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                        <p>Credentials: Any (Test Mode)</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full bg-[#e2136e] hover:bg-[#c2105e] text-white"
                        size="lg"
                        onClick={() => handlePayment(true)}
                        disabled={processing}
                    >
                        {processing ? <Loader2 className="animate-spin mr-2" /> : null}
                        Confirm Payment
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => handlePayment(false)}
                        disabled={processing}
                    >
                        Cancel Transaction
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function MockPaymentPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Gateway...</div>}>
            <MockPaymentContent />
        </Suspense>
    );
}
