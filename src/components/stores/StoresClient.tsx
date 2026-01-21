"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

// Mock store data - replace with API response
const stores = [
    {
        id: 1,
        name: 'Zavira Paris Flagship',
        type: 'Flagship Store',
        address: '123 Avenue des Champs-Élysées',
        city: 'Paris',
        country: 'France',
        phone: '+33 1 42 56 78 90',
        hours: 'Mon-Sat: 10am-8pm, Sun: 11am-7pm',
        image: '/assets/product-primal.jpg', // Placeholder image
    },
    {
        id: 2,
        name: 'Zavira New York',
        type: 'Boutique',
        address: '500 Fifth Avenue',
        city: 'New York, NY',
        country: 'United States',
        phone: '+1 212 555 0123',
        hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
        image: '/assets/product-midnight.jpg', // Placeholder image
    },
    {
        id: 3,
        name: 'Zavira London',
        type: 'Boutique',
        address: '25 Bond Street',
        city: 'London',
        country: 'United Kingdom',
        phone: '+44 20 7946 0958',
        hours: 'Mon-Sat: 10am-7pm, Sun: 12pm-6pm',
        image: '/assets/product-essence.jpg', // Placeholder image
    },
    {
        id: 4,
        name: 'Zavira Dubai',
        type: 'Boutique',
        address: 'The Dubai Mall, Level 2',
        city: 'Dubai',
        country: 'UAE',
        phone: '+971 4 330 8899',
        hours: 'Sun-Wed: 10am-10pm, Thu-Sat: 10am-12am',
        image: '/assets/product-velvet.jpg', // Placeholder image
    },
];

const retailers = [
    { name: 'Neiman Marcus', locations: 'US Nationwide' },
    { name: 'Harrods', locations: 'London, UK' },
    { name: 'Galeries Lafayette', locations: 'Paris, France' },
    { name: 'Lane Crawford', locations: 'Hong Kong, China' },
    { name: 'Isetan', locations: 'Tokyo, Japan' },
];

export default function StoresClient() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStores = stores.filter((store) =>
        store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-card">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
                        Find a Store
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                        Visit our boutiques for a personalized fragrance consultation and discover the complete Zavira collection.
                    </p>

                    {/* Search */}
                    <div className="max-w-md mx-auto">
                        <Input
                            type="text"
                            placeholder="Search by city or country..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-background border-border text-center"
                        />
                    </div>
                </div>
            </section>

            {/* Store List */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="font-display text-2xl font-medium mb-8">Zavira Boutiques</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredStores.map((store) => (
                            <div key={store.id} className="bg-card border border-border overflow-hidden">
                                <div className="aspect-[16/9] overflow-hidden relative">
                                    <Image
                                        src={store.image}
                                        alt={store.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                {store.type}
                                            </p>
                                            <h3 className="font-display text-xl font-medium">{store.name}</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                            <div className="text-muted-foreground">
                                                <p>{store.address}</p>
                                                <p>{store.city}, {store.country}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                            <a
                                                href={`tel:${store.phone}`}
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {store.phone}
                                            </a>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                            <p className="text-muted-foreground">{store.hours}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-border">
                                        <Button variant="outline" size="sm" className="w-full gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Get Directions
                                            <ExternalLink className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStores.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No stores found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Authorized Retailers */}
            <section className="py-16 bg-card">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="font-display text-2xl font-medium mb-8">Authorized Retailers</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl">
                        Zavira is also available at select luxury department stores and specialty retailers worldwide.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {retailers.map((retailer, index) => (
                            <div key={index} className="bg-background border border-border p-6">
                                <h3 className="font-display font-medium mb-1">{retailer.name}</h3>
                                <p className="text-sm text-muted-foreground">{retailer.locations}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book Appointment CTA */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
                    <h2 className="font-display text-3xl font-medium mb-4">
                        Book a Private Consultation
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Experience our fragrances in an intimate setting with a personal consultation
                        from our fragrance specialists.
                    </p>
                    <Button variant="default" size="lg">
                        Schedule Appointment
                    </Button>
                </div>
            </section>
        </main>
    );
}
