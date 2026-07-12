import { Link } from "react-router-dom";
import zaviraLogo from "@/assets/zavira-logo.png";

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
    <footer className="bg-midnight-surface border-t border-bronze/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img
                src={zaviraLogo}
                alt="Zavira"
                className="h-8 w-auto invert dark:invert-0"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6 font-sans-luxury">
              Essence of the Noir. Luxury fragrances crafted in France, designed for those who dare to stand apart.
            </p>
            <p className="font-serif-display italic text-bronze text-lg">
              L'âme de la Nuit
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-sans-luxury text-xs uppercase tracking-[0.25em] text-bronze mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-bronze transition-colors font-sans-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-sans-luxury text-xs uppercase tracking-[0.25em] text-bronze mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-bronze transition-colors font-sans-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-sans-luxury text-xs uppercase tracking-[0.25em] text-bronze mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-bronze transition-colors font-sans-luxury"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-bronze/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-sans-luxury tracking-wide">
            © {new Date().getFullYear()} Zavira Parfums. All rights reserved. Made in France.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-bronze transition-colors font-sans-luxury tracking-wide">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-bronze transition-colors font-sans-luxury tracking-wide">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
