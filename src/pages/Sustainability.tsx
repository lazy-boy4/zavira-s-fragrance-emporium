import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Recycle, Heart, Globe } from "lucide-react";

/**
 * Sustainability Page
 * 
 * Showcases Zavira's commitment to environmental and social responsibility.
 */
const Sustainability = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
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
              Luxury and responsibility are not mutually exclusive. At Zavira, we believe 
              that true elegance embraces a commitment to our planet and its people.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-8 bg-card border border-border">
                <Leaf className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-3">Natural Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  85% of our ingredients are naturally derived, sourced from sustainable farms worldwide.
                </p>
              </div>
              <div className="text-center p-8 bg-card border border-border">
                <Recycle className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-3">Recyclable Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  100% recyclable glass flacons and FSC-certified paper packaging by 2025.
                </p>
              </div>
              <div className="text-center p-8 bg-card border border-border">
                <Heart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-3">Cruelty-Free</h3>
                <p className="text-sm text-muted-foreground">
                  We never test on animals. Certified by Leaping Bunny and PETA.
                </p>
              </div>
              <div className="text-center p-8 bg-card border border-border">
                <Globe className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-medium mb-3">Carbon Neutral</h3>
                <p className="text-sm text-muted-foreground">
                  Carbon neutral operations since 2022, with a net-zero target by 2030.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-medium mb-12 text-center">
              Our Initiatives
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800"
                    alt="Rose fields"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium mb-4">
                    Regenerative Sourcing
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We partner directly with farming communities to implement regenerative 
                    agricultural practices. Our rose fields in Bulgaria have increased 
                    biodiversity by 40% since 2019.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Fair trade premiums ensure that farmers receive compensation that 
                    allows them to invest in sustainable practices and community development.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2 aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800"
                    alt="Recycling"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:order-1">
                  <h3 className="font-display text-2xl font-medium mb-4">
                    Circular Packaging
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our Refill Program allows customers to return empty flacons to be 
                    cleaned, refilled, and returned—reducing glass waste by 70% per bottle.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    All shipping materials are plastic-free and made from recycled or 
                    FSC-certified materials.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800"
                    alt="Forest"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium mb-4">
                    Climate Action
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We've reduced our operational emissions by 65% since 2018 through 
                    renewable energy, efficient manufacturing, and sustainable logistics.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Remaining emissions are offset through verified reforestation and 
                    ocean conservation projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h2 className="font-display text-3xl font-medium mb-12 text-center">
              Our 2030 Goals
            </h2>
            
            <div className="space-y-6">
              {[
                { goal: "100% natural or naturally-derived ingredients", progress: 85 },
                { goal: "Zero waste to landfill", progress: 72 },
                { goal: "Net-zero carbon emissions", progress: 65 },
                { goal: "100% recyclable or reusable packaging", progress: 90 },
                { goal: "Living wage for all supply chain workers", progress: 78 },
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{item.goal}</span>
                    <span className="text-muted-foreground">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <blockquote className="font-display text-2xl md:text-3xl font-medium italic leading-relaxed mb-6">
              "The essence of true luxury lies in its ability to exist in harmony 
              with nature, leaving a legacy of beauty for generations to come."
            </blockquote>
            <cite className="text-muted-foreground not-italic">
              — Zavira Manifesto
            </cite>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
