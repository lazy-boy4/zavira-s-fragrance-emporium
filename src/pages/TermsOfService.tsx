import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Terms of Service Page
 * 
 * Contains legal terms and conditions for Zavira Parfums.
 * This is placeholder content that should be reviewed by legal counsel.
 */
const TermsOfService = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <header className="mb-12 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Last updated: December 2024
              </p>
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              <article className="space-y-8">
                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using the Zavira Parfums website, you accept and agree to be 
                    bound by these Terms of Service. If you do not agree to these terms, please do 
                    not use our website.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">2. Products and Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All products are subject to availability. We reserve the right to discontinue 
                    any product at any time. Prices are subject to change without notice. Product 
                    images are for illustrative purposes and may vary slightly from actual products.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">3. Orders and Payment</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    When you place an order, you are offering to purchase a product. We reserve the 
                    right to refuse or cancel any order. Payment must be received before orders are 
                    processed. We accept major credit cards and other payment methods as displayed 
                    at checkout.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">4. Shipping</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Shipping times and costs vary by destination and shipping method selected. 
                    Delivery times are estimates and not guaranteed. Risk of loss and title for 
                    items pass to you upon delivery to the carrier.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">5. Returns and Refunds</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We accept returns of unopened products within 30 days of delivery. Products must 
                    be in their original packaging. Refunds will be processed to the original payment 
                    method within 5-10 business days of receiving the return. See our Shipping & 
                    Returns page for complete details.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">6. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content on this website, including text, graphics, logos, images, and 
                    software, is the property of Zavira Parfums and is protected by copyright and 
                    trademark laws. You may not reproduce, distribute, or create derivative works 
                    without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">7. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account 
                    credentials and for all activities that occur under your account. You agree to 
                    notify us immediately of any unauthorized use of your account.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Zavira Parfums shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of our website or 
                    products. Our liability is limited to the amount paid for the product in question.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">9. Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of 
                    France, without regard to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-2xl font-medium mb-4">10. Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions regarding these Terms of Service, please contact us at:
                  </p>
                  <address className="text-muted-foreground not-italic mt-4">
                    Zavira Parfums<br />
                    Email: legal@zavira.com<br />
                    Address: 123 Luxury Avenue, Paris, France
                  </address>
                </section>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
