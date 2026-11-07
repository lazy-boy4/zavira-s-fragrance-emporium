import { formatBDT } from "@/lib/utils";
import { Link, Navigate } from "react-router-dom";
import { Check, CreditCard, Smartphone, Banknote } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/contexts/CartContext";

interface LastOrder {
  number: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: "card" | "mobile" | "cod";
  cardLast4: string;
  shippingInfo: Record<string, string>;
}

const paymentLabel = (o: LastOrder) =>
  o.paymentMethod === "cod" ? "Cash on delivery"
  : o.paymentMethod === "mobile" ? "Mobile banking"
  : o.cardLast4 ? `Card ending in ${o.cardLast4}` : "Card";

const OrderConfirmation = () => {
  const raw = sessionStorage.getItem("zavira_last_order");
  if (!raw) return <Navigate to="/shop" replace />;
  const order: LastOrder = JSON.parse(raw);
  const s = order.shippingInfo;
  const PayIcon = order.paymentMethod === "cod" ? Banknote : order.paymentMethod === "mobile" ? Smartphone : CreditCard;

  return (
    <div className="dark min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Order Confirmed</h1>
              <p className="text-muted-foreground">
                Thank you for choosing ZAVIRA. Your essence is being prepared.
              </p>
              <p className="text-xs text-muted-foreground tracking-widest mt-4">
                ORDER #{order.number}
              </p>
            </div>

            <div className="bg-card border border-border p-6 lg:p-8 mt-12">
              <div className="pb-6 border-b border-border">
                <h2 className="font-display text-lg font-medium tracking-wide">Shipment Details</h2>
              </div>

              {order.items.map((item) => (
                <div key={item.id + item.size} className="py-6 border-b border-border">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="w-20 h-24 sm:w-24 sm:h-28 bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-wrap justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-medium tracking-wide">{item.name.toUpperCase()}</h3>
                        <p className="text-xs text-muted-foreground tracking-wider mt-1">{item.subtitle?.toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.size}</p>
                        <p className="text-sm text-muted-foreground mt-3">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lg font-medium tabular-nums">{formatBDT(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="py-6 border-b border-border space-y-3 tabular-nums">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatBDT(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  {order.shipping === 0
                    ? <span className="text-primary">Complimentary</span>
                    : <span>{formatBDT(order.shipping)}</span>}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT</span>
                  <span>{formatBDT(order.tax)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-display text-lg font-medium">Total</span>
                  <span className="text-xl font-display font-medium">{formatBDT(order.total)}</span>
                </div>
              </div>

              <div className="py-6 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">SHIPPING ADDRESS</h3>
                  <div className="text-sm space-y-1">
                    <p>{[s.firstName, s.lastName].filter(Boolean).join(" ")}</p>
                    <p className="text-muted-foreground">{[s.address, s.apartment].filter(Boolean).join(", ")}</p>
                    <p className="text-muted-foreground">{[s.city, s.zipCode].filter(Boolean).join(" ")}</p>
                    <p className="text-muted-foreground">{s.country}</p>
                    {s.phone && <p className="text-muted-foreground">{s.phone}</p>}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">PAYMENT METHOD</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <PayIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{paymentLabel(order)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/shop">
                <Button variant="luxury-outline" size="lg" className="min-w-[200px]">
                  CONTINUE SHOPPING
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="luxury" size="lg" className="min-w-[200px]">
                  VIEW ORDERS
                </Button>
              </Link>
            </div>

            <div className="text-center mt-8 text-sm text-muted-foreground">
              {s.email && <p>A confirmation email has been sent to {s.email}.</p>}
              <p className="mt-2">
                Need help?{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact Concierge
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
