import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Newsletter } from "@/components/home/Newsletter";
import productBox from "@/assets/product-box.png";
import heroPerfume from "@/assets/hero-perfume.jpg";

const Story = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroPerfume}
              alt="Zavira atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80" />
          </div>
          <div className="relative container mx-auto px-4 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Heritage
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-medium mb-6">
              The Zavira Story
            </h1>
            <p className="text-xl text-muted-foreground font-display italic">
              L'âme de la Nuit — The Soul of the Night
            </p>
          </div>
        </section>

        {/* Origin */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-8">
                Born from Passion
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Zavira was born in 2020 from a singular vision: to create fragrances that capture the essence of those fleeting, magical moments between dusk and dawn. Our founder, inspired by the rich traditions of French perfumery and the mysterious allure of the night, set out to craft scents that would be as memorable as they are distinctive.
                </p>
                <p>
                  The name "Zavira" itself is a fusion of ancient words meaning "radiance" and "mystery" — a duality that defines every fragrance we create.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Our Craft
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium mb-8">
                  Made in Grasse, France
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Every Zavira fragrance is crafted in our atelier in Grasse, the perfume capital of the world. Here, master perfumers with decades of experience work alongside young innovators to push the boundaries of scent.
                  </p>
                  <p>
                    We source only the finest raw materials from around the globe — Turkish roses, Indian sandalwood, Haitian vetiver, and rare ouds from the Far East. Each ingredient is carefully selected for its quality, sustainability, and ability to evoke emotion.
                  </p>
                  <p>
                    Our creation process is unhurried. A single fragrance can take years to perfect, undergoing hundreds of iterations before it meets our exacting standards.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={productBox}
                    alt="Zavira craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                What We Believe
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-border flex items-center justify-center">
                  <span className="font-display text-2xl">01</span>
                </div>
                <h3 className="font-display text-xl font-medium mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every bottle that bears the Zavira name represents the pinnacle of French perfumery.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-border flex items-center justify-center">
                  <span className="font-display text-2xl">02</span>
                </div>
                <h3 className="font-display text-xl font-medium mb-4">Sustainability</h3>
                <p className="text-muted-foreground">
                  From responsible sourcing to eco-conscious packaging, we're committed to protecting the planet that provides our precious ingredients.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-border flex items-center justify-center">
                  <span className="font-display text-2xl">03</span>
                </div>
                <h3 className="font-display text-xl font-medium mb-4">Individuality</h3>
                <p className="text-muted-foreground">
                  Our fragrances are for those who refuse to blend in. Each scent is designed to become a personal signature.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Story;
