"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CartClient() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
  } = useCart();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Your Cart</h1>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Free shipping on orders over $150
          </p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-8">Your cart is empty</p>
            <Button asChild variant="default" size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 lg:items-start">
            {/* Cart Items */}
            <section className="lg:col-span-7">
              <div className="border-t border-border divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex py-10">
                    <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-card relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col justify-between">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-display text-lg font-medium">
                            <Link href={`/product/${item.slug}`} className="hover:text-muted-foreground transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{item.size}</p>
                        </div>
                        <div className="flex sm:justify-end items-start">
                          <p className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border">
                          <button
                            className="p-2 hover:bg-accent transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium">{item.quantity}</span>
                          <button
                            className="p-2 hover:bg-accent transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Order Summary */}
            <section className="lg:col-span-5 mt-16 lg:mt-0">
              <div className="bg-card border border-border p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="font-display text-lg font-medium mb-6">Order Summary</h2>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-muted-foreground">Subtotal</dt>
                    <dd className="text-sm font-medium">${getSubtotal().toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <dt className="text-sm text-muted-foreground">Shipping</dt>
                    <dd className="text-sm font-medium">
                      {getShipping() === 0 ? "Free" : `$${getShipping().toFixed(2)}`}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <dt className="text-sm text-muted-foreground">Tax estimate</dt>
                    <dd className="text-sm font-medium">${getTax().toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <dt className="text-base font-medium">Order total</dt>
                    <dd className="text-xl font-display font-medium">${getTotal().toFixed(2)}</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Button asChild variant="default" size="lg" className="w-full">
                    <Link href="/checkout/shipping">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
