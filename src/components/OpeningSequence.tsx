import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, Magnetic } from './fx';

const TIMELINE = [
  { at: 300, beat: 1 },  // Introduction Card
  { at: 1800, beat: 2 }, // Name
  { at: 2600, beat: 3 }, // Role Tag
  { at: 3300, beat: 4 }, // 3D Avatar Reveal
  { at: 4200, beat: 5 }, // Role Tagline
  { at: 4900, beat: 6 }, // Enter Button
];

export default function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotionPref();
  const [beat, setBeat] = useState(reduced ? 6 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = TIMELINE.map(({ at, beat }) => window.setTimeout(() => setBeat(beat), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') onDone();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.9, ease: EASE }}
      role="dialog"
      aria-label="Opening titles"
    >
      {/* Cinematic Letterbox Bars */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[7vh] bg-black"
        initial={{ y: 0 }}
        animate={{ y: beat >= 6 ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* Crimson Projector Atmosphere */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(60% 50% at 50% 55%, rgba(234,0,68,0.24), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? [0, 0.9, 0.5, 1] : 0 }}
        transition={{ duration: 1.4 }}
      />

      {/* Studio Card */}
      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            key="studio"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="font-sans text-xs font-semibold uppercase text-mist sm:text-sm"
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.55em', opacity: 1 }}
              transition={{ duration: 1.5, ease: EASE }}
            >
              {personalInfo.originalLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Floating Avatar Reveal */}
      <motion.div
        className="absolute inset-x-0 bottom-12 z-0 mx-auto flex h-[58vh] max-w-[500px] items-center justify-center"
        initial={{ opacity: 0, scale: 1.15, filter: 'blur(20px) brightness(0.2)' }}
        animate={beat >= 4 ? { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' } : {}}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <img
          src="/assets/shakir-avatar.png"
          alt="Mohomed Shakir 3D Avatar"
          className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] drop-shadow-[0_0_60px_rgba(234,0,68,0.4)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(70%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,0.85)_100%)]"
      />

      {/* Title */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="font-display leading-[0.82] text-bone drop-shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          style={{ fontSize: 'clamp(4.6rem, 19vw, 14rem)' }}
          initial={{ opacity: 0, scale: 1.3, filter: 'blur(20px)', letterSpacing: '0.4em' }}
          animate={beat >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '0.04em', y: beat >= 4 ? '-28vh' : 0 } : {}}
          transition={{ duration: 1.3, ease: EASE }}
        >
          {personalInfo.firstName}
        </motion.h1>
        <motion.p
          className="font-mono text-xs sm:text-sm font-bold text-crimson-2 [text-shadow:0_2px_20px_rgba(0,0,0,0.9)] uppercase tracking-[0.3em]"
          initial={{ opacity: 0, y: 10 }}
          animate={beat >= 3 ? { opacity: 1, y: beat >= 4 ? '-28vh' : 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {personalInfo.seriesTag}
        </motion.p>
      </div>

      {/* Role + Play Button */}
      <div className="absolute inset-x-0 bottom-[9vh] z-20 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-bone/90 sm:text-sm sm:tracking-[0.35em]"
          initial={{ opacity: 0, y: 14 }}
          animate={beat >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {personalInfo.tagline.join('  •  ')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={beat >= 6 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="play"
              onClick={onDone}
              tabIndex={beat >= 6 ? 0 : -1}
              className="group flex items-center gap-3 rounded-full bg-bone px-9 py-4 font-sans text-base font-bold tracking-wide text-ink shadow-[0_0_60px_rgba(234,0,68,0.5)] transition hover:bg-white"
            >
              <span className="text-lg transition-transform group-hover:scale-125">▶</span> ENTER PORTFOLIO
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={onDone}
        className="absolute right-4 top-[calc(7vh+14px)] z-40 rounded-full border border-white/20 px-4 py-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-mist transition hover:border-white/60 hover:text-bone"
      >
        SKIP INTRO
      </button>
    </motion.div>
  );
}
