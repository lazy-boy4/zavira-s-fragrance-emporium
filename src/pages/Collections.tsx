import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Curated for You
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Our Collections
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each collection tells a unique story, crafted to evoke distinct emotions and memories.
            </p>
          </div>
        </section>

        {/* Collections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  to={`/shop?collection=${collection.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      Collection {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-medium mb-3 group-hover:text-silver transition-colors">
                      {collection.name}
                    </h2>
                    <p className="text-muted-foreground max-w-sm">
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
