'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Upload, ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

const collectionSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters'),
    description: z.string().optional(),
    isActive: z.boolean(),
    image: z.any().optional(), // In a real app, this would be validated more strictly
});

type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
    initialData?: CollectionFormValues;
    onSubmit: (data: CollectionFormValues) => Promise<void>;
    isLoading?: boolean;
}

export default function CollectionForm({ initialData, onSubmit, isLoading }: CollectionFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(
        typeof initialData?.image === 'string' ? initialData.image : null
    );

    const form = useForm<CollectionFormValues>({
        resolver: zodResolver(collectionSchema),
        defaultValues: initialData || {
            name: '',
            slug: '',
            description: '',
            isActive: true,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create local preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            form.setValue('image', file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Collection Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Summer Essentials" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. summer-essentials" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                URL-friendly version of the name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe this collection..."
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Active</FormLabel>
                                                <FormDescription>
                                                    Visible in store
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Image</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {imagePreview ? (
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                            <Image
                                                src={imagePreview}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute right-2 top-2 h-8 w-8"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    form.setValue('image', undefined);
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
                                            <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="image-upload"
                                            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-1 text-sm text-muted-foreground">
                                                <Upload className="h-6 w-6" />
                                                <span>Upload Image</span>
                                            </div>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Collection
                    </Button>
                </div>
            </form>
        </Form>
    );
}
