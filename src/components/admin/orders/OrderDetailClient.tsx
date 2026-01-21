"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  // Truck,
  // CheckCircle,
  Printer,
  Mail,
  MapPin,
  CreditCard,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data needs to be flexible or passed as props, for now keeping it internal to match legacy behavior
// In a real app, this would come from the server page

const mockOrder = {
  id: "ZAV-2847",
  status: "processing",
  paymentStatus: "paid",
  createdAt: "2024-12-26T10:30:00Z",
  updatedAt: "2024-12-26T11:45:00Z",
  customer: {
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
  shipping: {
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    method: "Standard Shipping",
  },
  payment: {
    method: "Credit Card",
    last4: "4242",
    brand: "Visa",
  },
  items: [
    {
      id: "item_1",
      name: "Zavira Primal",
      variant: "50ml",
      price: 145.00,
      quantity: 1,
      image: "/product-primal.jpg", // Fixed path for Next.js public folder
    },
    {
      id: "item_2",
      name: "Midnight Essence",
      variant: "100ml",
      price: 140.00,
      quantity: 1,
      image: "/product-midnight.jpg", // Fixed path for Next.js public folder
    },
  ],
  subtotal: 285.00,
  shipping_cost: 0,
  tax: 24.50,
  total: 309.50,
  timeline: [
    { event: "Order placed", date: "Dec 26, 2024 10:30 AM", icon: Clock },
    { event: "Payment confirmed", date: "Dec 26, 2024 10:31 AM", icon: CreditCard },
    { event: "Processing started", date: "Dec 26, 2024 11:45 AM", icon: Package },
  ],
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-destructive/10 text-destructive",
};

interface OrderDetailClientProps {
  id: string;
}

export default function OrderDetailClient({ id }: OrderDetailClientProps) {
  // In a real app, we would fetch data using the ID here or receive it as a prop
  // For now, using mockOrder but overriding ID for display
  const displayOrder = { ...mockOrder, id: id || mockOrder.id };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display tracking-wider">#{displayOrder.id}</h1>
              <Badge variant="secondary" className={statusColors[displayOrder.status]}>
                {displayOrder.status}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Placed on {new Date(displayOrder.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="h-4 w-4" /> Email Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayOrder.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 bg-muted rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$${item.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$${displayOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{displayOrder.shipping_cost === 0 ? "Free" : `$${displayOrder.shipping_cost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$${displayOrder.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>$${displayOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayOrder.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <event.icon className="h-4 w-4 text-primary" />
                      </div>
                      {index < displayOrder.timeline.length - 1 && (
                        <div className="w-px h-full bg-border flex-1 mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select defaultValue={displayOrder.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Update Status</Button>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-medium">{displayOrder.customer.name}</p>
              <p className="text-sm text-muted-foreground">{displayOrder.customer.email}</p>
              <p className="text-sm text-muted-foreground">{displayOrder.customer.phone}</p>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MapPin className="h-4 w-4" />
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>{displayOrder.shipping.address}</p>
              <p>{displayOrder.shipping.city}, {displayOrder.shipping.state} {displayOrder.shipping.zip}</p>
              <p>{displayOrder.shipping.country}</p>
              <p className="text-muted-foreground mt-3">{displayOrder.shipping.method}</p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>{displayOrder.payment.brand} ending in {displayOrder.payment.last4}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
