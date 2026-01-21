"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function CheckoutConfirmationPage() {
  return (
    <div className="min-h-screen pt-20">
      <main className="container mx-auto px-4 py-16 lg:py-24 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-8" />
          
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
            Thank You for Your Order!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Your order has been successfully placed and is being processed.
          </p>
          
          <div className="bg-card border border-border p-8 mb-8">
            <p className="text-sm text-muted-foreground">
              Order Number: <span className="font-mono font-medium">ZAV-2024-001234</span>
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Estimated Delivery: <span className="font-medium">January 25, 2026</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild variant="default" size="lg">
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/orders">
                View Order Status
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
