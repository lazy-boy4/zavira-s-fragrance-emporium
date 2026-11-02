import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatBDT } from "@/lib/utils";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";
import productEssence from "@/assets/product-essence.jpg";
import productVelvet from "@/assets/product-velvet.jpg";

const products = [
  {
    id: 1,
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    price: 12500,
    size: "50ml / 1.7 FL OZ",
    image: productPrimal,
    slug: "primal",
    category: "For Him",
  },
  {
    id: 2,
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 18500,
    size: "100ml / 3.4 FL OZ",
    image: productMidnight,
    slug: "midnight-elixir",
    category: "Unisex",
  },
  {
    id: 3,
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 14500,
    size: "75ml / 2.5 FL OZ",
    image: productEssence,
    slug: "rose-noir",
    category: "For Her",
  },
  {
    id: 4,
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 16500,
    size: "100ml / 3.4 FL OZ",
    image: productVelvet,
    slug: "velvet-amber",
    category: "Unisex",
  },
  {
    id: 5,
    name: "Essence of Noir",
    subtitle: "Eau de Parfum",
    price: 19500,
    size: "100ml / 3.4 FL OZ",
    image: productPrimal,
    slug: "essence-noir",
    category: "For Him",
  },
  {
    id: 6,
    name: "Blanc de Lune",
    subtitle: "Eau de Parfum",
    price: 15500,
    size: "75ml / 2.5 FL OZ",
    image: productMidnight,
    slug: "blanc-de-lune",
    category: "For Her",
  },
];

const categories = ["All", "For Him", "For Her", "Unisex"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price · Low to High" },
  { value: "price-desc", label: "Price · High to Low" },
  { value: "name-asc", label: "Name · A to Z" },
] as const;

const PRICE_MIN = 8000;
const PRICE_MAX = 20000;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const sort = searchParams.get("sort") ?? "featured";
  const min = Number(searchParams.get("min") ?? PRICE_MIN);
  const max = Number(searchParams.get("max") ?? PRICE_MAX);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null || value === "" || value === "All" || value === "featured") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => p.price >= min && p.price <= max);
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "name-asc": list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return list;
  }, [activeCategory, sort, min, max]);

  const resetFilters = () => setSearchParams({}, { replace: true });

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-midnight-surface border-b border-bronze/15">
          <div className="container mx-auto px-4 lg:px-8">
            <p className="font-sans-luxury text-xs uppercase tracking-[0.35em] text-bronze mb-6">
              The Catalogue
            </p>
            <h1 className="text-5xl md:text-7xl mb-6">
              Shop All Fragrances
            </h1>
            <p className="text-muted-foreground max-w-xl font-sans-luxury">
              Explore our curated collection of luxury perfumes, each crafted to evoke a unique sensory experience.
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filters — hairline bronze editorial bar */}
            <div className="mb-12 border border-bronze/20 bg-midnight-surface/50 p-6 lg:p-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Collection chips */}
                <div>
                  <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze mb-3">
                    Family
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {categories.map((category) => {
                      const active = activeCategory === category;
                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => setParam("category", category)}
                          className={`relative font-sans-luxury text-xs uppercase tracking-[0.2em] pb-1 transition-colors ${
                            active ? "text-bronze" : "text-ivory/60 hover:text-ivory"
                          }`}
                        >
                          {category}
                          {active && <span aria-hidden className="absolute left-0 right-0 -bottom-px h-px bg-bronze" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze">Price</p>
                    <p className="text-sm text-ivory/80 tabular-nums">
                      {formatBDT(min)} — {formatBDT(max)}
                    </p>
                  </div>
                  <Slider
                    value={[min, max]}
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={500}
                    onValueChange={([lo, hi]) => {
                      const next = new URLSearchParams(searchParams);
                      if (lo === PRICE_MIN) next.delete("min"); else next.set("min", String(lo));
                      if (hi === PRICE_MAX) next.delete("max"); else next.set("max", String(hi));
                      setSearchParams(next, { replace: true });
                    }}
                    className="[&_[role=slider]]:border-bronze"
                  />
                </div>

                {/* Sort */}
                <div>
                  <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze mb-3">
                    Arrange
                  </p>
                  <Select value={sort} onValueChange={(v) => setParam("sort", v)}>
                    <SelectTrigger className="bg-transparent border-0 border-b border-bronze/40 rounded-none px-0 font-sans-luxury text-xs uppercase tracking-[0.2em] focus:ring-0 focus:border-bronze">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-bronze/15">
                <p className="text-sm text-ivory/70 tabular-nums">
                  {filteredProducts.length} composition{filteredProducts.length === 1 ? "" : "s"}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze hover:text-ivory transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 border border-bronze/15 bg-midnight-surface/30">
                <p className="font-serif-display italic text-2xl text-ivory/80 mb-4">
                  No compositions match this arrangement.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-sans-luxury text-xs uppercase tracking-[0.3em] text-bronze hover:text-ivory transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-midnight-surface">
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
                    <p className="text-lg text-bronze tabular-nums">{formatBDT(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
