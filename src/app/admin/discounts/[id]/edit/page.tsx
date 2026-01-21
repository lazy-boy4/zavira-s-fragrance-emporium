'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import DiscountForm from '@/components/admin/DiscountForm';
import { useToast } from '@/hooks/use-toast';

// Mock existing data
const mockDiscount = {
    code: 'SUMMER2024',
    type: 'percentage' as const,
    value: 20,
    minPurchase: 100,
    startsAt: new Date(),
    endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    isActive: true,
    usageLimit: 100,
};

export default function EditDiscountPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    if (!id) return null;

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Updating discount:', data);

            toast({
                title: 'Discount updated',
                description: `${data.code} has been updated successfully.`,
            });

            router.push('/admin/discounts');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update discount.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display tracking-wider">Edit Discount</h1>
                <p className="text-muted-foreground mt-1">
                    Update discount details
                </p>
            </div>

            <DiscountForm
                initialData={mockDiscount}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
