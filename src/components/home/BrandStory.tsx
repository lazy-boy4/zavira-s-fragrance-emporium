import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

/**
 * BrandStory — centered manifesto pull-quote.
 * Thin bronze gradient rule, italic serif quote, small-caps signature.
 */
export const BrandStory = () => {
  const { ref, cls } = useReveal(0.25);

  return (
    <section className="relative bg-midnight text-ivory py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      {/* Ambient light leak */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-[0.08] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--bronze)) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className={`relative max-w-4xl mx-auto text-center flex flex-col items-center ${cls}`}
      >
        <div className="w-px h-24 bg-gradient-to-b from-bronze to-transparent mb-12" />

        <span className="font-sans-luxury text-[10px] uppercase tracking-[0.5em] text-bronze-deep mb-10 block">
          The Zavira Manifesto
        </span>

        <blockquote className="font-serif-display text-3xl md:text-5xl lg:text-6xl font-light italic leading-[1.2] text-ivory max-w-3xl">
          "Fragrance is a silent poem — a memory captured in a vessel of glass,
          waiting for skin to give it a voice."
        </blockquote>

        <div className="mt-14 flex items-center justify-center gap-6">
          <div className="h-px w-10 bg-bronze-deep" />
          <span className="font-sans-luxury uppercase text-[10px] tracking-[0.4em] text-bronze">
            Grasse · Dhaka · Paris
          </span>
          <div className="h-px w-10 bg-bronze-deep" />
        </div>

        <Link
          to="/story"
          className="group mt-14 inline-flex items-center gap-4"
        >
          <span className="font-sans-luxury uppercase tracking-[0.3em] text-[11px] text-ivory/80 group-hover:text-bronze transition-colors">
            Read the full manifesto
          </span>
          <span className="h-px w-10 bg-bronze-deep group-hover:w-20 group-hover:bg-bronze transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
};
