import { useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { personalInfo, featuredProjects, socialLinks, type ProfileId } from '../data/portfolioData';
import { useFinePointer } from '../hooks/useMedia';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE } },
};

export default function Hero({
  onPlay,
  onResume,
  profileId,
}: {
  onPlay: () => void;
  onResume: () => void;
  profileId: ProfileId;
}) {
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const { scrollTo } = useSmoothScroll();
  const [isBookHovered, setIsBookHovered] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Smooth throttled pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 25, mass: 0.2 });
  const py = useSpring(my, { stiffness: 90, damping: 25, mass: 0.2 });
  const imgRotY = useTransform(px, [-1, 1], [-3, 3]);
  const imgRotX = useTransform(py, [-1, 1], [2.5, -2.5]);
  const imgShiftX = useTransform(px, [-1, 1], [-8, 8]);
  const chipX = useTransform(px, [-1, 1], [10, -10]);
  const chipY = useTransform(py, [-1, 1], [8, -8]);
  const glowX = useTransform(px, [-1, 1], ['-3%', '3%']);

  const meta = [
    '2023 – Present',
    'BSc Cloud Computing',
    `${featuredProjects.length} Featured Projects`,
    'NVQ Level 4 Grounding',
  ];

  const floating = [
    { text: 'BSc Cloud Computing', sub: 'SLTC Research University', pos: 'left-[2%] top-[30%]', depth: 1, floatClass: 'chip-float-1' },
    { text: 'NVQ Level 4 Grounding', sub: 'VTA Padukka Software Dev', pos: 'right-[0%] top-[18%]', depth: -1, floatClass: 'chip-float-2' },
    { text: 'AWS • React • MySQL', sub: 'Core Production Stack', pos: 'right-[4%] bottom-[22%]', depth: 0.6, floatClass: 'chip-float-3' },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden flex flex-col justify-end lg:justify-center"
      onPointerMove={(e) => {
        if (!fine) return;
        requestAnimationFrame(() => {
          mx.set((e.clientX / window.innerWidth) * 2 - 1);
          my.set((e.clientY / window.innerHeight) * 2 - 1);
        });
      }}
    >
      {/* Dynamic Crimson Ambient Atmosphere */}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ x: glowX }}>
        <div className="absolute right-[-10%] top-[-10%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(234,0,68,0.32),rgba(234,0,68,0.06)_55%,transparent)] blur-3xl lg:right-[-4%] lg:w-[60vw]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,240,255,0.1),transparent)] blur-3xl" />
      </motion.div>

      <Particles className="z-[1] pointer-events-none" color="234,0,68" />

      {/* ========================================================= */}
      {/* RIGHT SIDE / BACKGROUND: Portrait Avatar with Glow Halo   */}
      {/* ========================================================= */}
      <motion.div
        className="absolute inset-x-0 top-16 z-[2] flex h-[62svh] items-end justify-center sm:h-[68svh] lg:bottom-0 lg:left-auto lg:right-[2vw] lg:top-16 lg:h-auto lg:w-[54vw] xl:right-[5vw] xl:w-[48vw] pointer-events-none"
        style={{ y: imgY, scale: imgScale, opacity: fade }}
      >
        <motion.div
          className="relative h-full w-full lg:h-[86vh] will-change-transform"
          style={{ rotateY: imgRotY, rotateX: imgRotX, x: imgShiftX, transformPerspective: 1200 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        >
          {/* Crimson Rim Light Ring matching reference */}
          <div
            aria-hidden
            className="absolute bottom-[10%] left-1/2 h-[76%] w-[76%] -translate-x-1/2 rounded-full border border-crimson/25 shadow-[0_0_120px_rgba(234,0,68,0.38),inset_0_0_80px_rgba(234,0,68,0.2)] pointer-events-none"
          />

          {/* Shakir's Avatar: Bright, high-contrast, with smooth bottom mask gradient eliminating the harsh cut */}
          <img
            src="/assets/shakir-avatar.png"
            alt="Mohomed Shakir Portrait"
            className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] drop-shadow-[0_0_40px_rgba(234,0,68,0.25)] filter brightness-[1.12] contrast-[1.05] [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)] pointer-events-none"
          />

          {/* Subtle rim backlight gradient on shoulders */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_35%,rgba(255,42,109,0.18),transparent_70%)] mix-blend-screen"
          />

          {/* Floating UI Chips: GPU hardware-accelerated for 120fps silky smoothness */}
          {floating.map((f, i) => {
            const x = useTransform(chipX, (n: number) => n * f.depth);
            const y = useTransform(chipY, (n: number) => n * f.depth);
            return (
              <motion.div
                key={f.text}
                className={`absolute hidden rounded-2xl px-4 py-2.5 shadow-2xl md:block ${f.pos} bg-[#131318]/94 border border-white/20 will-change-transform z-10`}
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.15, ease: EASE }}
              >
                <div className={f.floatClass}>
                  <p className="text-xs font-bold text-bone tracking-tight">{f.text}</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-mist">{f.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Readability Gradients ensuring crisp text contrast */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-[38svh] z-[3] h-[36svh] bg-gradient-to-b from-transparent via-ink/80 to-ink lg:hidden pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[3] hidden bg-[linear-gradient(90deg,var(--color-ink)_0%,rgba(7,7,10,0.88)_32%,rgba(7,7,10,0.4)_58%,transparent_80%)] lg:block pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[3] h-44 bg-gradient-to-t from-ink via-ink/60 to-transparent pointer-events-none"
      />

      {/* ========================================================= */}
      {/* LEFT SIDE: Netflix Billboard Editorial Content & CTA      */}
      {/* ========================================================= */}
      <motion.div
        className="gutter relative z-[4] flex min-h-[100svh] flex-col justify-end pb-16 pt-[52svh] sm:pb-20 lg:max-w-[55vw] lg:justify-center lg:pb-0 lg:pt-24"
        style={{ y: textY, opacity: fade }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Professional Status & Availability Tag */}
        <motion.div variants={item} className="mb-3 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-medium text-bone backdrop-blur-md shadow-sm">
            <span className="status-dot" />
            <span>{personalInfo.statusText}</span>
          </span>
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-mist uppercase tracking-widest">
            Sri Lanka • Open for Opportunities
          </span>
        </motion.div>

        {/* Hero Title: SHAKIR */}
        <motion.h1
          variants={item}
          className="font-hero font-black leading-[0.85] tracking-[-0.03em] text-bone uppercase select-none"
          style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}
        >
          <span className="shimmer-text">SHAKIR</span>
        </motion.h1>

        {/* Subtitle: Role Title in Vivid Crimson */}
        <motion.p
          variants={item}
          className="mt-2 font-mono text-xs sm:text-sm font-bold tracking-[0.3em] text-crimson-2 uppercase"
        >
          {personalInfo.role}
        </motion.p>

        {/* Billboard Meta Tags */}
        <motion.div
          variants={item}
          className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] sm:text-[13px] font-medium text-mist"
        >
          <span className="rounded bg-crimson/20 border border-crimson/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-crimson-2">
            CLOUD • FULL-STACK
          </span>
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-smoke" />}
              <span>{m}</span>
            </span>
          ))}
        </motion.div>

        {/* Role Tagline */}
        <motion.p
          variants={item}
          className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/90 sm:text-xs sm:tracking-[0.28em]"
        >
          {personalInfo.tagline.join(' • ')}
        </motion.p>

        {/* Narrative Bio */}
        <motion.p
          variants={item}
          className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-neutral-300 font-normal"
        >
          {personalInfo.aboutHeadline}{' '}
          <span className="text-white/80">
            Bridging high-performance front-end experiences with resilient, scalable cloud infrastructure.
          </span>
        </motion.p>

        {/* Action Buttons Row */}
        <motion.div
          variants={item}
          className="mt-7 flex flex-wrap items-center gap-3.5"
        >
          {/* Play Intro Reel */}
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onPlay}
              className="flex min-h-12 items-center gap-2.5 rounded-full bg-bone px-7 text-sm font-bold tracking-wide text-ink shadow-[0_0_30px_rgba(234,0,68,0.35)] transition hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-base text-crimson">▶</span>
              <span>QUICK INTRO</span>
            </button>
          </Magnetic>

          {/* View Resume */}
          <Magnetic>
            <button
              type="button"
              data-cursor="view"
              onClick={onResume}
              className="glass flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold text-bone hover:bg-white/15 transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>VIEW RESUME</span>
            </button>
          </Magnetic>

          {/* Book a Call with expandable portrait bubble */}
          <Magnetic>
            <a
              href={socialLinks.cal}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              onMouseEnter={() => setIsBookHovered(true)}
              onMouseLeave={() => setIsBookHovered(false)}
              className="flex min-h-12 items-center gap-2.5 rounded-full border border-crimson/60 bg-crimson/20 px-6 text-sm font-semibold text-bone hover:bg-crimson hover:text-white transition shadow-lg shadow-crimson/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <AnimatePresence>
                {isBookHovered && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, scale: 0.8 }}
                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                    exit={{ opacity: 0, width: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 overflow-hidden"
                  >
                    <img
                      src="/assets/shakir-portrait.png"
                      alt="Shakir"
                      className="w-5 h-5 rounded-full object-cover border border-white"
                    />
                    <span className="text-xs font-bold text-white/90">+</span>
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                      You
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span>Book a Call ↗</span>
            </a>
          </Magnetic>

          {/* Explore Services Link */}
          <button
            type="button"
            onClick={() => scrollTo('#services')}
            aria-label="Explore Services"
            className="flex h-12 items-center gap-1 px-4 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:border-white/50 transition hover:bg-white/5"
          >
            <span>SERVICES</span>
            <span className="text-xs">↓</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
