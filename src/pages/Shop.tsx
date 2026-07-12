import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";
import productEssence from "@/assets/product-essence.jpg";
import productVelvet from "@/assets/product-velvet.jpg";

const products = [
  {
    id: 1,
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    price: 125,
    size: "50ml / 1.7 FL OZ",
    image: productPrimal,
    slug: "primal",
    category: "For Him",
  },
  {
    id: 2,
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 185,
    size: "100ml / 3.4 FL OZ",
    image: productMidnight,
    slug: "midnight-elixir",
    category: "Unisex",
  },
  {
    id: 3,
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 145,
    size: "75ml / 2.5 FL OZ",
    image: productEssence,
    slug: "rose-noir",
    category: "For Her",
  },
  {
    id: 4,
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 165,
    size: "100ml / 3.4 FL OZ",
    image: productVelvet,
    slug: "velvet-amber",
    category: "Unisex",
  },
  {
    id: 5,
    name: "Essence of Noir",
    subtitle: "Eau de Parfum",
    price: 195,
    size: "100ml / 3.4 FL OZ",
    image: productPrimal,
    slug: "essence-noir",
    category: "For Him",
  },
  {
    id: 6,
    name: "Blanc de Lune",
    subtitle: "Eau de Parfum",
    price: 155,
    size: "75ml / 2.5 FL OZ",
    image: productMidnight,
    slug: "blanc-de-lune",
    category: "For Her",
  },
];

const categories = ["All", "For Him", "For Her", "Unisex"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-midnight-surface border-b border-bronze/15 relative overflow-hidden">
          <span aria-hidden className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 vertical-rl font-sans-luxury text-[0.65rem] tracking-[0.4em] uppercase text-bronze/60">
            Volume II — Le Catalogue
          </span>
          <div className="container mx-auto px-4 lg:px-8 text-center animate-reveal">
            <p className="font-sans-luxury text-xs uppercase tracking-[0.35em] text-bronze mb-6">
              La Collection
            </p>
            <h1 className="text-5xl md:text-7xl mb-6">
              Shop All <span className="italic text-bronze">Fragrances</span>
            </h1>
            <div className="w-16 h-px bg-bronze mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto font-sans-luxury">
              Explore our curated collection of luxury perfumes, each crafted to evoke a unique sensory experience.
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b border-bronze/15">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "luxury" : "luxury-outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="font-sans-luxury tracking-[0.2em]"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-bronze hover:text-bronze font-sans-luxury tracking-[0.2em]">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-midnight-surface">
                    {/* hairline bronze corner rules */}
                    <span aria-hidden className="absolute top-0 left-0 w-6 h-px bg-bronze/60 z-10" />
                    <span aria-hidden className="absolute top-0 left-0 h-6 w-px bg-bronze/60 z-10" />
                    <span aria-hidden className="absolute bottom-0 right-0 w-6 h-px bg-bronze/60 z-10" />
                    <span aria-hidden className="absolute bottom-0 right-0 h-6 w-px bg-bronze/60 z-10" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/20 transition-colors duration-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-[0.65rem] font-sans-luxury uppercase tracking-[0.3em] text-bronze mb-3">
                      {product.category}
                    </p>
                    <h3 className="text-2xl mb-1 group-hover:text-bronze transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 font-sans-luxury">
                      {product.size}
                    </p>
                    <p className="font-serif-display italic text-lg text-bronze">${product.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
