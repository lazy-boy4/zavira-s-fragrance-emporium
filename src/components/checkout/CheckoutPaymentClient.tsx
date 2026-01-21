"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPaymentClient() {
  const { items, getSubtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "cod">("card");

  const handleOrder = async () => {
    if (paymentMethod === 'mobile') {
      try {
        const subtotal = getSubtotal();
        const shipping = subtotal >= 150 ? 0 : 15;
        const total = subtotal + shipping;

        // In a real app, we would create the order in DB first here
        const response = await fetch('/api/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: `ORD-${Date.now()}`,
            paymentMethod: 'bkash',
            amount: total
          })
        });

        const data = await response.json();

        if (data.success && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          toast({
            title: "Error",
            description: "Failed to initiate payment. Please try again.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive"
        });
      }
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    toast({
      title: "Order placed successfully",
      description: "Thank you for your purchase!",
    });
    window.location.href = "/checkout/confirmation";
  };

  const subtotal = getSubtotal();
  const shipping = subtotal >= 150 ? 0 : 15;

  return (
    <div className="min-h-screen pt-20">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-widest">
            ZAVIRA
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm tracking-wide hover:text-primary transition-colors">SHOP</Link>
            <Link href="/story" className="text-sm tracking-wide hover:text-primary transition-colors">ABOUT</Link>
            <Link href="/contact" className="text-sm tracking-wide hover:text-primary transition-colors">CONTACT</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Progress Steps */}
        <nav className="flex items-center justify-center gap-4 mb-12" aria-label="Checkout progress">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">1</span>
            <span className="text-sm tracking-wide text-muted-foreground">SHIPPING</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">2</span>
            <span className="text-sm font-medium tracking-wide text-primary">PAYMENT</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">3</span>
            <span className="text-sm tracking-wide text-muted-foreground">CONFIRM</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
          {/* Payment Form */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-2">Payment Method</h1>
            <p className="text-muted-foreground mb-8">Choose your payment method</p>

            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "mobile" | "cod")} className="space-y-6">
              {/* Credit Card */}
              <div className={`border rounded-sm p-6 transition-colors \${paymentMethod === 'card' ? 'border-foreground' : 'border-border'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="text-sm font-medium tracking-wide cursor-pointer">
                      CREDIT OR DEBIT CARD
                    </label>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 pl-7">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Card Number</label>
                      <Input
                        type="text"
                        placeholder="Card Number"
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        autoComplete="cc-number"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">MM / YY</label>
                        <Input
                          type="text"
                          placeholder="MM / YY"
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                          autoComplete="cc-exp"
                          maxLength={7}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">CVC</label>
                        <Input
                          type="text"
                          placeholder="CVC"
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                          autoComplete="cc-csc"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Name on Card</label>
                      <Input
                        type="text"
                        placeholder="Name on Card"
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        autoComplete="cc-name"
                        maxLength={100}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Payment */}
              <div className={`border rounded-sm p-6 transition-colors \${paymentMethod === 'mobile' ? 'border-foreground' : 'border-border'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <label htmlFor="mobile" className="text-sm font-medium tracking-wide cursor-pointer">
                      MOBILE PAYMENT / BKASH
                    </label>
                  </div>
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              {/* Cash on Delivery */}
              <div className={`border rounded-sm p-6 transition-colors \${paymentMethod === 'cod' ? 'border-foreground' : 'border-border'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <label htmlFor="cod" className="text-sm font-medium tracking-wide cursor-pointer">
                      CASH ON DELIVERY
                    </label>
                  </div>
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </RadioGroup>

            <div className="mt-8">
              <Button onClick={handleOrder} variant="default" size="xl" className="w-full">
                PLACE ORDER
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="bg-card border border-border p-6 sm:p-8 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-medium mb-6">Your Order</h2>

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
                  <span>\${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-3 border-t border-border">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-xs tracking-wide text-muted-foreground">
                    {subtotal >= 150 ? "FREE" : "$15.00"}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border text-base font-medium">
                  <span className="font-medium tracking-wide">TOTAL</span>
                  <span>\${(subtotal + (subtotal >= 150 ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} ZAVIRA Parfums. All rights reserved.</p>
            <nav className="flex gap-6 tracking-wide">
              <Link href="/privacy" className="hover:text-foreground transition-colors">PRIVACY POLICY</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">TERMS OF SERVICE</Link>
              <Link href="/shipping" className="hover:text-foreground transition-colors">REFUND POLICY</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
