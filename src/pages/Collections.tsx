import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";
import productEssence from "@/assets/product-essence.jpg";
import productVelvet from "@/assets/product-velvet.jpg";

const collections = [
  {
    id: 1,
    name: "Noir Collection",
    description: "Bold, dark, and utterly captivating. For those who embrace the night.",
    image: productPrimal,
    slug: "noir",
  },
  {
    id: 2,
    name: "Elixir Collection",
    description: "Mysterious blends that leave an unforgettable impression.",
    image: productMidnight,
    slug: "elixir",
  },
  {
    id: 3,
    name: "Rose Collection",
    description: "Timeless elegance reimagined through modern sensibility.",
    image: productEssence,
    slug: "rose",
  },
  {
    id: 4,
    name: "Amber Collection",
    description: "Warm, enveloping scents that linger long after you've gone.",
    image: productVelvet,
    slug: "amber",
  },
];

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "featured";

  const sorted = useMemo(() => {
    const list = [...collections];
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [sort]);

  const onSort = (v: string) => {
    const next = new URLSearchParams(searchParams);
    if (v === "featured") next.delete("sort"); else next.set("sort", v);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-midnight-surface border-b border-bronze/15">
          <div className="container mx-auto px-4 lg:px-8 text-center animate-reveal">
            <p className="font-sans-luxury text-xs uppercase tracking-[0.35em] text-bronze mb-6">
              Curated for the Discerning
            </p>
            <h1 className="text-5xl md:text-7xl mb-6">
              Our <span className="italic text-bronze">Collections</span>
            </h1>
            <div className="w-16 h-px bg-bronze mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto font-sans-luxury">
              Each collection tells a unique story, crafted to evoke distinct emotions and memories.
            </p>
          </div>
        </section>

        {/* Collections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-bronze/15">
              <p className="font-serif-display italic text-sm text-ivory/70">
                Four compositions
              </p>
              <div className="flex items-center gap-4">
                <p className="font-sans-luxury text-[0.65rem] uppercase tracking-[0.3em] text-bronze">Arrange</p>
                <Select value={sort} onValueChange={onSort}>
                  <SelectTrigger className="w-[180px] bg-transparent border-0 border-b border-bronze/40 rounded-none px-0 font-sans-luxury text-xs uppercase tracking-[0.2em] focus:ring-0 focus:border-bronze">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name-asc">Name · A to Z</SelectItem>
                    <SelectItem value="name-desc">Name · Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sorted.map((collection, index) => (
                <Link
                  key={collection.id}
                  to={`/shop?collection=${collection.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden border border-bronze/15"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[0.65rem] font-sans-luxury uppercase tracking-[0.3em] text-bronze mb-3">
                      Collection {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-4xl md:text-5xl mb-3 group-hover:text-bronze transition-colors">
                      <span className="italic">{collection.name}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-sm font-sans-luxury">
                      {collection.description}
                    </p>
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

export default Collections;
