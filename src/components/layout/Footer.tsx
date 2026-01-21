import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Fragrances" },
    { href: "/collections", label: "Collections" },
    { href: "/shop?category=new", label: "New Arrivals" },
    { href: "/shop?category=bestsellers", label: "Bestsellers" },
  ],
  company: [
    { href: "/story", label: "Our Story" },
    { href: "/craftsmanship", label: "Craftsmanship" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/careers", label: "Careers" },
  ],
  support: [
    { href: "/contact", label: "Contact Us" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/faq", label: "FAQ" },
    { href: "/stores", label: "Store Locator" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/zavira-logo.png"
                alt="Zavira"
                width={120}
                height={32}
                className="h-8 w-auto invert dark:invert-0"
                priority
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              Essence of the Noir. Luxury fragrances crafted in France, designed for those who dare to stand apart.
            </p>
            <p className="text-xs text-muted-foreground tracking-wide">
              L'âme de la Nuit
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wide mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wide mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-wide mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zavira Parfums. All rights reserved. Made in France.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
