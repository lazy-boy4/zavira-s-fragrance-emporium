"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    price: 125,
    sizes: [
      { size: "30ml", price: 85 },
      { size: "50ml", price: 125 },
      { size: "100ml", price: 185 },
    ],
    description: "A bold and commanding fragrance that captures the essence of raw masculinity. Primal opens with invigorating citrus notes, evolving into a rich heart of leather and spice, before settling into a deep, sensual base of oud and amber.",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Leather", "Iris", "Rose"],
      base: ["Oud", "Amber", "Sandalwood"],
    },
    image: "/assets/product-primal.jpg",
  },
  "midnight-elixir": {
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 185,
    sizes: [
      { size: "50ml", price: 125 },
      { size: "100ml", price: 185 },
    ],
    description: "An enigmatic blend that captures the mystery of the midnight hour. This intoxicating elixir weaves together rare ingredients to create an unforgettable olfactory experience.",
    notes: {
      top: ["Saffron", "Pink Pepper", "Cinnamon"],
      heart: ["Dark Rose", "Jasmine", "Orris"],
      base: ["Musk", "Vetiver", "Benzoin"],
    },
    image: "/assets/product-midnight.jpg",
  },
  "rose-noir": {
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 145,
    sizes: [
      { size: "30ml", price: 95 },
      { size: "75ml", price: 145 },
    ],
    description: "A sophisticated interpretation of the classic rose, reimagined through a lens of darkness and mystery. Rose Noir is for the woman who commands attention without saying a word.",
    notes: {
      top: ["Turkish Rose", "Raspberry", "Saffron"],
      heart: ["Bulgarian Rose", "Oud", "Patchouli"],
      base: ["Amber", "Vanilla", "Musk"],
    },
    image: "/assets/product-essence.jpg",
  },
  "velvet-amber": {
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 165,
    sizes: [
      { size: "50ml", price: 115 },
      { size: "100ml", price: 165 },
    ],
    description: "Warm, enveloping, and utterly luxurious. Velvet Amber wraps you in a cocoon of precious resins and exotic woods, creating a scent that lingers long after you've left the room.",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      heart: ["Amber", "Labdanum", "Jasmine"],
      base: ["Benzoin", "Vanilla", "Cedarwood"],
    },
    image: "/assets/product-velvet.jpg",
  },
  "essence-noir": {
    name: "Essence of Noir",
    subtitle: "Eau de Parfum",
    price: 195,
    sizes: [
      { size: "100ml", price: 195 },
    ],
    description: "A deep, dark, and intense fragrance. Essence of Noir is the epitome of mystery and elegance.",
    notes: {
      top: ["Blackcurrant", "Bergamot"],
      heart: ["Rose", "Davana"],
      base: ["Patchouli", "Moss", "Musk"],
    },
    image: "/assets/product-primal.jpg",
  },
  "blanc-de-lune": {
    name: "Blanc de Lune",
    subtitle: "Eau de Parfum",
    price: 155,
    sizes: [
      { size: "75ml", price: 155 },
    ],
    description: "Soft, ethereal, and luminous like moonlight. A delicate floral composition with a creamy base.",
    notes: {
      top: ["White Peach", "Pear"],
      heart: ["White Flowers", "Jasmine"],
      base: ["White Musk", "Sandalwood"],
    },
    image: "/assets/product-midnight.jpg",
  },
};

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = productsData[slug] || productsData.primal;
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
    <div className="min-h-screen">
      <main className="pt-20">
        <section className="py-12 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm">
              <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Image */}
              <div className="aspect-square bg-card overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  {product.subtitle}
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium mb-8">
                  ${product.sizes[selectedSize].price}.00
                </p>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wide mb-4">Size</p>
                  <div className="flex gap-3">
                    {product.sizes.map((size, index) => (
                      <Button
                        key={size.size}
                        variant={selectedSize === index ? "default" : "outline"}
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
                    <span className="px-6 py-3 font-medium">{quantity}</span>
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
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                {/* Notes */}
                <div className="border-t border-border pt-8">
                  <h3 className="font-display text-lg mb-6">Fragrance Notes</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Top</p>
                      {product.notes.top.map((note) => (
                        <p key={note} className="text-sm mb-1">{note}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Heart</p>
                      {product.notes.heart.map((note) => (
                        <p key={note} className="text-sm mb-1">{note}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Base</p>
                      {product.notes.base.map((note) => (
                        <p key={note} className="text-sm mb-1">{note}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
