import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to Zavira",
        description: "Thank you for subscribing. You'll be the first to know about our exclusive launches.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-6">
            Join the Inner Circle
          </h2>
          <p className="text-background/70 mb-10">
            Be the first to discover new fragrances, exclusive offers, and behind-the-scenes access to the world of Zavira.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background h-14 text-center sm:text-left"
              required
            />
            <Button
              type="submit"
              className="bg-background text-foreground hover:bg-background/90 h-14 px-8"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-background/50 mt-6">
            By subscribing, you agree to receive marketing emails from Zavira. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
