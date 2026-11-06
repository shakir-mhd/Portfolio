import React, { useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import shakir3dHead from '../assets/shakir-3d-head.png';
import shakirNavHeadshot from '../assets/shakir-nav-headshot.png';
import { personalInfo, socialLinks, partnerLogos } from '../data/portfolioData';

export function Hero({
  onPlay,
  onResume,
}: {
  onPlay?: () => void;
  onResume?: () => void;
}) {
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Mouse normalized position (-1 to 1) for 3D cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax Floating physics extracted directly from reference:
  // overdamped: zero elastic bounce, silky smooth glide
  const springConfig = { stiffness: 771.5, damping: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax translation (toward cursor by distance: 35px, 100% rigid translation matching Ruchit)
  const translateX = useTransform(smoothX, [-1, 1], [-35, 35]);
  const translateY = useTransform(smoothY, [-1, 1], [-35, 35]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };

    const handlePointerLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[660px] max-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#07070a] pt-20 sm:pt-24 pb-2 sm:pb-3"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Background Crimson Glow */}
      <div
        aria-hidden="true"
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[min(95vw,1200px)] h-[580px] pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(234, 0, 68, 0.22) 0%, rgba(234, 0, 68, 0.04) 50%, transparent 75%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Main Hero Stage - Wide Container matching Ruchit reference billboard */}
      <div className="relative z-[2] w-full max-w-[1380px] mx-auto px-4 sm:px-8 xl:px-12 flex-1 flex flex-col justify-center min-h-0">
        {/* Unified Typography Block with Centerpiece 3D Avatar Overlap */}
        <div className="relative text-center mx-auto select-none w-full" style={{ perspective: 1000 }}>
          {/* Two-Line Headline: Enormous, Tight, Bold Space Grotesk matching THINK CREATIVELY */}
          <div
            className="relative z-[1] flex flex-col items-center justify-center leading-[0.78] select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Line 1: BUILD (Pure crisp white, bold Space Grotesk matching THINK) */}
            <span
              className="block text-[#f7f7f7] uppercase select-none tracking-[-0.04em]"
              style={{
                fontSize: 'clamp(95px, 17vw, 250px)',
                fontWeight: 800,
                lineHeight: 0.78,
              }}
            >
              BUILD
            </span>

            {/* Line 2: SYSTEMS (Directly under Line 1, zero gap, matching CREATIVELY) */}
            <span
              className="block text-crimson uppercase select-none tracking-[-0.035em]"
              style={{
                fontSize: 'clamp(80px, 14.5vw, 215px)',
                fontWeight: 800,
                lineHeight: 0.78,
              }}
            >
              SYSTEMS
            </span>
          </div>

          {/* Shakir's Custom 3D Avatar Head:
              - Sized to clamp(340px, 33vw, 470px) matching Ruchit's massive central centerpiece presence
              - Positioned safely below the navbar with clearance, perfectly overlapping BUILD & SYSTEMS */}
          <div
            className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-[44%] z-[10] flex items-center justify-center pointer-events-auto select-none"
            style={{
              width: 'clamp(340px, 33vw, 470px)',
              height: 'clamp(340px, 33vw, 470px)',
            }}
          >
            <motion.div
              drag
              dragMomentum={false}
              dragSnapToOrigin={true}
              dragTransition={{
                bounceDamping: 30,
                bounceStiffness: 400,
              }}
              whileTap={{ cursor: 'grabbing' }}
              style={{
                x: translateX,
                y: translateY,
              }}
              className="cursor-grab active:cursor-grabbing touch-none select-none relative w-full h-full flex items-center justify-center"
            >
              <img
                src={shakir3dHead}
                alt="Mohomed Shakir 3D Avatar Head"
                draggable={false}
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)] drop-shadow-[0_0_60px_rgba(234,0,68,0.35)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Flanking Row: Aligned Exactly Beside Avatar at the Baseline of SYSTEMS (z-20) */}
        <div className="hero-flanking-row flex flex-row items-end justify-between w-full max-w-[1380px] mx-auto mt-5 sm:mt-7 relative z-[20] gap-6">
          {/* Left: Bio narrative (Matching reference text styling, positioning & weight) */}
          <div className="max-w-[320px] sm:max-w-[420px] text-left">
            <p
              className="text-xs sm:text-[14.5px] leading-[1.5] text-[#b8b8b8] font-normal"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {personalInfo.heroSubtitle}
            </p>
          </div>

          {/* Right: "Book a call with me" Button with Animated [ Me + You ] Hover Interaction */}
          <div className="shrink-0">
            <motion.a
              href={socialLinks.cal}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              className="group relative inline-flex items-center gap-2 rounded-full bg-crimson px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-[14px] font-semibold text-white shadow-[0_6px_25px_rgba(234,0,68,0.55)] hover:bg-[#ff1a53] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap overflow-hidden select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Me + You Interaction on Hover matching Reference Image 6:
                  Both pure CSS transition (group-hover) and React state for 100% resilience */}
              <span
                className={`inline-flex items-center gap-1.5 overflow-hidden transition-all duration-300 ease-out shrink-0 ${
                  isCtaHovered ? 'max-w-[120px] opacity-100 mr-1.5' : 'max-w-0 opacity-0 mr-0'
                } group-hover:max-w-[120px] group-hover:opacity-100 group-hover:mr-1.5`}
              >
                {/* Shakir Circle Photo */}
                <span className="w-[24px] h-[24px] rounded-full overflow-hidden border border-white/80 shrink-0 bg-black block shadow-sm">
                  <img
                    src={shakirNavHeadshot}
                    alt="Shakir"
                    className="w-full h-full object-cover"
                  />
                </span>
                {/* Plus Symbol */}
                <span className="text-[12px] font-bold text-white/80 shrink-0">+</span>
                {/* "You" Pill */}
                <span className="bg-white text-black font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm leading-none shrink-0">
                  You
                </span>
              </span>

              <span>Book a call with me</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Logo Marquee with Faded Mask Edges (Flush at bottom edge) */}
      <div className="w-full shrink-0 overflow-hidden py-2 sm:py-2.5 border-t border-white/[0.08] bg-white/[0.012] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee">
          {[...partnerLogos, ...partnerLogos].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-6 whitespace-nowrap"
            >
              <span className="text-neutral-300 text-xs sm:text-[13px] font-medium tracking-wide">
                {item.name}
              </span>
              <span className="text-[9px] text-crimson font-mono bg-crimson/10 px-1.5 py-0.5 rounded tracking-wide">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
