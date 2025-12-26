import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";

interface CartItem {
  id: number;
  name: string;
  subtitle: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    size: "50ml / 1.7 FL OZ",
    price: 125,
    quantity: 1,
    image: productPrimal,
  },
  {
    id: 2,
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    size: "100ml / 3.4 FL OZ",
    price: 185,
    quantity: 1,
    image: productMidnight,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        <section className="py-12 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <header className="mb-12 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Your Cart</h1>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                Free shipping on orders over $150
              </p>
            </header>

            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-8">Your cart is empty</p>
                <Link to="/shop">
                  <Button variant="luxury">Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
                {/* Cart Items */}
                <section className="lg:col-span-7">
                  <div className="border-t border-border divide-y divide-border">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex py-10">
                        <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-card">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-6 flex flex-1 flex-col justify-between">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-display text-lg font-medium">
                                <Link to={`/product/${item.name.toLowerCase().replace(' ', '-')}`}>
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                              <p className="mt-1 text-sm text-muted-foreground">{item.size}</p>
                            </div>
                            <div className="flex sm:justify-end items-start">
                              <p className="text-lg font-medium">${item.price * item.quantity}.00</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-border">
                              <button
                                className="p-2 hover:bg-accent transition-colors"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                              <button
                                className="p-2 hover:bg-accent transition-colors"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                              onClick={() => removeItem(item.id)}
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
                        <dd className="text-sm font-medium">${subtotal.toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <dt className="text-sm text-muted-foreground">Shipping</dt>
                        <dd className="text-sm font-medium">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <dt className="text-sm text-muted-foreground">Tax estimate</dt>
                        <dd className="text-sm font-medium">${tax.toFixed(2)}</dd>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <dt className="text-base font-medium">Order total</dt>
                        <dd className="text-xl font-display font-medium">${total.toFixed(2)}</dd>
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
                      <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
