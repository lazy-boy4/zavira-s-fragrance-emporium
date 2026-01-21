'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CollectionForm from '@/components/admin/CollectionForm';
import { useToast } from '@/hooks/use-toast';

export default function NewCollectionPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Creating collection:', data);

            toast({
                title: 'Collection created',
                description: `${data.name} has been created successfully.`,
            });

            router.push('/admin/collections');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to create collection.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display tracking-wider">New Collection</h1>
                <p className="text-muted-foreground mt-1">
                    Create a new product collection
                </p>
            </div>

            <CollectionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    );
}
