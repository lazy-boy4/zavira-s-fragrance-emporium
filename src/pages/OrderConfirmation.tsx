import { Link } from "react-router-dom";
import { Check, CreditCard } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import productPrimal from "@/assets/product-primal.jpg";

const OrderConfirmation = () => {
  const orderDetails = {
    orderNumber: "ZAV-8293",
    estimatedDelivery: "Oct 30",
    email: "eleanor@example.com",
  };

  const orderItem = {
    name: "Zavira Primal",
    type: "Eau de Parfum",
    size: "15ml / 0.5 FL OZ",
    price: 145,
    quantity: 1,
    image: productPrimal,
  };

  const shippingAddress = {
    name: "Eleanor Rigby",
    address: "1200 Luxury Lane, Suite 400",
    city: "New York, NY 10012",
    country: "United States",
  };

  const subtotal = 145;
  const shipping = 0;
  const tax = 12.5;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-primary flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Order Confirmed</h1>
              <p className="text-muted-foreground">
                Thank you for choosing ZAVIRA. Your essence is being prepared.
              </p>
              <p className="text-xs text-muted-foreground tracking-widest mt-4">
                ORDER #{orderDetails.orderNumber}
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-card border border-border p-6 lg:p-8 mt-12">
              {/* Shipment Details Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <h2 className="font-display text-lg font-medium tracking-wide">Shipment Details</h2>
                <p className="text-sm text-muted-foreground">
                  Est. Delivery: <span className="text-primary">{orderDetails.estimatedDelivery}</span>
                </p>
              </div>

              {/* Product */}
              <div className="py-6 border-b border-border">
                <div className="flex gap-6">
                  <div className="w-24 h-28 bg-muted flex-shrink-0">
                    <img src={orderItem.image} alt={orderItem.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h3 className="font-display text-lg font-medium tracking-wide">{orderItem.name.toUpperCase()}</h3>
                      <p className="text-xs text-muted-foreground tracking-wider mt-1">{orderItem.type.toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground mt-1">{orderItem.size}</p>
                      <p className="text-sm text-muted-foreground mt-3">Qty: {orderItem.quantity}</p>
                    </div>
                    <p className="text-lg font-medium">${orderItem.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="py-6 border-b border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping (Standard)</span>
                  <span className="text-primary">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-display text-lg font-medium">Total</span>
                  <span className="text-xl font-display font-medium">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping & Payment */}
              <div className="py-6 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">SHIPPING ADDRESS</h3>
                  <div className="text-sm space-y-1">
                    <p>{shippingAddress.name}</p>
                    <p className="text-muted-foreground">{shippingAddress.address}</p>
                    <p className="text-muted-foreground">{shippingAddress.city}</p>
                    <p className="text-muted-foreground">{shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">PAYMENT METHOD</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>Visa ending in 4242</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/shop">
                <Button variant="luxury-outline" size="lg" className="min-w-[200px]">
                  CONTINUE SHOPPING
                </Button>
              </Link>
              <Link to="/orders">
                <Button variant="luxury" size="lg" className="min-w-[200px]">
                  VIEW ORDER
                </Button>
              </Link>
            </div>

            {/* Confirmation Note */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>
                A confirmation email has been sent to {orderDetails.email}.
              </p>
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
