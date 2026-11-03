import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journeySeasons, type JourneySeason } from '../data/portfolioData';
import { SectionHeading } from './fx';

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-20 lg:py-28 overflow-visible bg-ink">
      {/* Cinematic Ambient Glow */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-crimson/10 rounded-full blur-[140px] pointer-events-none"
      />

      <SectionHeading kicker="Experience & Milestones" title="Academic & Professional Journey" />

      {/* Natural scrolling container with glassmorphic cards and top exit blur */}
      <div className="site-container max-w-5xl mx-auto w-full relative flex flex-col gap-8 sm:gap-10 pb-16">
        {journeySeasons.map((season, idx) => (
          <JourneySeasonCard
            key={season.season}
            season={season}
            index={idx}
            total={journeySeasons.length}
          />
        ))}
      </div>
    </section>
  );
}

function JourneySeasonCard({
  season,
  index,
  total,
}: {
  season: JourneySeason;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Natural scroll: as card scrolls towards and off the top of the screen, apply glassmorphism blur and fade
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 140px', 'end -40px'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        scale,
        opacity,
        y: yOffset,
        filter: blur,
      }}
      className="relative w-full rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-[#0c0c14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_24px_55px_rgba(0,0,0,0.88),inset_0_1px_1.5px_rgba(255,255,255,0.22)] flex flex-col justify-between overflow-hidden group hover:border-crimson/50 transition-colors duration-300 will-change-transform"
    >
      {/* Dynamic Mouse Spotlight Refraction Highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(234, 0, 68, 0.2), transparent 70%)',
        }}
      />

      {/* Crimson Accent Laser Stripe */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent z-10 shadow-[0_0_15px_#ea0044]"
      />

      {/* Card Header Top: Status Tag + Period on Left, Monospace Number on Right */}
      <div className="flex items-center justify-between w-full mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-crimson px-3 py-1 rounded-full bg-crimson/15 border border-crimson/35 shadow-sm shadow-crimson/20">
            {season.status}
          </span>
          <span className="text-xs font-mono text-smoke">{season.period}</span>
        </div>

        <span className="text-3xl sm:text-4xl font-mono font-black text-white/20 select-none">
          {season.season.replace('MILESTONE ', '')}
        </span>
      </div>

      {/* Season Body Content */}
      <div className="relative z-10 border-b border-white/10 pb-6 mb-6">
        <span className="font-display text-sm tracking-[0.3em] text-crimson block mb-1">
          {season.season}
        </span>
        <h3 className="font-display text-3xl sm:text-4xl text-bone tracking-wide group-hover:text-white transition-colors">
          {season.title}
        </h3>
        <p className="text-sm font-medium text-mist mt-1">
          {season.organization} &bull; <span className="text-bone/70">{season.location}</span>
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-bone/85 mt-4">
          {season.description}
        </p>
      </div>

      {/* Key Focus Areas Grid */}
      <div className="space-y-3 relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-smoke">
          Key Focus Areas & Modules:
        </p>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {season.episodes.map((ep, eIdx) => (
            <div
              key={eIdx}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs font-medium text-bone/90 backdrop-blur-md hover:border-crimson/40 hover:bg-white/[0.08] transition-all"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson/20 text-[10px] font-bold text-crimson font-mono">
                {eIdx + 1}
              </span>
              <span className="line-clamp-2 leading-tight">{ep}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Crimson Corner Dot */}
      <div
        aria-hidden
        className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_8px_#ea0044] z-10 transition-all group-hover:scale-125"
      />
    </motion.article>
  );
}
