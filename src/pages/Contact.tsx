import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactSchema, ContactFormData, sanitizeInput } from "@/lib/validations";

/**
 * Contact Page - Secure contact form
 * 
 * Security Features:
 * - Zod schema validation
 * - Input sanitization
 * - Rate limiting ready (backend)
 * - No sensitive data exposure
 */
const Contact = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Sanitize inputs before sending
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: data.email.toLowerCase().trim(),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
      };

      // Simulate API call - replace with actual submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Submit to backend API
      // await fetch('/api/contact', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sanitizedData) 
      // })

      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "We'll get back to you within 24-48 hours.",
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-card">
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
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-display text-2xl font-medium mb-8">Send a Message</h2>
                
                {submitted ? (
                  <div className="bg-card border border-border p-8 text-center">
                    <h3 className="font-display text-xl font-medium mb-4">Message Sent</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll respond within 24-48 hours.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        form.reset();
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          {...form.register("name")}
                          className="bg-card border-border"
                          autoComplete="name"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...form.register("email")}
                          className="bg-card border-border"
                          autoComplete="email"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        {...form.register("subject")}
                        className="bg-card border-border"
                      />
                      {form.formState.errors.subject && (
                        <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        {...form.register("message")}
                        className="bg-card border-border min-h-[150px]"
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      variant="luxury" 
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-medium mb-8">Get in Touch</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:concierge@zavira.com" className="hover:text-foreground transition-colors">
                          concierge@zavira.com
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond within 24-48 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+1-800-ZAVIRA" className="hover:text-foreground transition-colors">
                          +1 (800) ZAVIRA
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Mon-Fri: 9am - 6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium mb-1">Headquarters</h3>
                      <address className="text-muted-foreground not-italic">
                        Zavira Parfums<br />
                        123 Luxury Avenue<br />
                        Paris, France 75001
                      </address>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-card border border-border flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium mb-1">Business Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Help */}
                <div className="mt-12 p-6 bg-card border border-border">
                  <h3 className="font-display font-medium mb-3">Quick Links</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      <a href="/faq" className="hover:text-foreground transition-colors">
                        Frequently Asked Questions
                      </a>
                    </li>
                    <li>
                      <a href="/shipping" className="hover:text-foreground transition-colors">
                        Shipping & Returns
                      </a>
                    </li>
                    <li>
                      <a href="/stores" className="hover:text-foreground transition-colors">
                        Find a Store
                      </a>
                    </li>
                  </ul>
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

export default Contact;
