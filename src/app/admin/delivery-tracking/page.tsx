'use client';

import { useState } from 'react';
import { Truck, MapPin, Package, Search, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock tracking data
const mockShipments = [
    {
        id: 'TRK-89234',
        orderId: 'ORD-1023',
        customer: 'Alice Freeman',
        status: 'in-transit',
        location: 'Dhaka Distribution Center',
        eta: 'Today, 2:00 PM',
        progress: 75,
    },
    {
        id: 'TRK-89235',
        orderId: 'ORD-1024',
        customer: 'Bob Smith',
        status: 'delivered',
        location: 'Delivered to Front Desk',
        eta: 'Delivered',
        progress: 100,
    },
    {
        id: 'TRK-89236',
        orderId: 'ORD-1025',
        customer: 'Charlie Brown',
        status: 'processing',
        location: 'Warehouse',
        eta: 'Tomorrow',
        progress: 25,
    },
];

/**
 * Delivery Tracking Page
 */
export default function DeliveryTrackingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-display tracking-wider">Delivery Tracking</h1>
                    <p className="text-muted-foreground mt-1">
                        Monitor active shipments and delivery status
                    </p>
                </div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search tracking number..."
                        className="w-full sm:w-[300px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">in Transit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Out for Delivery</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Delivered Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Exceptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">3</div>
                    </CardContent>
                </Card>
            </div>

            {/* Shipments List */}
            <div className="grid gap-4">
                {mockShipments.map((shipment) => (
                    <Card key={shipment.id}>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-full ${shipment.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                            shipment.status === 'processing' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        <Truck className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{shipment.id}</h3>
                                            <Badge variant="outline">{shipment.orderId}</Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                            Customer: {shipment.customer}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {shipment.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                ETA: {shipment.eta}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="min-w-[200px] text-right">
                                    <div className="mb-2">
                                        <span className={`inline-flex items-center gap-1 font-medium ${shipment.status === 'delivered' ? 'text-green-600' :
                                                shipment.status === 'in-transit' ? 'text-blue-600' : 'text-yellow-600'
                                            }`}>
                                            {shipment.status === 'delivered' && <CheckCircle className="h-4 w-4" />}
                                            {shipment.status === 'in-transit' && <Truck className="h-4 w-4" />}
                                            {shipment.status.toUpperCase().replace('-', ' ')}
                                        </span>
                                    </div>
                                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${shipment.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${shipment.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
