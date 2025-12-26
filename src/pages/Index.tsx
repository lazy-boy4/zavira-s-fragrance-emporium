import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
