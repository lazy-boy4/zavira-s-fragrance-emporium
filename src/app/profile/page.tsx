'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Profile Page - User account management
 * 
 * Features:
 * - Profile information editing
 * - Order history (mock data)
 * - Address book
 * - Wishlist placeholder
 * - Account settings
 */

// Mock orders - replace with API response
const mockOrders = [
    {
        id: 'ZAV-8293',
        date: '2024-12-20',
        status: 'Delivered',
        total: 157.50,
        items: [{ name: 'Zavira Primal', quantity: 1 }],
    },
    {
        id: 'ZAV-7182',
        date: '2024-11-15',
        status: 'Delivered',
        total: 330.00,
        items: [
            { name: 'Midnight Elixir', quantity: 1 },
            { name: 'Rose Noir', quantity: 1 },
        ],
    },
];

// Mock addresses - replace with API response
const mockAddresses = [
    {
        id: 1,
        name: 'Home',
        street: '1200 Luxury Lane, Suite 400',
        city: 'New York',
        state: 'NY',
        zip: '10012',
        country: 'United States',
        isDefault: true,
    },
    {
        id: 2,
        name: 'Office',
        street: '500 Fashion Ave',
        city: 'New York',
        state: 'NY',
        zip: '10018',
        country: 'United States',
        isDefault: false,
    },
];

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading, isAuthenticated, signOut } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    // Redirect to auth if not logged in
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.replace('/auth?redirectTo=/profile');
        }
    }, [loading, isAuthenticated, router]);

    // Load user data when available
    useEffect(() => {
        if (user) {
            setProfile({
                firstName: user.user_metadata?.first_name || '',
                lastName: user.user_metadata?.last_name || '',
                email: user.email || '',
                phone: user.user_metadata?.phone || '',
            });
        }
    }, [user]);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call Supabase to update profile
        setIsEditing(false);
    };

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    if (loading) {
        return (
            <main className="pt-20">
                <section className="py-12 lg:py-24 bg-background">
                    <div className="container mx-auto px-4 lg:px-8 flex items-center justify-center min-h-[50vh]">
                        <div className="animate-pulse text-muted-foreground">Loading...</div>
                    </div>
                </section>
            </main>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    return (
        <main className="pt-20">
            <section className="py-12 lg:py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                        <div>
                            <h1 className="font-display text-4xl md:text-5xl font-medium mb-2">
                                My Account
                            </h1>
                            <p className="text-muted-foreground">
                                Welcome back, {profile.firstName || 'there'}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="self-start md:self-auto gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>

                    <Tabs defaultValue="profile" className="space-y-8">
                        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
                            <TabsTrigger
                                value="profile"
                                className="data-[state=active]:bg-card data-[state=active]:border-border border border-transparent gap-2"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </TabsTrigger>
                            <TabsTrigger
                                value="orders"
                                className="data-[state=active]:bg-card data-[state=active]:border-border border border-transparent gap-2"
                            >
                                <Package className="h-4 w-4" />
                                Orders
                            </TabsTrigger>
                            <TabsTrigger
                                value="addresses"
                                className="data-[state=active]:bg-card data-[state=active]:border-border border border-transparent gap-2"
                            >
                                <MapPin className="h-4 w-4" />
                                Addresses
                            </TabsTrigger>
                            <TabsTrigger
                                value="wishlist"
                                className="data-[state=active]:bg-card data-[state=active]:border-border border border-transparent gap-2"
                            >
                                <Heart className="h-4 w-4" />
                                Wishlist
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="data-[state=active]:bg-card data-[state=active]:border-border border border-transparent gap-2"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <div className="max-w-2xl">
                                <div className="bg-card border border-border p-6 lg:p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="font-display text-xl font-medium">Personal Information</h2>
                                        {!isEditing && (
                                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                                Edit
                                            </Button>
                                        )}
                                    </div>

                                    <form onSubmit={handleSaveProfile} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={profile.firstName}
                                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="bg-background border-border disabled:opacity-70"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={profile.lastName}
                                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="bg-background border-border disabled:opacity-70"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                disabled
                                                className="bg-background border-border disabled:opacity-70"
                                            />
                                            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={profile.phone}
                                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="bg-background border-border disabled:opacity-70"
                                            />
                                        </div>

                                        {isEditing && (
                                            <div className="flex gap-4 pt-4">
                                                <Button type="submit" variant="luxury">
                                                    Save Changes
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Orders Tab */}
                        <TabsContent value="orders">
                            <div className="space-y-4">
                                <h2 className="font-display text-xl font-medium">Order History</h2>

                                {mockOrders.length === 0 ? (
                                    <div className="bg-card border border-border p-8 text-center">
                                        <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet</p>
                                        <Link href="/shop">
                                            <Button variant="luxury">Start Shopping</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {mockOrders.map((order) => (
                                            <div key={order.id} className="bg-card border border-border p-6">
                                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                                    <div>
                                                        <p className="font-display font-medium">Order #{order.id}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs uppercase tracking-wider">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-border pt-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            {order.items.map((item, i) => (
                                                                <p key={i} className="text-sm text-muted-foreground">
                                                                    {item.name} × {item.quantity}
                                                                </p>
                                                            ))}
                                                        </div>
                                                        <p className="font-display font-medium">${order.total.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* Addresses Tab */}
                        <TabsContent value="addresses">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-display text-xl font-medium">Saved Addresses</h2>
                                    <Button variant="outline" size="sm">Add Address</Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mockAddresses.map((address) => (
                                        <div key={address.id} className="bg-card border border-border p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium">{address.name}</h3>
                                                    {address.isDefault && (
                                                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </div>
                                            <address className="text-sm text-muted-foreground not-italic leading-relaxed">
                                                {address.street}<br />
                                                {address.city}, {address.state} {address.zip}<br />
                                                {address.country}
                                            </address>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Wishlist Tab */}
                        <TabsContent value="wishlist">
                            <div className="bg-card border border-border p-8 text-center">
                                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h2 className="font-display text-xl font-medium mb-2">Your Wishlist is Empty</h2>
                                <p className="text-muted-foreground mb-6">
                                    Save your favorite fragrances for later
                                </p>
                                <Link href="/shop">
                                    <Button variant="luxury">Explore Fragrances</Button>
                                </Link>
                            </div>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings">
                            <div className="max-w-2xl space-y-6">
                                <div className="bg-card border border-border p-6">
                                    <h3 className="font-display text-lg font-medium mb-4">Password</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Change your password to keep your account secure
                                    </p>
                                    <Button variant="outline">Change Password</Button>
                                </div>

                                <div className="bg-card border border-border p-6">
                                    <h3 className="font-display text-lg font-medium mb-4">Email Preferences</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Manage your email subscriptions
                                    </p>
                                    <Button variant="outline">Manage Preferences</Button>
                                </div>

                                <div className="bg-card border border-destructive/50 p-6">
                                    <h3 className="font-display text-lg font-medium text-destructive mb-4">
                                        Delete Account
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Permanently delete your account and all associated data
                                    </p>
                                    <Button variant="destructive">Delete Account</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </main>
    );
}
