import { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { introSlides } from '../data/portfolioData';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';

const SLIDE_MS = 3800;

export default function PlayIntro({ onClose }: { onClose: () => void }) {
  useScrollLock(true);
  const reduced = useReducedMotionPref();
  const [phase, setPhase] = useState<'zoom' | 'reel' | 'end'>(reduced ? 'reel' : 'zoom');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (phase !== 'zoom') return;
    const t = window.setTimeout(() => setPhase('reel'), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= introSlides.length - 1) {
        setPhase('end');
        return i;
      }
      return i + 1;
    });
    progress.set(0);
  }, [progress]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
    progress.set(0);
  }, [progress]);

  // Clock driving progress bar and slide advancement
  useEffect(() => {
    if (phase !== 'reel' || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const v = progress.get() + (now - last) / SLIDE_MS;
      last = now;
      if (v >= 1) {
        next();
        return;
      }
      progress.set(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, paused, index, next, progress]);

  useEffect(() => {
    if (phase !== 'end') return;
    const t = window.setTimeout(onClose, 1800);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, next, prev]);

  const slide = introSlides[index];

  return (
    <motion.div
      className="fixed inset-0 z-[130] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6 }}
      role="dialog"
      aria-modal="true"
      aria-label="Intro highlight reel"
    >
      {/* Background Ambience */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,0,68,0.22),transparent_70%)]"
      />

      {/* Top Progress Segment Bars */}
      <div className="absolute inset-x-0 top-6 z-20 mx-auto flex max-w-xl gap-2 px-6">
        {introSlides.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full bg-crimson"
              style={{
                width: i < index ? '100%' : i === index ? `${progress.get() * 100}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Close & Navigation Helpers */}
      <div className="absolute right-6 top-12 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-mist hover:text-bone transition"
        >
          {paused ? '▶ RESUME' : '❚❚ PAUSE'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-xs font-semibold text-mist hover:text-bone transition"
        >
          ✕ CLOSE (ESC)
        </button>
      </div>

      {/* Slide Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          key={`kicker-${index}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-xs font-bold tracking-[0.34em] text-crimson-2"
        >
          {slide.kicker}
        </motion.p>

        <motion.h2
          key={`title-${index}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.88] text-bone"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          key={`sub-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm font-semibold tracking-widest text-mist"
        >
          {slide.sub}
        </motion.p>

        <motion.p
          key={`body-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-bone/90"
        >
          {slide.body}
        </motion.p>

        <div className="mt-8 rounded-full border border-crimson/50 bg-crimson/15 px-4 py-1.5 text-xs font-bold text-crimson-2">
          {slide.stat}
        </div>
      </div>

      {/* Screen Tap Zones for Left/Right Navigation */}
      <button
        type="button"
        onClick={prev}
        className="absolute inset-y-0 left-0 w-1/3 z-10 opacity-0 cursor-w-resize"
        aria-label="Previous slide"
      />
      <button
        type="button"
        onClick={next}
        className="absolute inset-y-0 right-0 w-1/3 z-10 opacity-0 cursor-e-resize"
        aria-label="Next slide"
      />
    </motion.div>
  );
}
