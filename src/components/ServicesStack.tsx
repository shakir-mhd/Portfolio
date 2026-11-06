import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Cloud, Code2, Database, Layers } from 'lucide-react';
import {
  siDocker,
  siReact,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siMysql,
  siLinux,
  siGit,
  siFigma,
  siFramer,
  siNotion,
} from 'simple-icons';
import { servicesData, type ServiceStackItem } from '../data/portfolioData';

interface ToolItem {
  name: string;
  renderIcon: () => React.ReactNode;
}

// All 16 genuine tools in exact 2-row x 8-column layout matching reference Image 2
const ALL_TOOLS: ToolItem[] = [
  // Row 1 (8 tools)
  {
    name: 'Photoshop',
    renderIcon: () => (
      <span className="font-sans text-[13px] font-black tracking-tight text-neutral-100 group-hover:text-white">
        Ps
      </span>
    ),
  },
  {
    name: 'Illustrator',
    renderIcon: () => (
      <span className="font-sans text-[13px] font-black tracking-tight text-neutral-100 group-hover:text-white">
        Ai
      </span>
    ),
  },
  {
    name: 'Framer',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siFramer.path} />
      </svg>
    ),
  },
  {
    name: 'Figma',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siFigma.path} />
      </svg>
    ),
  },
  {
    name: 'ChatGPT',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="currentColor">
        <path d="M22.28 9.37a5.98 5.98 0 0 0-.52-4.94 6.07 6.07 0 0 0-6.49-2.92 5.99 5.99 0 0 0-4.66-2.31 6.06 6.06 0 0 0-5.8 4.21 6.01 6.01 0 0 0-4.23 3.06 6.08 6.08 0 0 0 .69 7.07 5.98 5.98 0 0 0 .52 4.94 6.07 6.07 0 0 0 6.49 2.92 5.99 5.99 0 0 0 4.66 2.31 6.06 6.06 0 0 0 5.8-4.21 6.01 6.01 0 0 0 4.23-3.06 6.08 6.08 0 0 0-.69-7.07zm-8.88 11.23a4.54 4.54 0 0 1-3.08-1.2l.14-.08 5.1-2.94a.78.78 0 0 0 .39-.68v-7.2l2.16 1.25a.08.08 0 0 1 .04.07v6.24a4.56 4.56 0 0 1-4.75 4.54zm-8.22-3.86a4.5 4.5 0 0 1-.58-3.25l.14.09 5.1 2.95a.79.79 0 0 0 .78 0l6.23-3.6v2.5a.08.08 0 0 1-.04.07l-5.4 3.12a4.55 4.55 0 0 1-6.23-1.88zm-1.8-9.08a4.53 4.53 0 0 1 2.5-2.06v6.08a.77.77 0 0 0 .39.67l6.24 3.6-2.16 1.25a.08.08 0 0 1-.08 0l-5.41-3.12a4.56 4.56 0 0 1-1.48-6.42zm14.65 2.58l-5.1-2.95a.79.79 0 0 0-.78 0l-6.23 3.6v-2.5a.08.08 0 0 1 .04-.07l5.4-3.12a4.56 4.56 0 0 1 6.67 5.04zm2.38 5.83a4.53 4.53 0 0 1-2.5 2.06v-6.08a.77.77 0 0 0-.39-.67l-6.24-3.6 2.16-1.25a.08.08 0 0 1 .08 0l5.41 3.12a4.56 4.56 0 0 1 1.48 6.42zM8.36 13.5l2.64-1.52 2.64 1.52v3.05l-2.64 1.53-2.64-1.53z" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v4.08l2.89-2.89a1.5 1.5 0 1 1 2.12 2.12L15.62 9.7h4.08a1.5 1.5 0 0 1 0 3h-4.08l2.89 2.89a1.5 1.5 0 1 1-2.12 2.12L13.5 14.82v4.08a1.5 1.5 0 0 1-3 0v-4.08l-2.89 2.89a1.5 1.5 0 1 1-2.12-2.12l2.89-2.89H4.3a1.5 1.5 0 0 1 0-3h4.08L5.49 6.81a1.5 1.5 0 0 1 2.12-2.12L10.5 7.58V3.5A1.5 1.5 0 0 1 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siNotion.path} />
      </svg>
    ),
  },
  {
    name: 'AWS',
    renderIcon: () => (
      <svg viewBox="0 0 304 182" className="w-[26px] h-[16px]" fill="currentColor">
        <path d="M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2 c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8 c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8 c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4 c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1 c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6 c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7 c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6 C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4 c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1 h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5 c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1 c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8 c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3 c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5 c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1 c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.7,0.4c2.3,0.3,4.4,0.7,6.5,1.1 c2,0.5,3.9,1,5.7,1.6c1.8,0.6,3.2,1.2,4.2,1.8c1.4,0.8,2.4,1.6,3,2.5c0.6,0.8,0.9,1.9,0.9,3.3v4.7c0,2.1-0.8,3.2-2.3,3.2 c-0.8,0-2.1-0.4-3.8-1.2c-5.7-2.6-12.1-3.9-19.2-3.9c-5.7,0-10.2,0.9-13.3,2.8c-3.1,1.9-4.7,4.8-4.7,8.9c0,2.8,1,5.2,3,7.1 c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6 c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.8,4.3-11.1,5.6C264.4,94.4,259.7,95.1,254.6,95.1z" />
        <path d="M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7c-3.1-2.8-0.3-6.6,3.4-4.4 c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z" />
        <path d="M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5c18.8-13.2,49.7-9.4,53.3-5 c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z" />
      </svg>
    ),
  },

  // Row 2 (8 tools)
  {
    name: 'Docker',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="currentColor">
        <path d={siDocker.path} />
      </svg>
    ),
  },
  {
    name: 'React',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="currentColor">
        <path d={siReact.path} />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siNextdotjs.path} />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siTypescript.path} />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siNodedotjs.path} />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[20px] h-[20px]" fill="currentColor">
        <path d={siMysql.path} />
      </svg>
    ),
  },
  {
    name: 'Git',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siGit.path} />
      </svg>
    ),
  },
  {
    name: 'Linux',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
        <path d={siLinux.path} />
      </svg>
    ),
  },
];

const ICONS = {
  Cloud: <Cloud size={26} strokeWidth={2.2} />,
  Code2: <Code2 size={26} strokeWidth={2.2} />,
  Database: <Database size={26} strokeWidth={2.2} />,
  Layers: <Layers size={26} strokeWidth={2.2} />,
};

/**
 * Deck Card with Framer Motion scroll-driven spring tilt physics
 * - Exact tilt angles: [0deg, -30deg, 20deg, -20deg]
 * - Docks cleanly inside the Services section without cutting text
 * - Pinned inside the section, completely exiting when Projects starts
 */
function StackedCard({
  service,
  index,
  progress,
}: {
  service: ServiceStackItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const isCrimson = service.highlight;

  let y: MotionValue<number> | number = 0;
  let rotate: MotionValue<number> | number = 0;
  let scale: MotionValue<number> | number = 1;
  let opacity: MotionValue<number> | number = 1;

  if (index === 0) {
    // Card 0 (Base Dark Card): Sits docked at y=0, recedes slightly back as Card 1 stacks on it
    y = useTransform(progress, [0, 0.22, 0.40], [0, 0, -8]);
    scale = useTransform(progress, [0, 0.22, 0.40], [1, 1, 0.96]);
    rotate = 0;
    opacity = useTransform(progress, [0, 0.28, 0.42], [1, 1, 0.3]);
  } else if (index === 1) {
    // Card 1 (Crimson): Slides up tilted at -30deg between 0.18 and 0.38, straightens and docks cleanly on Card 0
    y = useTransform(progress, [0, 0.18, 0.38, 0.52, 0.70], [450, 450, 0, 0, -8]);
    rotate = useTransform(progress, [0, 0.18, 0.38], [-30, -30, 0]);
    scale = useTransform(progress, [0, 0.38, 0.52, 0.70], [1, 1, 1, 0.96]);
    opacity = useTransform(progress, [0, 0.16, 0.22, 0.58, 0.72], [0, 0, 1, 1, 0.3]);
  } else if (index === 2) {
    // Card 2 (Dark): Slides up tilted at +20deg between 0.48 and 0.68, straightens and docks on Card 1
    y = useTransform(progress, [0, 0.48, 0.68, 0.78, 0.94], [450, 450, 0, 0, -8]);
    rotate = useTransform(progress, [0, 0.48, 0.68], [20, 20, 0]);
    scale = useTransform(progress, [0, 0.68, 0.78, 0.94], [1, 1, 1, 0.96]);
    opacity = useTransform(progress, [0, 0.46, 0.52, 0.82, 0.96], [0, 0, 1, 1, 0.3]);
  } else if (index === 3) {
    // Card 3 (Crimson): Slides up tilted at -20deg between 0.74 and 0.94, straightens and docks on Card 2
    y = useTransform(progress, [0, 0.74, 0.94], [450, 450, 0]);
    rotate = useTransform(progress, [0, 0.74, 0.94], [-20, -20, 0]);
    scale = 1;
    opacity = useTransform(progress, [0, 0.72, 0.78], [0, 0, 1]);
  }

  const zIndex = (index + 1) * 10;

  return (
    <motion.div
      style={{
        y,
        rotate,
        scale,
        opacity,
        zIndex,
        transformOrigin: 'center center',
      }}
      className="absolute top-0 left-0 w-full will-change-transform"
    >
      <article
        className={`relative rounded-[24px] p-7 sm:p-8 transition-colors duration-200 ${
          isCrimson
            ? 'bg-[#ea0044] text-white border-2 border-white/20 shadow-[0_25px_60px_rgba(234,0,68,0.45),0_10px_25px_rgba(0,0,0,0.6)]'
            : 'bg-[#141316] text-white border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
        }`}
      >
        {/* Top Accent Rim */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-[1.5px] rounded-t-[24px] ${
            isCrimson
              ? 'bg-gradient-to-r from-transparent via-white/80 to-transparent'
              : 'bg-gradient-to-r from-transparent via-crimson/50 to-transparent'
          }`}
        />

        {/* Header Row: Icon + Title */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`flex items-center justify-center shrink-0 ${
              isCrimson ? 'text-white' : 'text-crimson'
            }`}
          >
            {ICONS[service.icon]}
          </div>
          <h3
            className="text-2xl sm:text-[26px] font-bold tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {service.title}
          </h3>
        </div>

        {/* Summary Description */}
        <p
          className={`text-[14px] sm:text-[15px] leading-relaxed mb-6 font-normal ${
            isCrimson ? 'text-white/95' : 'text-neutral-300'
          }`}
        >
          {service.description}
        </p>

        {/* Pill Badges matching Image 7 */}
        <div className="flex flex-wrap items-center gap-2">
          {service.pills.map((pill) => (
            <span
              key={pill}
              className={`rounded-full px-3.5 py-1 text-[13px] font-medium tracking-normal border transition ${
                isCrimson
                  ? 'bg-transparent border-white/35 text-white'
                  : 'bg-white/[0.03] border-white/10 text-neutral-300'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

export default function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-[300vh] bg-[#07070a] border-t border-white/[0.08]"
    >
      {/* Subtle background ambient red glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(234,0,68,0.08),transparent_70%)] pointer-events-none blur-3xl"
      />

      {/* Pinned presentation viewport container - strictly exits when section ends */}
      <div className="sticky top-20 lg:top-28 site-container min-h-[calc(100vh-6rem)] flex flex-col justify-center py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[460px_minmax(0,1fr)] gap-10 lg:gap-14 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Header, Copy & Exactly 16 Tools (2 Rows x 8) */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h2
              className="text-[2.6rem] sm:text-[3.25rem] lg:text-[3.6rem] leading-[1.08] tracking-[-0.035em] text-white font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              What I help <br />
              you to <span className="text-crimson font-script font-normal text-[1.12em] tracking-[0.03em]">Shape...</span>
            </h2>

            <p className="font-body text-[#b8b8b8] text-sm sm:text-[15px] leading-relaxed max-w-sm">
              Creating resilient cloud backends, scalable architectures, and interactive modern web platforms engineered for peak performance and user delight.
            </p>

            {/* Exactly 16 Tools in 2 Rows x 8 Columns matching Image 2 */}
            <div className="pt-2">
              <p className="font-ui text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-3">
                Tools that I use
              </p>

              <div className="grid grid-cols-8 gap-2 sm:gap-2.5 max-w-[460px]">
                {ALL_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#141417] border border-white/10 text-neutral-300 transition-all duration-200 hover:border-crimson hover:bg-[#1b1a1f] hover:text-white hover:scale-105 hover:shadow-[0_0_18px_rgba(234,0,68,0.45)] cursor-default"
                  >
                    {tool.renderIcon()}

                    {/* Floating Crimson Tooltip */}
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-40 opacity-0 group-hover:opacity-100 group-hover:-top-9 transition-all duration-200 bg-crimson text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full shadow-[0_4px_14px_rgba(234,0,68,0.55)] whitespace-nowrap flex items-center justify-center">
                      {tool.name}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-crimson" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Desktop 3D Scroll Stacking Deck             */}
          {/* ========================================================= */}
          {/* Desktop: Pinned 3D Card Deck with exact tilt & docking */}
          <div className="hidden lg:block relative w-full max-w-[500px] h-[330px] xl:h-[350px]">
            {servicesData.map((service, index) => (
              <StackedCard
                key={service.id}
                service={service}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Mobile: Clean sequential cards */}
          <div className="block lg:hidden space-y-4">
            {servicesData.map((service) => {
              const isCrimson = service.highlight;
              return (
                <article
                  key={service.id}
                  className={`rounded-2xl p-6 ${
                    isCrimson
                      ? 'bg-crimson text-white border border-white/20'
                      : 'bg-[#141316] text-white border border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={isCrimson ? 'text-white' : 'text-crimson'}>
                      {ICONS[service.icon]}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className={`text-sm mb-4 ${isCrimson ? 'text-white/90' : 'text-neutral-300'}`}>
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.pills.map((pill) => (
                      <span
                        key={pill}
                        className={`text-xs px-3 py-1 rounded-full border ${
                          isCrimson
                            ? 'bg-transparent border-white/30 text-white'
                            : 'bg-white/[0.04] border-white/10 text-neutral-300'
                        }`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
