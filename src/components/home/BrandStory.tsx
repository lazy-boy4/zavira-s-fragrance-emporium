import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import productBox from "@/assets/product-box.png";

export const BrandStory = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img
                src={productBox}
                alt="Zavira packaging"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-border" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-8 leading-tight">
              Crafted in<br />
              <em className="font-normal">France</em>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Born from a passion for the extraordinary, Zavira represents the pinnacle of French perfumery. Each fragrance is a testament to centuries of artisanal tradition, reimagined for the modern connoisseur.
              </p>
              <p>
                We source only the finest raw materials from around the world, blending them with precision and care in our atelier in Grasse, the heart of the perfume world.
              </p>
              <p>
                The result? Fragrances that transcend time, designed for those who refuse to blend in.
              </p>
            </div>
            <div className="mt-10">
              <Link to="/story">
                <Button variant="luxury-outline" size="lg">
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
