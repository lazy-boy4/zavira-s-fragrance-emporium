import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="dark min-h-screen bg-midnight text-ivory flex items-center justify-center relative overflow-hidden">
      {/* Ghost numeral backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif-display italic text-[40vw] leading-none text-bronze/[0.04] select-none"
      >
        404
      </span>

      <div className="relative text-center px-6 animate-reveal">
        <p className="font-sans-luxury text-xs uppercase tracking-[0.35em] text-bronze mb-6">
          Égarée — Lost in the Atelier
        </p>
        <h1 className="font-serif-display italic text-8xl md:text-[9rem] leading-none mb-8">
          Quatre<span className="text-bronze"> · </span>Zéro<span className="text-bronze"> · </span>Quatre
        </h1>
        <p className="font-sans-luxury text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          The scent you are searching for has drifted beyond our shelves. Return to the atelier and let a new essence find you.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-3 border border-bronze/60 text-bronze px-8 py-4 font-sans-luxury text-xs uppercase tracking-[0.3em] hover:bg-bronze hover:text-midnight transition-colors duration-500"
        >
          Return to Home
          <span className="inline-block w-3 group-hover:w-6 h-px bg-current transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
