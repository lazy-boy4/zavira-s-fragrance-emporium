"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactClient() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleContact = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24-48 hours.",
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header - use root layout instead */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our concierge team is here to assist you with any questions or inquiries.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-medium mb-6">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="bg-card border-border"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-card border-border"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="bg-card border-border"
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  className="bg-card border-border min-h-[150px]"
                />
              </div>

              <Button
                type="button"
                onClick={handleContact}
                disabled={submitted}
                className="w-full"
              >
                {submitted ? "Sent!" : "Send Message"}
              </Button>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-medium mb-6">Get in Touch</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-display font-medium mb-1">Email</h3>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="mailto:concierge@zavira.com"
                      className="hover:text-foreground transition-colors"
                    >
                      concierge@zavira.com
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We respond within 24-48 hours
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-display font-medium mb-1">Phone</h3>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a href="tel:+1-800-ZAVIRA" className="hover:text-foreground transition-colors">
                      +1 (800) ZAVIRA
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-medium mb-1">Headquarters</h3>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <address className="text-sm text-muted-foreground not-italic">
                    Zavira Parfums<br />
                    123 Luxury Avenue<br />
                    Paris, France 75001
                  </address>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-medium mb-1">Business Hours</h3>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-12 p-6 bg-card border border-border">
              <h2 className="font-display text-2xl font-medium mb-3">Quick Links</h2>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-foreground transition-colors">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="hover:text-foreground transition-colors">
                    Find a Store
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
