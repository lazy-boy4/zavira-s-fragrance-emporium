"use client";

import Link from "next/link";

const termsSections = [
  {
    title: "Introduction",
    items: [
      { question: "What are these Terms of Service?", answer: "These Terms of Service govern your use of Zavira website and purchase of our products." }
    ]
  },
  {
    title: "Products and Services",
    items: [
      { question: "Are products subject to availability?", answer: "All products are subject to availability. We reserve the right to discontinue any product at any time without notice." }
    ]
  },
  {
    title: "Orders and Payment",
    items: [
      { question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For select regions, we also offer mobile payment options including bKash." }
    ]
  },
  {
    title: "Intellectual Property",
    items: [
      { question: "Who owns the content?", answer: "All content on this website, including text, graphics, and images, is owned by Zavira Parfums." }
    ]
  },
  {
    title: "Limitation of Liability",
    items: [
      { question: "What is your liability?", answer: "Our liability is limited to the amount paid for the product. We are not responsible for any indirect, incidental, or consequential damages." }
    ]
  },
  {
    title: "Governing Law",
    items: [
      { question: "What laws apply?", answer: "These terms are governed by the laws of France, where Zavira Parfums is registered." }
    ]
  },
];

export default function TermsClient() {
  return (
    <div className="min-h-screen pt-20">
      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Hero */}
        <section className="py-12 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Please read these terms carefully before using our website.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              {termsSections.map((section, index) => (
                <div key={index}>
                  <h2 className="font-display text-3xl font-medium mb-6">{section.title}</h2>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">{item.question}</p>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-16 p-6 bg-card border border-border text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Have questions? Contact our customer service team.
          </p>
          <div className="mt-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors rounded-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - use root layout */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} ZAVIRA Parfums. All rights reserved.</p>
            <nav className="flex gap-6 tracking-wide">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
