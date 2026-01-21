'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, MoreHorizontal, Edit, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Mock collections data
const mockCollections = [
    {
        id: 'col_1',
        name: 'Signature Collection',
        slug: 'signature',
        description: 'Our most iconic fragrances',
        productCount: 6,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
        status: 'active',
    },
    {
        id: 'col_2',
        name: 'Noir Collection',
        slug: 'noir',
        description: 'Dark and mysterious scents',
        productCount: 4,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400',
        status: 'active',
    },
    {
        id: 'col_3',
        name: 'Limited Edition',
        slug: 'limited',
        description: 'Exclusive seasonal releases',
        productCount: 2,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
        status: 'active',
    },
    {
        id: 'col_4',
        name: 'Gift Sets',
        slug: 'gifts',
        description: 'Perfect for gifting',
        productCount: 3,
        image: 'https://images.unsplash.com/photo-1588514912908-4c16fbba3fb5?w=400',
        status: 'draft',
    },
];

/**
 * Collections Management Page
 */
export default function CollectionsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Collections</h1>
                    <p className="text-muted-foreground mt-1">
                        Organize your products into collections
                    </p>
                </div>
                <Link href="/admin/collections/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Collection
                    </Button>
                </Link>
            </div>

            {/* Collections grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockCollections.map((collection) => (
                    <Card key={collection.id} className="overflow-hidden">
                        <div className="relative h-40">
                            <Image
                                src={collection.image}
                                alt={collection.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <div className="absolute top-2 left-2">
                                <GripVertical className="h-5 w-5 text-foreground/50 cursor-grab" />
                            </div>
                            <div className="absolute top-2 right-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={`/admin/collections/${collection.id}/edit`}
                                                className="flex items-center gap-2"
                                            >
                                                <Edit className="h-4 w-4" /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="gap-2 text-destructive">
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-display text-lg">{collection.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {collection.description}
                                    </p>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={
                                        collection.status === 'active'
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-muted text-muted-foreground'
                                    }
                                >
                                    {collection.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">
                                {collection.productCount} products
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
