'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Edit, Trash2, Tag, Percent, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Mock discounts data
const mockDiscounts = [
    {
        id: 'disc_1',
        code: 'WELCOME20',
        description: '20% off first order',
        type: 'percentage',
        value: 20,
        usageCount: 156,
        usageLimit: 1000,
        expiresAt: '2024-12-31',
        isActive: true,
    },
    {
        id: 'disc_2',
        code: 'FREESHIP',
        description: 'Free shipping on orders $100+',
        type: 'shipping',
        value: 0,
        usageCount: 89,
        usageLimit: null,
        expiresAt: null,
        isActive: true,
    },
    {
        id: 'disc_3',
        code: 'HOLIDAY15',
        description: '15% holiday discount',
        type: 'percentage',
        value: 15,
        usageCount: 234,
        usageLimit: 500,
        expiresAt: '2024-01-15',
        isActive: false,
    },
    {
        id: 'disc_4',
        code: 'VIP50',
        description: '$50 off for VIP customers',
        type: 'fixed',
        value: 50,
        usageCount: 12,
        usageLimit: 50,
        expiresAt: null,
        isActive: true,
    },
];

/**
 * Discounts Management Page
 */
export default function DiscountsPage() {
    const [discounts, setDiscounts] = useState(mockDiscounts);

    const toggleDiscount = (id: string) => {
        setDiscounts((prev) =>
            prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Discounts</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage discount codes and promotions
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Discount
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Discounts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {discounts.filter((d) => d.isActive).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Uses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">
                            {discounts.reduce((sum, d) => sum + d.usageCount, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Savings Given
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">$4,320</div>
                    </CardContent>
                </Card>
            </div>

            {/* Discounts table */}
            <Card>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="border-b border-border">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Code
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Type
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                                    Usage
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                                    Expires
                                </th>
                                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                                    Status
                                </th>
                                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr key={discount.id} className="border-b border-border last:border-0">
                                    <td className="p-4">
                                        <div>
                                            <div className="font-mono font-medium">{discount.code}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {discount.description}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Badge variant="outline" className="gap-1">
                                            {discount.type === 'percentage' && (
                                                <>
                                                    <Percent className="h-3 w-3" />
                                                    {discount.value}%
                                                </>
                                            )}
                                            {discount.type === 'fixed' && (
                                                <>
                                                    <Tag className="h-3 w-3" />${discount.value}
                                                </>
                                            )}
                                            {discount.type === 'shipping' && (
                                                <>
                                                    <Tag className="h-3 w-3" />
                                                    Free Shipping
                                                </>
                                            )}
                                        </Badge>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="text-sm">
                                            {discount.usageCount}
                                            {discount.usageLimit && ` / ${discount.usageLimit}`}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        {discount.expiresAt ? (
                                            <span className="text-sm flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(discount.expiresAt).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">Never</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Switch
                                            checked={discount.isActive}
                                            onCheckedChange={() => toggleDiscount(discount.id)}
                                        />
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
        </div>
    );
}
