import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Smartphone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { paymentSchema, PaymentFormData } from "@/lib/validations";

/**
 * Checkout Payment Page
 * 
 * Security:
 * - Zod validation for payment data
 * - Card data should be handled by payment processor (Stripe/etc)
 * - Never store raw card numbers
 */
const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getSubtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile" | "cod">("card");

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual payment processing
      // IMPORTANT: Never send raw card data to your own server
      // Use Stripe Elements or similar PCI-compliant solution
      
      // Clear cart on successful order
      clearCart();
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      });
      
      navigate("/checkout/confirmation");
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive",
      });
    }
  };

  const subtotal = getSubtotal();

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
        <nav className="flex items-center justify-center gap-4 mb-12" aria-label="Checkout progress">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-muted-foreground text-muted-foreground flex items-center justify-center text-xs">01</span>
            <span className="text-sm tracking-wide text-muted-foreground">SHIPPING</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-medium">02</span>
            <span className="text-sm font-medium tracking-wide">PAYMENT</span>
          </div>
          <div className="w-12 h-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border border-border text-muted-foreground flex items-center justify-center text-xs">03</span>
            <span className="text-sm tracking-wide text-muted-foreground">CONFIRM</span>
          </div>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Payment Form */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-8">Payment Method</h1>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => {
                  setPaymentMethod(value as "card" | "mobile" | "cod");
                  form.setValue("paymentMethod", value as "card" | "mobile" | "cod");
                }} 
                className="space-y-4"
              >
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
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="Card Number"
                          {...form.register("cardNumber")}
                          className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                          autoComplete="cc-number"
                          maxLength={19}
                        />
                        {form.formState.errors.cardNumber && (
                          <p className="text-sm text-destructive">{form.formState.errors.cardNumber.message}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="MM / YY"
                            {...form.register("cardExpiry")}
                            className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                            autoComplete="cc-exp"
                            maxLength={7}
                          />
                          {form.formState.errors.cardExpiry && (
                            <p className="text-sm text-destructive">{form.formState.errors.cardExpiry.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            type="text"
                            placeholder="CVC"
                            {...form.register("cardCvc")}
                            className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                            autoComplete="cc-csc"
                            maxLength={4}
                          />
                          {form.formState.errors.cardCvc && (
                            <p className="text-sm text-destructive">{form.formState.errors.cardCvc.message}</p>
                          )}
                        </div>
                      </div>
                      <Input
                        type="text"
                        placeholder="Name on Card"
                        {...form.register("cardName")}
                        className="bg-transparent border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                        autoComplete="cc-name"
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
                <Button 
                  type="submit" 
                  variant="luxury" 
                  size="xl" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
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
                {items.map((item) => (
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
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
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
                  <span className="text-xs tracking-wide text-muted-foreground">
                    {subtotal >= 150 ? "FREE" : "$15.00"}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-medium tracking-wide">TOTAL</span>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground mr-2">USD</span>
                    <span className="text-xl font-display font-medium">
                      ${(subtotal + (subtotal >= 150 ? 0 : 15)).toFixed(2)}
                    </span>
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
            <p>© {new Date().getFullYear()} ZAVIRA. All rights reserved.</p>
            <nav className="flex gap-6 tracking-wide">
              <Link to="/privacy" className="hover:text-foreground transition-colors">PRIVACY POLICY</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">TERMS OF SERVICE</Link>
              <Link to="/shipping" className="hover:text-foreground transition-colors">REFUND POLICY</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPayment;
