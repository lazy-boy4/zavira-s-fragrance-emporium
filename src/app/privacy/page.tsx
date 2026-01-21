import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Zavira Parfums',
    description: 'Learn how Zavira Parfums collects, uses, and protects your personal information.',
};

/**
 * Privacy Policy Page - Server Component
 * 
 * Contains legal privacy policy content for Zavira Parfums.
 * This is placeholder content that should be reviewed by legal counsel.
 */
export default function PrivacyPolicyPage() {
    return (
        <main className="pt-20">
            <section className="py-16 lg:py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <header className="mb-12 text-center">
                        <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-muted-foreground">
                            Last updated: December 2024
                        </p>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <article className="space-y-8">
                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">1. Introduction</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Zavira Parfums (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy.
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                    information when you visit our website or make a purchase.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">2. Information We Collect</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We collect information that you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Name, email address, and contact information</li>
                                    <li>Billing and shipping addresses</li>
                                    <li>Payment information (processed securely by our payment providers)</li>
                                    <li>Purchase history and preferences</li>
                                    <li>Communications with our customer service team</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Process and fulfill your orders</li>
                                    <li>Communicate with you about your orders and account</li>
                                    <li>Send promotional communications (with your consent)</li>
                                    <li>Improve our website and customer experience</li>
                                    <li>Prevent fraud and ensure security</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">4. Information Sharing</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We do not sell, trade, or otherwise transfer your personal information to third
                                    parties without your consent, except as necessary to provide our services (such
                                    as shipping carriers and payment processors) or as required by law.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">5. Data Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement appropriate security measures to protect your personal information
                                    against unauthorized access, alteration, disclosure, or destruction. All payment
                                    transactions are encrypted using industry-standard SSL technology.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">6. Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We use cookies and similar technologies to enhance your browsing experience,
                                    analyze website traffic, and personalize content. You can control cookie
                                    preferences through your browser settings.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">7. Your Rights</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Depending on your location, you may have rights regarding your personal data,
                                    including the right to access, correct, delete, or port your data. To exercise
                                    these rights, please contact us at privacy@zavira.com.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-2xl font-medium mb-4">8. Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <address className="text-muted-foreground not-italic mt-4">
                                    Zavira Parfums<br />
                                    Email: privacy@zavira.com<br />
                                    Address: 123 Luxury Avenue, Paris, France
                                </address>
                            </section>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
