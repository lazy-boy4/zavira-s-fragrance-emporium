import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroPerfume from "@/assets/hero-perfume.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroPerfume}
          alt="Zavira luxury perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-20">
        <div className="max-w-2xl animate-slide-up">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Eau de Parfum
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-6 leading-tight">
            Essence of<br />
            <em className="font-normal">the Noir</em>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-display italic">
            L'âme de la Nuit
          </p>
          <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
            A captivating journey through darkness and elegance. Experience the soul of the night, crafted with the finest ingredients from France.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <Button variant="luxury" size="xl">
                Discover Collection
              </Button>
            </Link>
            <Link to="/story">
              <Button variant="luxury-outline" size="xl">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
