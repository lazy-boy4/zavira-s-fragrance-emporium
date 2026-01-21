"use client";

import Image from "next/image";
import { Leaf, Droplets, Recycle, Heart } from "lucide-react";

export default function SustainabilityClient() {
  return (
    <div className="min-h-screen pt-20">
      <main>
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Our Commitment
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-6">
              Sustainability
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We believe that true luxury should not come at the cost of our planet. 
              Our commitment to sustainability is woven into every aspect of our brand.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 bg-card border border-border text-center">
                <Leaf className="h-10 w-10 mx-auto mb-6 text-primary" />
                <h3 className="font-display text-xl font-medium mb-3">Responsibly Sourced</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We partner with suppliers who prioritize ethical farming and fair labor practices.
                </p>
              </div>
              <div className="p-8 bg-card border border-border text-center">
                <Recycle className="h-10 w-10 mx-auto mb-6 text-primary" />
                <h3 className="font-display text-xl font-medium mb-3">Eco-Packaging</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our packaging is 100% recyclable and made from post-consumer recycled materials.
                </p>
              </div>
              <div className="p-8 bg-card border border-border text-center">
                <Droplets className="h-10 w-10 mx-auto mb-6 text-primary" />
                <h3 className="font-display text-xl font-medium mb-3">Clean Chemistry</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Free from parabens, phthalates, and synthetic dyes. Safe for you and the environment.
                </p>
              </div>
              <div className="p-8 bg-card border border-border text-center">
                <Heart className="h-10 w-10 mx-auto mb-6 text-primary" />
                <h3 className="font-display text-xl font-medium mb-3">Cruelty-Free</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We never test on animals. We are proudly certified cruelty-free and vegan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content with Image */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="aspect-square bg-muted overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?w=800"
                  alt="Sustainable farming"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                  Preserving Nature's Beauty
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Our journey begins in the fields where our ingredients are grown. We work directly 
                    with farmers who employ regenerative agriculture techniques, ensuring the soil 
                    remains healthy and biodiversity thrives.
                  </p>
                  <p>
                    By supporting local communities and paying fair wages, we help preserve traditional 
                    farming methods that have been passed down through generations. This not only 
                    results in superior ingredients but also protects the cultural heritage of 
                    perfumery.
                  </p>
                  <p>
                    We have reduced our carbon footprint by optimizing our supply chain and using 
                    renewable energy in our production facilities. Our goal is to become carbon 
                    neutral by 2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refill Program */}
        <section className="py-16 lg:py-24 bg-background text-center">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
              The Circle of Scent
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Join our refill program and help us reduce waste. Bring your empty Zavira bottle 
              to any of our boutiques for a refill and receive 20% off.
            </p>
            <div className="inline-flex items-center justify-center p-1 border border-border rounded-full">
              <span className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full">
                Learn More About Refills
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
