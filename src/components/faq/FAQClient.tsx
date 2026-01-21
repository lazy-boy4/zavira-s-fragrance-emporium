"use client";

import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Standard domestic shipping takes 5-7 business days. Express shipping is 3-5 business days, and priority shipping is 1-2 business days. International shipping varies by destination, typically 7-21 business days."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all domestic orders over $150. International orders qualify for free shipping on orders over $300."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 2 hours of placement. After that, orders enter our fulfillment process. Please contact customer service immediately if you need to make changes."
      },
    ]
  },
  {
    title: "Products",
    items: [
      {
        question: "How long do Zavira fragrances last?",
        answer: "Our Eau de Parfum formulations are designed to last 6-8 hours on skin. Longevity can vary based on skin type, climate, and application technique. For best results, apply to pulse points after moisturizing."
      },
      {
        question: "What is the difference between bottle sizes?",
        answer: "We offer three sizes: 15ml (travel size), 50ml (standard), and 100ml (full size). The formulation is identical across all sizes. Choose based on your usage frequency and whether you'd like a travel-friendly option."
      },
      {
        question: "Are your products cruelty-free?",
        answer: "Yes, all Zavira products are cruelty-free. We never test on animals and work only with suppliers who share our commitment to ethical practices."
      },
      {
        question: "How should I store my fragrance?",
        answer: "Store your fragrance in a cool, dry place away from direct sunlight and heat. The original box provides ideal protection. Properly stored, our fragrances maintain their quality for 3-5 years."
      },
    ]
  },
  {
    title: "Returns & Changes",
    items: [
      {
        question: "What is your return policy?",
        answer: "We accept returns of unopened products within 30 days of delivery. Products must be in their original packaging with all seals intact. See our Shipping & Returns page for complete details."
      },
      {
        question: "How do I initiate a return?",
        answer: "Contact our customer service at returns@zavira.com with your order number. You'll receive a return authorization and instructions. Refunds are processed within 5-10 business days of receiving your return."
      },
      {
        question: "Can I exchange a fragrance I've opened?",
        answer: "Unfortunately, we cannot accept returns or exchanges on opened products due to hygiene and safety standards. We recommend trying our discovery sets before committing to a full bottle."
      },
    ]
  },
  {
    title: "Account & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. For select regions, we also offer mobile payment options including bKash."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. All transactions are encrypted using industry-standard SSL technology. We never store your full credit card information on our servers."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a link to reset your password. The link expires after 24 hours for security."
      },
    ]
  },
];

export default function FAQClient() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find answers to common questions about our products, orders, and policies.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="space-y-8">
            {faqCategories.map((category, index) => (
              <div key={index} className="bg-card border border-border p-6">
                <h2 className="font-display text-xl font-medium mb-4">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`${index}-${itemIndex}`} className="border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-3">
                        <span className="font-medium">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
