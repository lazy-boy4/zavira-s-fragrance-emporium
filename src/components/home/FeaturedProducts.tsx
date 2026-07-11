import { Link } from "react-router-dom";
import productPrimal from "@/assets/product-primal.jpg";
import productMidnight from "@/assets/product-midnight.jpg";
import productEssence from "@/assets/product-essence.jpg";
import { useReveal } from "@/hooks/useReveal";

type Band = {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  cta: string;
  slug: string;
  image: string;
  imageSide: "left" | "right";
};

const bands: Band[] = [
  {
    index: "01",
    eyebrow: "Collection I",
    title: "The Architecture",
    accent: "of Scent",
    body:
      "A testament to heritage. The raw intensity of oud tempered by the refined precision of European perfumery — sculpted, not sprayed.",
    cta: "Discover Primal",
    slug: "primal",
    image: productPrimal,
    imageSide: "left",
  },
  {
    index: "02",
    eyebrow: "The Process",
    title: "Midnight",
    accent: "Alchemy",
    body:
      "Rare botanicals harvested under the lunar cycle, aged 180 days in charred oak, distilled to a nectar that lingers on the skin like a whispered secret.",
    cta: "Discover Midnight Elixir",
    slug: "midnight-elixir",
    image: productMidnight,
    imageSide: "right",
  },
  {
    index: "03",
    eyebrow: "Signature III",
    title: "The Bloom",
    accent: "of Noir",
    body:
      "Damask rose crushed at dawn, folded into black amber and smoke. A composition that shifts across the hour, never twice the same.",
    cta: "Discover Rose Noir",
    slug: "rose-noir",
    image: productEssence,
    imageSide: "left",
  },
];

/**
 * FeaturedProducts — zigzag gallery of signature fragrances.
 * Alternating image/text bands, index numerals, cinematic reveal.
 */
export const FeaturedProducts = () => {
  return (
    <section className="relative bg-midnight text-ivory py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto text-center mb-24 md:mb-36">
        <span className="font-sans-luxury text-[10px] uppercase tracking-[0.5em] text-bronze-deep mb-6 block">
          The Collection
        </span>
        <h2 className="font-serif-display text-4xl md:text-6xl font-light text-ivory leading-tight">
          Signature <span className="italic text-bronze">Fragrances</span>
        </h2>
        <div className="mt-8 mx-auto h-px w-16 bg-bronze/60" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col space-y-32 md:space-y-56">
        {bands.map((b) => (
          <Band key={b.index} band={b} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto text-center mt-32 md:mt-40">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-4"
        >
          <span className="h-px w-10 bg-bronze-deep group-hover:w-16 group-hover:bg-bronze transition-all duration-500" />
          <span className="font-sans-luxury uppercase tracking-[0.4em] text-[11px] text-ivory/80 group-hover:text-bronze transition-colors">
            View the entire archive
          </span>
          <span className="h-px w-10 bg-bronze-deep group-hover:w-16 group-hover:bg-bronze transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
};

const Band = ({ band }: { band: Band }) => {
  const { ref, cls } = useReveal(0.2);
  const imageLeft = band.imageSide === "left";

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center ${cls}`}
    >
      {/* Image */}
      <div
        className={`md:col-span-7 relative group ${
          imageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <div className="relative aspect-[4/5] md:aspect-[4/5] overflow-hidden border border-bronze-deep/40 bg-midnight-surface">
          <img
            src={band.image}
            alt={`${band.title} ${band.accent}`}
            className="w-full h-full object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, transparent 50%, hsl(var(--midnight)/0.5) 100%)",
            }}
          />
        </div>
        {/* Corner rule */}
        <div
          className={`pointer-events-none absolute w-32 h-32 border-bronze/40 ${
            imageLeft
              ? "-top-6 -left-6 border-t border-l"
              : "-bottom-6 -right-6 border-b border-r"
          }`}
        />
        {/* Ghost numeral */}
        <div
          className={`pointer-events-none absolute select-none font-serif-display italic font-light leading-none text-ivory/[0.045] text-[160px] md:text-[220px] ${
            imageLeft ? "-bottom-8 -right-4" : "-bottom-8 -left-4"
          }`}
        >
          {band.index}
        </div>
      </div>

      {/* Content */}
      <div
        className={`md:col-span-5 ${
          imageLeft ? "md:order-2 md:pl-8" : "md:order-1 md:pr-8"
        }`}
      >
        <span className="font-sans-luxury text-[10px] uppercase tracking-[0.5em] text-bronze mb-6 block">
          {band.eyebrow}
        </span>
        <h3 className="font-serif-display text-5xl md:text-6xl font-light leading-[1.05] text-ivory mb-8">
          {band.title}
          <br />
          <span className="italic text-bronze">{band.accent}</span>
        </h3>
        <p className="font-sans-luxury text-base md:text-lg font-light leading-relaxed text-ivory/60 max-w-md mb-10">
          {band.body}
        </p>
        <Link
          to={`/product/${band.slug}`}
          className="group inline-flex items-center gap-4"
        >
          <span className="font-sans-luxury uppercase tracking-[0.3em] text-[11px] text-ivory group-hover:text-bronze transition-colors">
            {band.cta}
          </span>
          <span className="h-px w-10 bg-bronze group-hover:w-20 transition-all duration-500" />
        </Link>
      </div>
    </article>
  );
};
