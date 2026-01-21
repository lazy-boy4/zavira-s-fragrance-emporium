import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/**
 * Product data for search - this will be replaced with API data
 * when backend is integrated
 */
const products = [
  { id: 1, name: "Zavira Primal", category: "For Him", price: 125, slug: "primal", image: "/assets/product-primal.jpg" },
  { id: 2, name: "Midnight Elixir", category: "Unisex", price: 185, slug: "midnight-elixir", image: "/assets/product-midnight.jpg" },
  { id: 3, name: "Rose Noir", category: "For Her", price: 145, slug: "rose-noir", image: "/assets/product-essence.jpg" },
  { id: 4, name: "Velvet Amber", category: "Unisex", price: 165, slug: "velvet-amber", image: "/assets/product-velvet.jpg" },
  { id: 5, name: "Essence of Noir", category: "For Him", price: 195, slug: "essence-noir", image: "/assets/product-primal.jpg" },
  { id: 6, name: "Blanc de Lune", category: "For Her", price: 155, slug: "blanc-de-lune", image: "/assets/product-midnight.jpg" },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * SearchDialog - Full-screen search modal with live filtering
 * 
 * Features:
 * - Live search filtering as user types
 * - Keyboard navigation (Escape to close)
 * - Product preview with images
 * - Quick links to collections
 * 
 * @param open - Whether the dialog is open
 * @param onOpenChange - Callback when open state changes
 */
export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(products);
  const router = useRouter();

  // Filter products based on search query
  const filterProducts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  }, []);

  // Debounce search for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      filterProducts(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, filterProducts]);

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults(products);
    }
  }, [open]);

  const handleProductClick = (slug: string) => {
    onOpenChange(false);
    router.push(`/product/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-background border-border">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search fragrances..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg bg-card border-border focus-visible:ring-1"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Links */}
          {!query && (
            <div className="mb-8">
              <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
                Quick Links
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/shop?category=new"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 bg-card border border-border text-sm hover:bg-accent transition-colors"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/collections"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 bg-card border border-border text-sm hover:bg-accent transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/shop?category=bestsellers"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 bg-card border border-border text-sm hover:bg-accent transition-colors"
                >
                  Bestsellers
                </Link>
              </div>
            </div>
          )}

          {/* Search Results */}
          <div>
            <h3 className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
              {query ? `Results (${results.length})` : "Popular Fragrances"}
            </h3>

            {results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No fragrances found</p>
                <p className="text-sm text-muted-foreground">
                  Try searching for "Primal" or "Rose"
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-card transition-colors group text-left"
                  >
                    <div className="w-16 h-20 bg-card flex-shrink-0 overflow-hidden relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-medium truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {product.category}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${product.price}.00
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
          <span>Press ESC to close</span>
          <Link
            href="/shop"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            View all products
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
