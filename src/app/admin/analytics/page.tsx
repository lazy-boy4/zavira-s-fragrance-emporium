'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ShoppingCart,
    Package,
    Calendar,
    RefreshCw,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// Dynamically import Recharts components to reduce initial bundle (Vercel best practice)
const RechartsArea = dynamic(
    () => import('recharts').then((mod) => mod.AreaChart),
    { ssr: false }
);
const RechartsBar = dynamic(
    () => import('recharts').then((mod) => mod.BarChart),
    { ssr: false }
);

// Mock KPI data
const mockKPIData = {
    totalRevenue: 127500,
    revenueChange: 12.5,
    totalOrders: 847,
    ordersChange: 8.3,
    newCustomers: 234,
    customersChange: 15.2,
    avgOrderValue: 150.59,
    aovChange: 3.8,
};

// Mock chart data
const mockRevenueData = [
    { month: 'Jan', revenue: 45000, orders: 312, customers: 89 },
    { month: 'Feb', revenue: 52000, orders: 365, customers: 102 },
    { month: 'Mar', revenue: 48000, orders: 338, customers: 95 },
    { month: 'Apr', revenue: 61000, orders: 412, customers: 128 },
    { month: 'May', revenue: 58000, orders: 389, customers: 115 },
    { month: 'Jun', revenue: 67000, orders: 445, customers: 142 },
];

const mockTopProducts = [
    { name: 'Zavira Primal', revenue: 28500, units: 190 },
    { name: 'Midnight Elixir', revenue: 22300, units: 143 },
    { name: 'Rose Noir', revenue: 18700, units: 124 },
    { name: 'Velvet Oud', revenue: 15200, units: 98 },
    { name: 'Golden Dawn', revenue: 12800, units: 82 },
];

/**
 * Analytics Page - Admin analytics dashboard
 * Uses dynamic imports for Recharts to optimize bundle size
 */
export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('12m');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Format currency
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate refresh
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    // KPI cards
    const kpiCards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(mockKPIData.totalRevenue),
            change: `+${mockKPIData.revenueChange}%`,
            trend: 'up' as const,
            icon: DollarSign,
            description: 'vs. last period',
        },
        {
            title: 'Total Orders',
            value: mockKPIData.totalOrders.toLocaleString(),
            change: `+${mockKPIData.ordersChange}%`,
            trend: 'up' as const,
            icon: ShoppingCart,
            description: 'vs. last period',
        },
        {
            title: 'New Customers',
            value: mockKPIData.newCustomers.toLocaleString(),
            change: `+${mockKPIData.customersChange}%`,
            trend: 'up' as const,
            icon: Users,
            description: 'vs. last period',
        },
        {
            title: 'Avg. Order Value',
            value: `$${mockKPIData.avgOrderValue.toFixed(2)}`,
            change: `+${mockKPIData.aovChange}%`,
            trend: 'up' as const,
            icon: Package,
            description: 'vs. last period',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Analytics</h1>
                    <p className="text-muted-foreground mt-1">
                        Track your store&apos;s performance and customer insights.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="shrink-0"
                    >
                        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[140px]">
                            <Calendar className="h-4 w-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="3m">Last 3 months</SelectItem>
                            <SelectItem value="6m">Last 6 months</SelectItem>
                            <SelectItem value="12m">Last 12 months</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">Export Report</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpiCards.map((kpi) => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold">{kpi.value}</div>
                            <div className="flex items-center text-xs mt-1">
                                {kpi.trend === 'up' ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                                )}
                                <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-destructive'}>
                                    {kpi.change}
                                </span>
                                <span className="text-muted-foreground ml-1">{kpi.description}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Revenue Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-display tracking-wider">Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue trends for {timeRange}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full">
                        {/* Placeholder for chart - full implementation requires Recharts setup */}
                        <div className="h-full bg-muted/20 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-muted-foreground mb-2">Revenue Chart</p>
                                <div className="grid grid-cols-6 gap-2 px-4">
                                    {mockRevenueData.map((data) => (
                                        <div key={data.month} className="text-center">
                                            <div
                                                className="bg-primary/60 rounded-t mx-auto mb-1"
                                                style={{
                                                    height: `${(data.revenue / 70000) * 150}px`,
                                                    width: '24px',
                                                }}
                                            />
                                            <span className="text-xs text-muted-foreground">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Top Products & Orders */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-display tracking-wider">Top Selling Products</CardTitle>
                        <CardDescription>Best performers by revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockTopProducts.map((product, index) => (
                                <div key={product.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-muted-foreground w-6">
                                            #{index + 1}
                                        </span>
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">{formatCurrency(product.revenue)}</div>
                                        <div className="text-xs text-muted-foreground">{product.units} units</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-display tracking-wider">Recent Orders Summary</CardTitle>
                        <CardDescription>Order statistics for the period</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Total Orders</span>
                                <span className="font-semibold">{mockKPIData.totalOrders}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Pending</span>
                                <span className="font-semibold text-yellow-500">23</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Processing</span>
                                <span className="font-semibold text-blue-500">45</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Shipped</span>
                                <span className="font-semibold text-green-500">687</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Returns</span>
                                <span className="font-semibold text-destructive">12</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
