import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Craftsmanship Page
 * 
 * Showcases the artistry and process behind Zavira fragrances.
 */
const Craftsmanship = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              The Art of Perfumery
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-medium mb-6">
              Craftsmanship
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every Zavira fragrance is a masterpiece of olfactory art, crafted by master 
              perfumers using the world's finest ingredients.
            </p>
          </div>
        </section>

        {/* The Process */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-medium mb-12 text-center">
                The Creation Process
              </h2>
              
              <div className="space-y-16">
                {/* Step 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="aspect-[4/3] bg-card overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800"
                      alt="Sourcing ingredients"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:pl-8">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Step 01</span>
                    <h3 className="font-display text-2xl font-medium mt-2 mb-4">Sourcing Excellence</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We travel the world to source the finest raw materials. From Bulgarian rose 
                      fields to Madagascar vanilla plantations, every ingredient is hand-selected 
                      for its exceptional quality and unique character.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:order-2 aspect-[4/3] bg-card overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800"
                      alt="Master perfumer at work"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:order-1 lg:pr-8">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Step 02</span>
                    <h3 className="font-display text-2xl font-medium mt-2 mb-4">Master Composition</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our master perfumers, trained in the French tradition of haute parfumerie, 
                      spend months—sometimes years—developing each fragrance. They blend hundreds 
                      of accords until the perfect composition emerges.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="aspect-[4/3] bg-card overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800"
                      alt="Maceration process"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:pl-8">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Step 03</span>
                    <h3 className="font-display text-2xl font-medium mt-2 mb-4">Patient Maceration</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Unlike mass-produced fragrances, Zavira perfumes undergo a minimum 60-day 
                      maceration period. This allows the ingredients to marry and mature, creating 
                      a depth and complexity that cannot be rushed.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="lg:order-2 aspect-[4/3] bg-card overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800"
                      alt="Quality control"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:order-1 lg:pr-8">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Step 04</span>
                    <h3 className="font-display text-2xl font-medium mt-2 mb-4">Artisan Finishing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Each bottle is hand-filled, inspected, and finished by skilled artisans. 
                      The signature Zavira flacon, designed by renowned glass artists, is a 
                      work of art in itself—a fitting vessel for the precious liquid within.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Perfumers */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-display text-3xl font-medium mb-4">Our Master Perfumers</h2>
              <p className="text-muted-foreground">
                Behind every Zavira fragrance is a master perfumer with decades of experience 
                and an unwavering dedication to their craft.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
                    alt="Jean-Pierre Laurent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-medium">Jean-Pierre Laurent</h3>
                <p className="text-sm text-muted-foreground">Head Perfumer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300"
                    alt="Marie Dubois"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-medium">Marie Dubois</h3>
                <p className="text-sm text-muted-foreground">Senior Perfumer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300"
                    alt="Alessandro Rossi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-medium">Alessandro Rossi</h3>
                <p className="text-sm text-muted-foreground">Creative Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
            <blockquote className="font-display text-2xl md:text-3xl font-medium italic leading-relaxed mb-6">
              "A great perfume is not made—it is discovered. Each Zavira fragrance 
              is a journey of exploration, a conversation between tradition and innovation."
            </blockquote>
            <cite className="text-muted-foreground not-italic">
              — Jean-Pierre Laurent, Head Perfumer
            </cite>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Craftsmanship;
