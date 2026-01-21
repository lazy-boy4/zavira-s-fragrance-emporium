"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutShippingClient() {
  const { items, getSubtotal } = useCart();

  return (
    <div className="min-h-screen pt-20">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="font-display text-2xl tracking-widest">
            ZAVIRA
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Progress Steps */}
        <nav className="flex items-center justify-center gap-4 mb-12" aria-label="Checkout progress">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">1</span>
            <span className="text-sm font-medium tracking-wide text-primary">SHIPPING</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">2</span>
            <span className="text-sm tracking-wide text-muted-foreground">PAYMENT</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">3</span>
            <span className="text-sm tracking-wide text-muted-foreground">CONFIRM</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          {/* Shipping Form */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-2">Shipping Information</h1>
            <p className="text-muted-foreground mb-8">Where should we send your essence?</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input type="email" placeholder="Email Address" className="bg-card border-border" autoComplete="email" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <Input type="text" placeholder="First Name" className="bg-card border-border" autoComplete="given-name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <Input type="text" placeholder="Last Name" className="bg-card border-border" autoComplete="family-name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <Input type="text" placeholder="Address" className="bg-card border-border" autoComplete="street-address" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Apartment, suite, etc. (optional)</label>
                <Input type="text" placeholder="Apartment, suite, etc. (optional)" className="bg-card border-border" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <Select>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">City</label>
                  <Input type="text" placeholder="City" className="bg-card border-border" autoComplete="address-level2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">ZIP Code</label>
                  <Input type="text" placeholder="ZIP Code" className="bg-card border-border" autoComplete="postal-code" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone (optional)</label>
                  <Input type="tel" placeholder="Phone (optional)" className="bg-card border-border" autoComplete="tel" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="newsletter" />
                <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                  Keep me updated on exclusive offers and new arrivals.
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-8">
              <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" />
                Return to cart
              </Link>
              <Button type="submit" variant="default" size="lg" className="min-w-[200px]">
                CONTINUE TO PAYMENT
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="bg-card border border-border p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-muted flex-shrink-0">
                      <div className="w-full h-full flex items-center justify-center text-sm">
                        {item.name.slice(0, 20)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                      <p className="text-sm font-medium">\${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>\${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-border">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground italic">Calculated at next step</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border text-base font-medium">
                  <span>Total</span>
                  <span>\${getSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
