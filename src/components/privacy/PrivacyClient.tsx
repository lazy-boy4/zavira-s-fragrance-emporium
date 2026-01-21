"use client";

export default function PrivacyClient() {
  return (
    <div className="min-h-screen pt-20">
      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your privacy is important to us.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <article className="prose prose-invert max-w-none space-y-8">
              <div>
                <h2 className="font-display text-2xl font-medium mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Name, email address and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely)</li>
                  <li>Purchase history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-medium mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use information we collect to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Improve our website and customer experience</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-medium mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>All payment transactions are encrypted using SSL technology</li>
                  <li>We never store your full credit card information on our servers</li>
                  <li>Auth guards protect sensitive pages</li>
                  <li>Rate limiting prevents abuse</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-medium mb-4">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not share your personal information with third parties except as necessary:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Shipping carriers and payment processors (for order fulfillment)</li>
                  <li>Analytics providers (for website improvement)</li>
                  <li>Business partners (for marketing/advertising)</li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
