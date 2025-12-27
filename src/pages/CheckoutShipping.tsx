import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { shippingSchema, ShippingFormData } from "@/lib/validations";

/**
 * Checkout Shipping Page
 * 
 * Security:
 * - Zod schema validation for all inputs
 * - Uses CartContext for secure cart data
 */
const CheckoutShipping = () => {
  const navigate = useNavigate();
  const { items, getSubtotal } = useCart();

  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      country: "United States",
      city: "",
      zipCode: "",
      phone: "",
      newsletter: false,
    },
  });

  const onSubmit = (data: ShippingFormData) => {
    // Store shipping data in session for payment step
    sessionStorage.setItem("zavira_shipping", JSON.stringify(data));
    navigate("/checkout/payment");
  };

  const subtotal = getSubtotal();

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="font-display text-2xl tracking-widest">
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
            <span className="text-sm tracking-wide text-muted-foreground">REVIEW</span>
          </div>
        </nav>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Shipping Form */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-2">Shipping Information</h1>
            <p className="text-muted-foreground mb-8">Where should we send your essence?</p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Details */}
              <div className="space-y-4">
                <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Contact Details</h2>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...form.register("email")}
                    className="bg-card border-border"
                    autoComplete="email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="newsletter"
                    checked={form.watch("newsletter")}
                    onCheckedChange={(checked) => form.setValue("newsletter", !!checked)}
                  />
                  <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                    Keep me updated on exclusive offers and new arrivals.
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="First Name"
                      {...form.register("firstName")}
                      className="bg-card border-border"
                      autoComplete="given-name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Last Name"
                      {...form.register("lastName")}
                      className="bg-card border-border"
                      autoComplete="family-name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Address"
                    {...form.register("address")}
                    className="bg-card border-border"
                    autoComplete="street-address"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
                  )}
                </div>
                <Input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  {...form.register("apartment")}
                  className="bg-card border-border"
                />
                <div className="grid grid-cols-3 gap-4">
                  <Select
                    value={form.watch("country")}
                    onValueChange={(value) => form.setValue("country", value)}
                  >
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
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="City"
                      {...form.register("city")}
                      className="bg-card border-border"
                      autoComplete="address-level2"
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      {...form.register("zipCode")}
                      className="bg-card border-border"
                      autoComplete="postal-code"
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm text-destructive">{form.formState.errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  {...form.register("phone")}
                  className="bg-card border-border"
                  autoComplete="tel"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-8">
                <Link to="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                  Return to cart
                </Link>
                <Button 
                  type="submit" 
                  variant="luxury" 
                  size="lg" 
                  className="min-w-[200px]"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Processing..." : "CONTINUE TO PAYMENT"}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-12 lg:mt-0">
            <div className="bg-card border border-border p-6 lg:p-8 sticky top-8">
              <h2 className="font-display text-xl font-medium mb-6">Order Summary</h2>
              
              <div className="space-y-4 pb-6 border-b border-border">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h3 className="font-display text-sm font-medium tracking-wide">{item.name.toUpperCase()}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{item.size}</p>
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
                  <Button variant="outline" className="px-6">Apply</Button>
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
                  <span className="text-muted-foreground italic">Calculated at next step</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="font-medium">Total</span>
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
            <p>© {new Date().getFullYear()} ZAVIRA Parfums. All rights reserved.</p>
            <nav className="flex gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/shipping" className="hover:text-foreground transition-colors">Shipping Policy</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutShipping;
