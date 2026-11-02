import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatBDT } from "@/lib/utils";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";
import productEssence from "@/assets/product-essence.jpg";
import productVelvet from "@/assets/product-velvet.jpg";

const productsData: Record<string, {
  name: string;
  subtitle: string;
  price: number;
  sizes: { size: string; price: number }[];
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  image: string;
}> = {
  primal: {
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    price: 12500,
    sizes: [
      { size: "30ml", price: 8500 },
      { size: "50ml", price: 12500 },
      { size: "100ml", price: 18500 },
    ],
    description: "A bold and commanding fragrance that captures the essence of raw masculinity. Primal opens with invigorating citrus notes, evolving into a rich heart of leather and spice, before settling into a deep, sensual base of oud and amber.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Leather", "Iris", "Rose"],
      base: ["Oud", "Amber", "Sandalwood"],
    },
    image: productPrimal,
  },
  "midnight-elixir": {
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 18500,
    sizes: [
      { size: "50ml", price: 12500 },
      { size: "100ml", price: 18500 },
    ],
    description: "An enigmatic blend that captures the mystery of the midnight hour. This intoxicating elixir weaves together rare ingredients to create an unforgettable olfactory experience.",
    notes: {
      top: ["Saffron", "Pink Pepper", "Cinnamon"],
      heart: ["Dark Rose", "Jasmine", "Orris"],
      base: ["Musk", "Vetiver", "Benzoin"],
    },
    image: productMidnight,
  },
  "rose-noir": {
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 14500,
    sizes: [
      { size: "30ml", price: 9500 },
      { size: "75ml", price: 14500 },
    ],
    description: "A sophisticated interpretation of the classic rose, reimagined through a lens of darkness and mystery. Rose Noir is for the woman who commands attention without saying a word.",
    notes: {
      top: ["Turkish Rose", "Raspberry", "Saffron"],
      heart: ["Bulgarian Rose", "Oud", "Patchouli"],
      base: ["Amber", "Vanilla", "Musk"],
    },
    image: productEssence,
  },
  "velvet-amber": {
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 16500,
    sizes: [
      { size: "50ml", price: 11500 },
      { size: "100ml", price: 16500 },
    ],
    description: "Warm, enveloping, and utterly luxurious. Velvet Amber wraps you in a cocoon of precious resins and exotic woods, creating a scent that lingers long after you've left the room.",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      heart: ["Amber", "Labdanum", "Jasmine"],
      base: ["Benzoin", "Vanilla", "Cedarwood"],
    },
    image: productVelvet,
  },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData[slug || ""] || productsData.primal;
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} (${product.sizes[selectedSize].size}) has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        <section className="py-12 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Image — flacon anchored on the canvas */}
              <div className="relative">
                <div className="relative aspect-square bg-midnight-surface overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Signature blind-emboss label */}
                <div className="absolute top-0 left-0 border border-bronze/40 bg-midnight px-4 py-2">
                  <p className="font-sans-luxury text-[10px] tracking-[0.25em] text-ivory/70">
                    {product.sizes[selectedSize].size.toUpperCase()} — EXTRAIT DE PARFUM · ৳ BDT
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <p className="font-sans-luxury text-xs uppercase tracking-[0.35em] text-bronze mb-3">
                  {product.subtitle}
                </p>
                <h1 className="text-5xl md:text-6xl mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl text-bronze tabular-nums mb-8">
                  {formatBDT(product.sizes[selectedSize].price)}
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed font-sans-luxury">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wide mb-4">Size</p>
                  <div className="flex gap-3">
                    {product.sizes.map((size, index) => (
                      <Button
                        key={size.size}
                        variant={selectedSize === index ? "luxury" : "luxury-outline"}
                        size="sm"
                        onClick={() => setSelectedSize(index)}
                      >
                        {size.size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wide mb-4">Quantity</p>
                  <div className="flex items-center border border-border w-fit">
                    <button
                      className="p-3 hover:bg-accent transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 font-medium tabular-nums">{quantity}</span>
                    <button
                      className="p-3 hover:bg-accent transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-12">
                  <Button
                    variant="luxury"
                    size="xl"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="luxury-outline" size="icon" className="h-16 w-16">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                {/* Olfactory formulation grid */}
                <div className="border-t border-border pt-8">
                  <h3 className="font-display text-lg mb-6">Fragrance Notes</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {(
                        [
                          ["Top", product.notes.top],
                          ["Heart", product.notes.heart],
                          ["Base", product.notes.base],
                        ] as const
                      ).map(([label, notes]) => (
                        <tr key={label} className="border-b border-border/60 last:border-0">
                          <td className="py-3 pr-6 align-top text-xs uppercase tracking-wide text-muted-foreground">
                            {label}
                          </td>
                          <td className="py-3 align-top">{notes.join(" · ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default ProductDetail;
