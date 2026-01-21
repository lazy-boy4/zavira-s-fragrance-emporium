'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import CollectionForm from '@/components/admin/CollectionForm';
import { useToast } from '@/hooks/use-toast';

// Mock existing data
const mockCollection = {
    name: 'Signature Collection',
    slug: 'signature-collection',
    description: 'Our most iconic fragrances.',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
};

export default function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // In a real app, verify ID exists or fetch data
    if (!id) return null;

    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Updating collection:', data);

            toast({
                title: 'Collection updated',
                description: `${data.name} has been updated successfully.`,
            });

            router.push('/admin/collections');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update collection.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display tracking-wider">Edit Collection</h1>
                <p className="text-muted-foreground mt-1">
                    Update collection details
                </p>
            </div>

            <CollectionForm
                initialData={mockCollection}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
}
