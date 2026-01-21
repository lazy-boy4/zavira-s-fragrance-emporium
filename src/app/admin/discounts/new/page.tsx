'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DiscountForm from '@/components/admin/DiscountForm';
import { useToast } from '@/hooks/use-toast';

export default function NewDiscountPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Creating discount:', data);

            toast({
                title: 'Discount created',
                description: `${data.code} has been created successfully.`,
            });

            router.push('/admin/discounts');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create discount.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display tracking-wider">New Discount</h1>
                <p className="text-muted-foreground mt-1">
                    Create a new discount code
                </p>
            </div>

            <DiscountForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
