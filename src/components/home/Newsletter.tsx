import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useReveal } from "@/hooks/useReveal";

/**
 * Newsletter — dark surface panel with hairline bronze frame and
 * underline-only email input matching the gallery aesthetic.
 */
export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { ref, cls } = useReveal(0.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "Welcome to Zavira",
      description:
        "You are now part of the inner circle. Watch your inbox for the next dispatch.",
    });
    setEmail("");
  };

  return (
    <section className="relative bg-midnight text-ivory py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div
        ref={ref}
        className={`relative max-w-3xl mx-auto ${cls}`}
      >
        {/* Bronze frame */}
        <div className="relative border border-bronze-deep/50 bg-midnight-surface/50 px-8 py-16 md:px-16 md:py-20">
          <div className="pointer-events-none absolute -top-3 -left-3 w-20 h-20 border-t border-l border-bronze/60" />
          <div className="pointer-events-none absolute -bottom-3 -right-3 w-20 h-20 border-b border-r border-bronze/60" />

          <div className="text-center">
            <span className="font-sans-luxury text-[10px] uppercase tracking-[0.5em] text-bronze mb-6 block">
              Correspondence
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl font-light leading-tight text-ivory mb-6">
              Join the <span className="italic text-bronze">Inner Circle</span>
            </h2>
            <p className="font-sans-luxury text-base font-light text-ivory/60 max-w-md mx-auto mb-12">
              Private dispatches on new compositions, atelier notes, and
              invitations to intimate scent salons.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-6 sm:gap-0 max-w-md mx-auto items-stretch"
            >
              <input
                type="email"
                required
                placeholder="your@email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-0 border-b border-bronze-deep focus:border-bronze focus:outline-none px-2 py-3 font-sans-luxury text-ivory placeholder:text-ivory/30 text-sm tracking-wide"
              />
              <button
                type="submit"
                className="group relative sm:ml-4 overflow-hidden border border-bronze px-8 py-3 transition-colors duration-500"
              >
                <span className="relative z-10 font-sans-luxury uppercase tracking-[0.3em] text-[11px] text-ivory group-hover:text-midnight transition-colors duration-500">
                  Subscribe
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 bg-bronze origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </button>
            </form>

            <p className="text-[10px] uppercase tracking-[0.3em] text-bronze-deep mt-10">
              Unsubscribe at any time · No perfume left behind
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
