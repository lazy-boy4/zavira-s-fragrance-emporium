import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import productPrimal from "@/assets/product-primal.jpg";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const cartItems = [
    { id: 1, name: "Zavira Primal", size: "15ml / 0.5 FL OZ", price: 85, quantity: 1, image: productPrimal },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/checkout/confirmation");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-widest">
            ZAVIRA
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm tracking-wide hover:text-primary transition-colors">SHOP</Link>
            <Link to="/story" className="text-sm tracking-wide hover:text-primary transition-colors">ABOUT</Link>
            <Link to="/contact" className="text-sm tracking-wide hover:text-primary transition-colors">CONTACT</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Progress Steps */}
        <nav className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-muted-foreground text-muted-foreground flex items-center justify-center text-xs">01</span>
            <span className="text-sm tracking-wide text-muted-foreground">SHIPPING</span>
          </div>
          <div className="w-12 h-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium">02</span>
            <span className="text-sm font-medium tracking-wide">PAYMENT</span>
          </div>
          <div className="w-12 h-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">03</span>
            <span className="text-sm tracking-wide text-muted-foreground">CONFIRM</span>
          </div>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Payment Form */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">Payment Method</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                {/* Credit Card */}
                <div className={`border rounded-sm p-6 transition-colors ${paymentMethod === 'card' ? 'border-foreground' : 'border-border'}`}>
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
                      <Input
                        type="text"
                        placeholder="Card Number"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="text"
                          placeholder="MM / YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        />
                        <Input
                          type="text"
                          placeholder="CVC"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="Name on Card"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      />
                    </div>
                  )}
                </div>

                {/* Mobile Payment */}
                <div className={`border rounded-sm p-6 transition-colors ${paymentMethod === 'mobile' ? 'border-foreground' : 'border-border'}`}>
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
                <div className={`border rounded-sm p-6 transition-colors ${paymentMethod === 'cod' ? 'border-foreground' : 'border-border'}`}>
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

              {/* Place Order Button */}
              <div className="pt-6">
                <Button type="submit" variant="luxury" size="xl" className="w-full">
                  PLACE ORDER
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  By placing your order, you agree to our{" "}
                  <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="bg-card border border-border p-6 lg:p-8 sticky top-8">
              <h2 className="font-display text-xl font-medium mb-6">Your Order</h2>
              
              <div className="space-y-4 pb-6 border-b border-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h3 className="font-display text-sm font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.size}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="py-6 border-b border-border">
                <div className="flex gap-2">
                  <Input placeholder="Gift card or discount code" className="bg-background border-border flex-1" />
                  <Button variant="outline" className="px-6 tracking-wide">APPLY</Button>
                </div>
              </div>

              {/* Totals */}
              <div className="pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-xs tracking-wide text-muted-foreground">CALCULATED AT NEXT STEP</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-medium tracking-wide">TOTAL</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground mr-2">USD</span>
                    <span className="text-xl font-display font-medium">${subtotal.toFixed(2)}</span>
                  </div>
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
            <p>© 2023 ZAVIRA. All rights reserved.</p>
            <nav className="flex gap-6 tracking-wide">
              <Link to="/privacy" className="hover:text-foreground transition-colors">PRIVACY POLICY</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">TERMS OF SERVICE</Link>
              <Link to="/refund" className="hover:text-foreground transition-colors">REFUND POLICY</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPayment;
