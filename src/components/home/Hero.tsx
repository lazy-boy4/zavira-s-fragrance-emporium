import { Link } from "react-router-dom";
import heroPerfume from "@/assets/hero-perfume.jpg";

/**
 * Hero — Artistic Gallery Motion direction.
 * Asymmetric 12-col composition: floating framed image left, staggered
 * italic display headline right, bronze accent details, cinematic reveal.
 */
export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full bg-midnight text-ivory overflow-hidden flex items-center pt-28 pb-24 px-6 md:px-12 lg:px-24">
      {/* Ambient bronze glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full opacity-[0.09] blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--bronze)) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--bronze)) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
        {/* Image plinth */}
        <div className="lg:col-span-6 relative order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="relative z-20 w-full max-w-md animate-float">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-bronze-deep/40 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <img
                src={heroPerfume}
                alt="Zavira Cinétique — luxury eau de parfum"
                className="w-full h-full object-cover animate-slow-drift"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, hsl(var(--midnight)/0.6) 0%, transparent 45%, hsl(var(--midnight)/0.5) 100%)",
                }}
              />
            </div>
            {/* Artistic framing */}
            <div className="pointer-events-none absolute -top-8 -left-8 w-32 h-32 border-t border-l border-bronze/50" />
            <div className="pointer-events-none absolute -bottom-10 -right-6 w-40 h-56 md:w-48 md:h-64 bg-midnight-surface/60 backdrop-blur-sm -z-10 border border-bronze-deep/20" />
          </div>

          {/* Side vertical label */}
          <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap">
            <span className="font-sans-luxury text-[10px] uppercase tracking-[1em] text-bronze-deep">
              Essence of Midnight
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-6 flex flex-col items-start lg:pl-20 order-1 lg:order-2">
          <span className="animate-reveal font-sans-luxury tracking-[0.5em] text-xs uppercase mb-6 text-bronze-deep block">
            Volume I — L'Atelier
          </span>

          <h1 className="animate-reveal delay-200 font-serif-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.9] mb-8 text-ivory">
            ZAVIRA
            <br />
            <span className="italic text-bronze font-light">Cinétique</span>
          </h1>

          <p className="animate-reveal delay-300 font-sans-luxury text-base md:text-lg font-light leading-relaxed text-ivory/60 max-w-md mb-12">
            A masterful blend of cedarwood, amber noir, and the subtle
            movement of light. Composed for the curated soul who finds beauty
            in the shadows.
          </p>

          <div className="animate-reveal delay-500 flex flex-col items-start w-full">
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="group relative inline-flex items-center overflow-hidden border border-bronze px-8 py-4 md:px-10 md:py-5 transition-colors duration-500"
              >
                <span className="relative z-10 font-sans-luxury uppercase tracking-[0.3em] text-[11px] text-ivory group-hover:text-midnight transition-colors duration-500">
                  Experience the scent
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 bg-bronze origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </Link>
              <Link
                to="/story"
                className="group inline-flex items-center gap-4 px-2 py-4"
              >
                <span className="font-sans-luxury uppercase tracking-[0.3em] text-[11px] text-ivory/70 group-hover:text-bronze transition-colors">
                  Our Story
                </span>
                <span className="h-px w-10 bg-bronze-deep group-hover:w-16 group-hover:bg-bronze transition-all duration-500" />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12 w-full max-w-sm opacity-70">
              <div>
                <span className="block font-sans-luxury text-[9px] uppercase tracking-widest text-bronze-deep mb-2">
                  Notes
                </span>
                <p className="font-serif-display text-sm italic text-ivory/80">
                  Oud · Saffron · Bergamot
                </p>
              </div>
              <div>
                <span className="block font-sans-luxury text-[9px] uppercase tracking-widest text-bronze-deep mb-2">
                  Vibe
                </span>
                <p className="font-serif-display text-sm italic text-ivory/80">
                  Obsidian · Smoke · Velvet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
