'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Edit, Trash2, FileText, Layout, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock content data
const mockPages = [
    { id: 'page_1', title: 'About Us', slug: '/about', status: 'published', updatedAt: '2024-01-15' },
    { id: 'page_2', title: 'FAQ', slug: '/faq', status: 'published', updatedAt: '2024-01-10' },
    { id: 'page_3', title: 'Shipping Policy', slug: '/shipping', status: 'published', updatedAt: '2024-01-08' },
    { id: 'page_4', title: 'Return Policy', slug: '/returns', status: 'draft', updatedAt: '2024-01-20' },
];

const mockBanners = [
    { id: 'banner_1', title: 'Hero Banner', location: 'Homepage', status: 'active' },
    { id: 'banner_2', title: 'Sale Banner', location: 'Shop Page', status: 'active' },
    { id: 'banner_3', title: 'Holiday Promo', location: 'Homepage', status: 'scheduled' },
];

const mockBlogs = [
    { id: 'blog_1', title: 'The Art of Fragrance Layering', author: 'Sarah Chen', status: 'published', date: '2024-01-18' },
    { id: 'blog_2', title: 'Winter Scents Guide', author: 'Michael Ross', status: 'published', date: '2024-01-12' },
    { id: 'blog_3', title: 'Behind the Scenes', author: 'Emma Wilson', status: 'draft', date: '2024-01-20' },
];

/**
 * Content Management Page
 */
export default function ContentPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Content</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage pages, banners, and blog posts
                    </p>
                </div>
            </div>

            <Tabs defaultValue="pages" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="pages" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Pages
                    </TabsTrigger>
                    <TabsTrigger value="banners" className="gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Banners
                    </TabsTrigger>
                    <TabsTrigger value="blog" className="gap-2">
                        <Layout className="h-4 w-4" />
                        Blog
                    </TabsTrigger>
                </TabsList>

                {/* Pages Tab */}
                <TabsContent value="pages" className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Page
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">URL</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockPages.map((page) => (
                                        <tr key={page.id} className="border-b last:border-0">
                                            <td className="p-4 font-medium">{page.title}</td>
                                            <td className="p-4 text-muted-foreground hidden md:table-cell">{page.slug}</td>
                                            <td className="p-4">
                                                <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                                                    {page.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="gap-2">
                                                            <Edit className="h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-destructive">
                                                            <Trash2 className="h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Banners Tab */}
                <TabsContent value="banners" className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Banner
                        </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {mockBanners.map((banner) => (
                            <Card key={banner.id}>
                                <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <CardContent className="pt-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">{banner.title}</h3>
                                            <p className="text-sm text-muted-foreground">{banner.location}</p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className={
                                                banner.status === 'active'
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-yellow-500/10 text-yellow-500'
                                            }
                                        >
                                            {banner.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Blog Tab */}
                <TabsContent value="blog" className="space-y-4">
                    <div className="flex justify-end">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Post
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Author</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                                        <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockBlogs.map((post) => (
                                        <tr key={post.id} className="border-b last:border-0">
                                            <td className="p-4 font-medium">{post.title}</td>
                                            <td className="p-4 text-muted-foreground hidden md:table-cell">{post.author}</td>
                                            <td className="p-4 text-muted-foreground hidden lg:table-cell">
                                                {new Date(post.date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                                    {post.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="gap-2">
                                                            <Edit className="h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-destructive">
                                                            <Trash2 className="h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
