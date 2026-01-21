import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    price: 125,
    size: "50ml / 1.7 FL OZ",
    image: "/images/product-primal.jpg",
    slug: "primal",
  },
  {
    id: 2,
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 185,
    size: "100ml / 3.4 FL OZ",
    image: "/images/product-midnight.jpg",
    slug: "midnight-elixir",
  },
  {
    id: 3,
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 145,
    size: "75ml / 2.5 FL OZ",
    image: "/images/product-essence.jpg",
    slug: "rose-noir",
  },
  {
    id: 4,
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 165,
    size: "100ml / 3.4 FL OZ",
    image: "/images/product-velvet.jpg",
    slug: "velvet-amber",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Our Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Signature Fragrances
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each scent is a masterpiece, meticulously crafted to evoke emotion and leave an unforgettable impression.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group"
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-background">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </div>
              <div className="text-center">
                <h3 className="font-display text-lg font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {product.subtitle}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.size}
                </p>
                <p className="font-medium">${product.price}.00</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button asChild variant="luxury-outline" size="lg">
            <Link href="/shop">View All Fragrances</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
