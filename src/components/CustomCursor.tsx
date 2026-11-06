import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotionPref } from '../hooks/useMedia';

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Responsive spring with optimal responsiveness
  const sx = useSpring(x, { stiffness: 650, damping: 48, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 650, damping: 48, mass: 0.6 });
  const [hoverLink, setHoverLink] = useState(false);
  const [isOverCrimson, setIsOverCrimson] = useState(false);
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
      const isInteractive = !!t?.closest(
        'a, button, [role="button"], input, select, textarea, .interactive, .cursor-pointer, [data-cursor]'
      );
      setHoverLink(isInteractive);

      // Detect if cursor is hovering over a crimson / red element for adaptive contrast
      const crimsonEl = t?.closest(
        '.bg-crimson, [class*="bg-[#ea0044]"], [class*="bg-crimson"], [style*="#ea0044"], [style*="rgb(234, 0, 68)"]'
      );
      setIsOverCrimson(!!crimsonEl);
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

  // Refined proportional dimensions:
  // - Interactive (hovering links, buttons, cards): 24px delicate translucent ring
  // - Normal resting: 8px solid crimson precision dot with white rim
  const size = hoverLink ? 26 : 8;

  const bgColor = hoverLink
    ? isOverCrimson
      ? 'rgba(255, 255, 255, 0.15)'
      : 'rgba(234, 0, 68, 0.12)'
    : isOverCrimson
    ? '#ffffff'
    : '#ea0044';

  const borderColor = isOverCrimson
    ? 'rgba(0, 0, 0, 0.6)'
    : hoverLink
    ? 'rgba(255, 255, 255, 0.85)'
    : 'rgba(255, 255, 255, 0.9)';

  const boxShadow = isOverCrimson
    ? '0 0 10px rgba(255, 255, 255, 0.9), 0 0 2px #ffffff'
    : hoverLink
    ? '0 0 14px rgba(234, 0, 68, 0.5), 0 0 2px rgba(255, 255, 255, 0.5)'
    : '0 0 10px rgba(234, 0, 68, 0.9), 0 0 3px #ea0044';

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full will-change-transform"
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
        scale: down ? 0.75 : 1,
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: boxShadow,
      }}
      transition={{ type: 'spring', stiffness: 650, damping: 42 }}
    />
  );
}
