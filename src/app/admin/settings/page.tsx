'use client';

import { useState } from 'react';
import { Save, Store, CreditCard, Truck, Bell, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

/**
 * Settings Page - Store settings management
 * Tabs: General, Payment, Shipping, Notifications, Security
 */
export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Configure your store settings and preferences
                    </p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="general" className="gap-2">
                        <Store className="h-4 w-4 hidden sm:block" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="gap-2">
                        <CreditCard className="h-4 w-4 hidden sm:block" />
                        Payment
                    </TabsTrigger>
                    <TabsTrigger value="shipping" className="gap-2">
                        <Truck className="h-4 w-4 hidden sm:block" />
                        Shipping
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4 hidden sm:block" />
                        Alerts
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="h-4 w-4 hidden sm:block" />
                        Security
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Store Information</CardTitle>
                            <CardDescription>Basic information about your store</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="store-name">Store Name</Label>
                                    <Input id="store-name" defaultValue="Zavira Parfums" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="store-email">Contact Email</Label>
                                    <Input id="store-email" type="email" defaultValue="contact@zavira.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="store-description">Store Description</Label>
                                <Textarea
                                    id="store-description"
                                    defaultValue="Luxury fragrances crafted with the finest ingredients."
                                    rows={3}
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select defaultValue="usd">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usd">USD ($)</SelectItem>
                                            <SelectItem value="eur">EUR (€)</SelectItem>
                                            <SelectItem value="gbp">GBP (£)</SelectItem>
                                            <SelectItem value="bdt">BDT (৳)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                                            <SelectItem value="bst">Bangladesh Time (BST)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payment Settings */}
                <TabsContent value="payment" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Configure payment gateways</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        Stripe
                                    </div>
                                    <div>
                                        <div className="font-medium">Stripe</div>
                                        <div className="text-sm text-muted-foreground">Credit cards, Apple Pay</div>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-pink-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        bKash
                                    </div>
                                    <div>
                                        <div className="font-medium">bKash</div>
                                        <div className="text-sm text-muted-foreground">Mobile payments (BD)</div>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        Nagad
                                    </div>
                                    <div>
                                        <div className="font-medium">Nagad</div>
                                        <div className="text-sm text-muted-foreground">Mobile payments (BD)</div>
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        COD
                                    </div>
                                    <div>
                                        <div className="font-medium">Cash on Delivery</div>
                                        <div className="text-sm text-muted-foreground">Pay when delivered</div>
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Shipping Settings */}
                <TabsContent value="shipping" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Zones</CardTitle>
                            <CardDescription>Configure shipping rates by region</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            <span className="font-medium">Dhaka Metro</span>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Standard (3-5 days)</Label>
                                            <Input type="number" defaultValue="60" className="h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Express (1-2 days)</Label>
                                            <Input type="number" defaultValue="120" className="h-8" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            <span className="font-medium">Outside Dhaka</span>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Standard (5-7 days)</Label>
                                            <Input type="number" defaultValue="100" className="h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Express (2-3 days)</Label>
                                            <Input type="number" defaultValue="180" className="h-8" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Configure when to receive email alerts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">New Orders</div>
                                    <div className="text-sm text-muted-foreground">
                                        Receive an email for every new order
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Low Stock Alerts</div>
                                    <div className="text-sm text-muted-foreground">
                                        When product stock falls below threshold
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Customer Reviews</div>
                                    <div className="text-sm text-muted-foreground">
                                        When a customer leaves a review
                                    </div>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Weekly Reports</div>
                                    <div className="text-sm text-muted-foreground">
                                        Summary of weekly performance
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Configure authentication and security</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Two-Factor Authentication</div>
                                    <div className="text-sm text-muted-foreground">
                                        Require 2FA for admin access
                                    </div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">Session Timeout</div>
                                    <div className="text-sm text-muted-foreground">
                                        Auto logout after inactivity
                                    </div>
                                </div>
                                <Select defaultValue="30">
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="15">15 minutes</SelectItem>
                                        <SelectItem value="30">30 minutes</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                        <SelectItem value="never">Never</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">IP Allowlist</div>
                                    <div className="text-sm text-muted-foreground">
                                        Restrict admin access by IP
                                    </div>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
