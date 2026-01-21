"use client";

import Link from "next/link";
import { Truck, RotateCcw, Package, Clock } from "lucide-react";

export default function ShippingClient() {
  return (
    <div className="min-h-screen pt-20">
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Shipping & Returns
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Free shipping on orders over $150. Hassle-free returns within 30 days.
            </p>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-card border border-border">
                <Truck className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $150</p>
              </div>
              <div className="text-center p-6 bg-card border border-border">
                <Clock className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
              <div className="text-center p-6 bg-card border border-border">
                <Package className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Luxury Packaging</h3>
                <p className="text-sm text-muted-foreground">Signature gift box</p>
              </div>
              <div className="text-center p-6 bg-card border border-border">
                <RotateCcw className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return window</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-medium mb-4">Shipping Methods</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Standard Shipping (5-7 business days):</strong> $10.00 (Free over $150)
                  </p>
                  <p>
                    <strong>Express Shipping (3-5 business days):</strong> $20.00
                  </p>
                  <p>
                    <strong>Priority Shipping (1-2 business days):</strong> $35.00
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="font-display text-2xl font-medium mb-4">International Shipping</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Canada:</strong> $25.00 (7-10 business days)
                  </p>
                  <p>
                    <strong>Europe:</strong> $35.00 (7-14 business days)
                  </p>
                  <p>
                    <strong>Rest of World:</strong> $45.00 (10-21 business days)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium mb-4">Return Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We accept returns of unopened products within 30 days of delivery. Products must be in their original packaging with all seals intact.
                </p>
                <p>
                  To initiate a return, please contact our customer service team. Refunds are processed within 5-10 business days of receiving your return.
                </p>
              </div>
            </div>

            <div className="mt-16 p-6 bg-background border border-border text-center">
              <Link href="/faq" className="text-sm text-primary hover:text-foreground transition-colors font-medium">
                View FAQ for more details
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
