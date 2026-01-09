import {
  HelpCircle,
  Book,
  MessageSquare,
  Video,
  FileText,
  ExternalLink,
  Mail,
  Phone,
  ChevronRight,
  Search,
  Keyboard,
  Zap,
  Shield,
  CreditCard,
  Package,
  Users,
  BarChart3,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/**
 * Help - Admin help center with documentation, FAQs, and support
 * 
 * Features:
 * - Quick start guides
 * - Frequently asked questions
 * - Keyboard shortcuts
 * - Contact support options
 * - Video tutorials
 * - Documentation links
 * 
 * Backend Integration:
 * - GET /api/admin/help/articles - Fetch help articles
 * - POST /api/admin/support/ticket - Submit support ticket
 */

const quickStartGuides = [
  {
    icon: Package,
    title: "Adding Your First Product",
    description: "Learn how to add products with variants, images, and pricing",
    duration: "5 min read",
    link: "/admin/products/new",
  },
  {
    icon: Users,
    title: "Managing Orders",
    description: "Process orders, update statuses, and handle returns",
    duration: "4 min read",
    link: "/admin/orders",
  },
  {
    icon: BarChart3,
    title: "Understanding Analytics",
    description: "Track sales, revenue, and customer behavior",
    duration: "6 min read",
    link: "/admin/analytics",
  },
  {
    icon: Shield,
    title: "Setting Up Payments",
    description: "Configure bKash, Nagad, and other payment methods",
    duration: "3 min read",
    link: "/admin/settings",
  },
];

const faqs = [
  {
    category: "Products",
    questions: [
      {
        q: "How do I add product variants (sizes, colors)?",
        a: "When editing a product, scroll to the 'Variants' section. Click 'Add Variant' to create new options like size or color. Each variant can have its own price, SKU, and stock quantity.",
      },
      {
        q: "Can I duplicate a product?",
        a: "Yes! From the Products list, click the three-dot menu on any product and select 'Duplicate'. This creates a copy with all details that you can then modify.",
      },
      {
        q: "How do I set up inventory tracking?",
        a: "Enable 'Track quantity' in the product editor. Set your current stock level and optionally set a low stock threshold for alerts.",
      },
    ],
  },
  {
    category: "Orders",
    questions: [
      {
        q: "How do I process a new order?",
        a: "Go to Orders, click on the order to view details. Update the status to 'Processing' when preparing, then 'Shipped' when dispatched. Add tracking information if available.",
      },
      {
        q: "How do I handle refunds?",
        a: "Open the order, click 'Actions' and select 'Refund'. You can refund the full amount or a partial amount. Refunds are processed through the original payment method.",
      },
      {
        q: "Can I export orders to CSV?",
        a: "Yes! On the Orders page, click the 'Export' button in the top right. You can filter orders by date range before exporting.",
      },
    ],
  },
  {
    category: "Shipping",
    questions: [
      {
        q: "How do I set up Steadfast or Pathao delivery?",
        a: "Go to Settings > Shipping. Under 'Delivery Partners', enable Steadfast or Pathao and enter your API credentials. Contact the provider to get your merchant account set up.",
      },
      {
        q: "Can I offer free shipping?",
        a: "Yes! In Shipping settings, enable 'Free Shipping Threshold' and set the minimum order amount. You can also create discount codes for free shipping.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        q: "How do I set up bKash/Nagad payments?",
        a: "Go to Settings > Payments. Enable the payment method you want and enter your merchant credentials. Make sure your account is verified with the provider.",
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Yes! COD is enabled by default. You can configure COD fees and restrictions in Settings > Payments.",
      },
    ],
  },
];

const keyboardShortcuts = [
  { keys: ["⌘", "K"], action: "Open search" },
  { keys: ["⌘", "N"], action: "Create new product" },
  { keys: ["⌘", "S"], action: "Save current page" },
  { keys: ["⌘", "D"], action: "Duplicate selected item" },
  { keys: ["⌘", "/"], action: "Open help" },
  { keys: ["Esc"], action: "Close modal/dialog" },
];

export default function Help() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display tracking-wider">Help Center</h1>
        <p className="text-muted-foreground mt-1">
          Guides, FAQs, and support resources
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search help articles..."
          className="pl-10 h-12"
        />
      </div>

      {/* Quick Start Guides */}
      <section>
        <h2 className="text-lg font-display tracking-wide mb-4">Quick Start Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStartGuides.map((guide) => (
            <Card key={guide.title} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {guide.description}
                    </p>
                    <Badge variant="secondary" className="mt-3">
                      {guide.duration}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqs.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">
                      {category.category}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.category}-${index}`}
                          className="border border-border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Contact Support</CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageSquare className="h-4 w-4" />
                Start Live Chat
                <Badge variant="secondary" className="ml-auto">Online</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="h-4 w-4" />
                Call: +880 1XXX-XXXXXX
              </Button>
              <Separator />
              <p className="text-xs text-muted-foreground text-center">
                Support available: Sun-Thu, 9AM-6PM (BST)
              </p>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyboardShortcuts.map((shortcut) => (
                  <div key={shortcut.action} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key) => (
                        <kbd
                          key={key}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border border-border font-mono"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Book className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Documentation</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Video className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Video Tutorials</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">API Reference</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Changelog</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
