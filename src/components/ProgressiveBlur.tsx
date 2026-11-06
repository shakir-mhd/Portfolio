import React, { useState, useEffect } from 'react';

/**
 * 8-Layer Progressive Glass Blur Vignette
 * Extracted directly from Ruchit's Framer website (framer-x6qzta-container).
 * Creates a mathematically smooth, silky depth fade as content scrolls into the bottom edge of the screen.
 * Automatically fades to 0 opacity when reaching the end of the site so the giant M. SHAKIR footer mark is razor-sharp!
 */
export default function ProgressiveBlur() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When reaching near the end of the page (footer in view), fade out the blur
      // so it never covers M. SHAKIR!
      const nearBottom = scrollY + viewportHeight >= documentHeight - 140;
      setAtBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-40 overflow-hidden select-none transition-opacity duration-300"
      style={{ opacity: atBottom ? 0 : 1 }}
    >
      <div className="relative w-full h-full">
        {/* Layer 1: 0.05px blur (0% - 25%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_12.5%,black_25%,transparent_37.5%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12.5%,black_25%,transparent_37.5%)] backdrop-blur-[0.5px]"
          style={{ zIndex: 1 }}
        />
        {/* Layer 2: 0.15px blur (12.5% - 37.5%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_12.5%,black_25%,black_37.5%,transparent_50%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_12.5%,black_25%,black_37.5%,transparent_50%)] backdrop-blur-[1px]"
          style={{ zIndex: 2 }}
        />
        {/* Layer 3: 0.35px blur (25% - 50%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_25%,black_37.5%,black_50%,transparent_62.5%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_25%,black_37.5%,black_50%,transparent_62.5%)] backdrop-blur-[2px]"
          style={{ zIndex: 3 }}
        />
        {/* Layer 4: 0.75px blur (37.5% - 62.5%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_37.5%,black_50%,black_62.5%,transparent_75%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_37.5%,black_50%,black_62.5%,transparent_75%)] backdrop-blur-[4px]"
          style={{ zIndex: 4 }}
        />
        {/* Layer 5: 1.5px blur (50% - 75%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_50%,black_62.5%,black_75%,transparent_87.5%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_50%,black_62.5%,black_75%,transparent_87.5%)] backdrop-blur-[6px]"
          style={{ zIndex: 5 }}
        />
        {/* Layer 6: 3px blur (62.5% - 87.5%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_62.5%,black_75%,black_87.5%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_62.5%,black_75%,black_87.5%,transparent_100%)] backdrop-blur-[9px]"
          style={{ zIndex: 6 }}
        />
        {/* Layer 7: 6px blur (75% - 100%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_75%,black_87.5%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_75%,black_87.5%,black_100%)] backdrop-blur-[12px]"
          style={{ zIndex: 7 }}
        />
        {/* Layer 8: 12px blur (87.5% - 100%) */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_87.5%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_87.5%,black_100%)] backdrop-blur-[16px]"
          style={{ zIndex: 8 }}
        />
        {/* Subtle dark bottom fade to ground the viewport */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07070a]/90 via-[#07070a]/35 to-transparent"
          style={{ zIndex: 9 }}
        />
      </div>
    </div>
  );
}
