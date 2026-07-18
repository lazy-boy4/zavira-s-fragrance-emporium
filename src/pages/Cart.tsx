import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

/**
 * Cart Page - Uses CartContext for state management
 * 
 * Security:
 * - Cart data validated via CartContext
 * - Max quantity limits enforced
 * - Prices should be validated server-side during checkout
 */
const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getSubtotal, 
    getShipping, 
    getTax, 
    getTotal,
    isLoading 
  } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen dark">
        <Header />
        <main className="pt-20">
          <section className="py-12 lg:py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        <section className="py-12 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <header className="mb-12 text-center animate-reveal">
              <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.35em] text-bronze mb-4">
                Votre Panier
              </p>
              <h1 className="font-serif-display text-4xl md:text-5xl mb-4">
                Your <span className="italic text-bronze">Selection</span>
              </h1>
              <div className="w-12 h-px bg-bronze/60 mx-auto mb-4" />
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-sans-luxury">
                Free shipping on orders over $150
              </p>
            </header>

            {items.length === 0 ? (
              <div className="text-center py-24 border border-bronze/15 bg-midnight-surface/30 animate-reveal">
                <p className="font-serif-display italic text-3xl text-ivory/80 mb-6">
                  Your atelier is empty.
                </p>
                <Link to="/shop">
                  <Button variant="luxury">Discover the Collection</Button>
                </Link>
              </div>
            ) : (
              <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start animate-reveal">
                {/* Cart Items */}
                <section className="lg:col-span-7">
                  <div className="border-t border-bronze/20 divide-y divide-bronze/10">
                    {items.map((item) => (
                      <div key={item.id} className="flex py-10">
                        <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-midnight-surface">
                          <span aria-hidden className="absolute top-0 left-0 w-4 h-px bg-bronze/60 z-10" />
                          <span aria-hidden className="absolute top-0 left-0 h-4 w-px bg-bronze/60 z-10" />
                          <span aria-hidden className="absolute bottom-0 right-0 w-4 h-px bg-bronze/60 z-10" />
                          <span aria-hidden className="absolute bottom-0 right-0 h-4 w-px bg-bronze/60 z-10" />
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-6 flex flex-1 flex-col justify-between">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-serif-display text-xl">
                                <Link to={`/product/${item.slug}`}>
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{item.size}</p>
                            </div>
                            <div className="flex sm:justify-end items-start">
                              <p className="font-serif-display italic text-lg text-bronze">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-bronze/30">
                              <button
                                className="p-2 hover:bg-bronze/10 hover:text-bronze transition-colors"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 font-serif-display italic text-bronze">{item.quantity}</span>
                              <button
                                className="p-2 hover:bg-bronze/10 hover:text-bronze transition-colors"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="text-xs uppercase tracking-[0.2em] font-sans-luxury text-muted-foreground hover:text-bronze flex items-center gap-2 transition-colors"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
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
                  <div className="relative bg-midnight-surface border border-bronze/20 p-6 sm:p-8 lg:sticky lg:top-24">
                    <span aria-hidden className="absolute top-0 left-0 w-6 h-px bg-bronze/60" />
                    <span aria-hidden className="absolute top-0 left-0 h-6 w-px bg-bronze/60" />
                    <span aria-hidden className="absolute bottom-0 right-0 w-6 h-px bg-bronze/60" />
                    <span aria-hidden className="absolute bottom-0 right-0 h-6 w-px bg-bronze/60" />
                    <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze mb-2">Résumé</p>
                    <h2 className="font-serif-display italic text-2xl mb-6">Order Summary</h2>
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm text-muted-foreground">Subtotal</dt>
                        <dd className="font-serif-display italic text-bronze">${getSubtotal().toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-bronze/15">
                        <dt className="text-sm text-muted-foreground">Shipping</dt>
                        <dd className="font-serif-display italic text-bronze">
                          {getShipping() === 0 ? "Free" : `$${getShipping().toFixed(2)}`}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-bronze/15">
                        <dt className="text-sm text-muted-foreground">Tax estimate</dt>
                        <dd className="font-serif-display italic text-bronze">${getTax().toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-bronze/30">
                        <dt className="font-sans-luxury text-xs uppercase tracking-[0.25em]">Order total</dt>
                        <dd className="text-2xl font-serif-display italic text-bronze">${getTotal().toFixed(2)}</dd>
                      </div>
                    </dl>
                    <div className="mt-8">
                      <Link to="/checkout/shipping">
                        <Button variant="luxury" size="xl" className="w-full">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-6 text-center">
                      <Link to="/shop" className="text-xs uppercase tracking-[0.2em] font-sans-luxury text-muted-foreground hover:text-bronze transition-colors">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
