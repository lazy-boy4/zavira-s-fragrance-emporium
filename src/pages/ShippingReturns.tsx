import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Truck, RotateCcw, Package, Clock } from "lucide-react";

/**
 * Shipping & Returns Page
 * 
 * Contains shipping and return policy information for Zavira Parfums.
 */
const ShippingReturns = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Shipping & Returns
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We want you to love your Zavira fragrance. Learn about our shipping options and hassle-free return policy.
            </p>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <Truck className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $150</p>
              </div>
              <div className="text-center p-6">
                <Clock className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
              <div className="text-center p-6">
                <Package className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Luxury Packaging</h3>
                <p className="text-sm text-muted-foreground">Signature gift box</p>
              </div>
              <div className="text-center p-6">
                <RotateCcw className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return window</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              {/* Shipping Section */}
              <div>
                <h2 className="font-display text-3xl font-medium mb-8">Shipping Information</h2>
                
                <div className="space-y-6">
                  <div className="bg-background border border-border p-6">
                    <h3 className="font-display text-xl font-medium mb-4">Domestic Shipping (United States)</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Standard Shipping (5-7 business days)</span>
                        <span className="font-medium">$10.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Express Shipping (3-5 business days)</span>
                        <span className="font-medium">$20.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Priority Shipping (1-2 business days)</span>
                        <span className="font-medium">$35.00</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        * Free standard shipping on orders over $150
                      </p>
                    </div>
                  </div>

                  <div className="bg-background border border-border p-6">
                    <h3 className="font-display text-xl font-medium mb-4">International Shipping</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Canada (7-10 business days)</span>
                        <span className="font-medium">$25.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Europe (7-14 business days)</span>
                        <span className="font-medium">$35.00</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span>Rest of World (10-21 business days)</span>
                        <span className="font-medium">$45.00</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        * International orders may be subject to customs duties and taxes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Returns Section */}
              <div>
                <h2 className="font-display text-3xl font-medium mb-8">Returns & Exchanges</h2>
                
                <div className="bg-background border border-border p-6 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-medium mb-3">Return Policy</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We accept returns of unopened, unused products within 30 days of delivery. 
                      Products must be in their original packaging with all seals intact.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-medium mb-3">How to Return</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                      <li>Contact our customer service at returns@zavira.com</li>
                      <li>Receive your return authorization number</li>
                      <li>Pack items securely in original packaging</li>
                      <li>Ship to the address provided with your authorization</li>
                      <li>Refund processed within 5-10 business days of receipt</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-medium mb-3">Exchanges</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      For exchanges, please return the original item for a refund and place a new 
                      order for the desired product. This ensures the fastest processing time.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-medium mb-3">Non-Returnable Items</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Opened or used products</li>
                      <li>Products without original packaging</li>
                      <li>Items purchased during final sale promotions</li>
                      <li>Gift cards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturns;
