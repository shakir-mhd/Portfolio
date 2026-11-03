import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotionPref } from '../hooks/useMedia';

const LABELS: Record<string, string> = {
  view: 'VIEW',
  play: '▶',
  link: '↗',
  drag: '↔',
  close: '✕',
};

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // High-performance snappy spring
  const sx = useSpring(x, { stiffness: 700, damping: 42, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 700, damping: 42, mass: 0.25 });
  const [mode, setMode] = useState<string | null>(null);
  const [hoverLink, setHoverLink] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>('[data-cursor]');
      setMode(tagged?.dataset.cursor ?? null);
      setHoverLink(!tagged && !!t?.closest('a, button, [role="button"], input, select, textarea, .interactive'));
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerenter', enter);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerenter', enter);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const label = mode ? LABELS[mode] : null;
  // Sleek, refined sizing:
  // - Default resting: 13px (delicate glass bead)
  // - Interactive link/button hover: 24px (subtle expansion, not oversized)
  // - Action label (VIEW, PLAY): 64px (clean badge)
  const size = label ? 64 : hoverLink ? 24 : 13;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        scale: down ? 0.8 : 1,
        // Liquid Glass styling: translucent refraction, specular border
        background: label
          ? 'linear-gradient(135deg, rgba(234, 0, 68, 0.7) 0%, rgba(122, 0, 34, 0.5) 100%)'
          : hoverLink
          ? 'rgba(234, 0, 68, 0.08)'
          : 'rgba(255, 255, 255, 0.15)',
        borderColor: label
          ? 'rgba(255, 255, 255, 0.7)'
          : hoverLink
          ? 'rgba(255, 255, 255, 0.65)'
          : 'rgba(255, 255, 255, 0.5)',
        borderWidth: hoverLink || label ? '1.5px' : '1px',
        boxShadow: label
          ? '0 0 25px rgba(234, 0, 68, 0.55), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
          : hoverLink
          ? '0 0 12px rgba(234, 0, 68, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.6)'
          : '0 0 8px rgba(234, 0, 68, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
    >
      {/* Tiny liquid lens center dot when resting */}
      {!label && !hoverLink && (
        <span className="h-1 w-1 rounded-full bg-crimson shadow-[0_0_4px_rgba(234,0,68,0.9)]" />
      )}

      {/* Mode Label (VIEW, PLAY, LINK) */}
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="font-sans text-[11px] font-bold tracking-[0.16em] text-white drop-shadow-sm select-none"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
