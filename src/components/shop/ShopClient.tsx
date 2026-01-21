"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Zavira Primal",
    subtitle: "Eau de Parfum",
    price: 125,
    size: "50ml / 1.7 FL OZ",
    image: "/assets/product-primal.jpg",
    slug: "primal",
    category: "For Him",
  },
  {
    id: 2,
    name: "Midnight Elixir",
    subtitle: "Eau de Parfum",
    price: 185,
    size: "100ml / 3.4 FL OZ",
    image: "/assets/product-midnight.jpg",
    slug: "midnight-elixir",
    category: "Unisex",
  },
  {
    id: 3,
    name: "Rose Noir",
    subtitle: "Eau de Parfum",
    price: 145,
    size: "75ml / 2.5 FL OZ",
    image: "/assets/product-essence.jpg",
    slug: "rose-noir",
    category: "For Her",
  },
  {
    id: 4,
    name: "Velvet Amber",
    subtitle: "Eau de Parfum",
    price: 165,
    size: "100ml / 3.4 FL OZ",
    image: "/assets/product-velvet.jpg",
    slug: "velvet-amber",
    category: "Unisex",
  },
  {
    id: 5,
    name: "Essence of Noir",
    subtitle: "Eau de Parfum",
    price: 195,
    size: "100ml / 3.4 FL OZ",
    image: "/assets/product-primal.jpg",
    slug: "essence-noir",
    category: "For Him",
  },
  {
    id: 6,
    name: "Blanc de Lune",
    subtitle: "Eau de Parfum",
    price: 155,
    size: "75ml / 2.5 FL OZ",
    image: "/assets/product-midnight.jpg",
    slug: "blanc-de-lune",
    category: "For Her",
  },
];

const categories = ["All", "For Him", "For Her", "Unisex"];

export default function ShopClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
              Shop All Fragrances
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our curated collection of luxury perfumes, each crafted to evoke a unique sensory experience.
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-8 border-b border-border">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-card">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-display text-xl font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.size}
                    </p>
                    <p className="font-medium text-lg">${product.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
