import React from 'react';
import { motion } from 'framer-motion';
import { type Project } from '../data/portfolioData';
import { EASE, Tilt } from './fx';

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <Tilt
      className="group relative flex aspect-[10/14] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl bg-ink-2 shadow-2xl ring-1 ring-white/10 sm:w-[50vw] md:w-[38vw] lg:aspect-auto lg:h-[66vh] lg:w-[26vw] cursor-pointer"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`View ${project.title}`}
    >
      {/* Background Poster Image */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <img
          src={project.poster}
          alt={project.title}
          className="h-full w-full object-cover object-center"
        />
        {/* Top Scrim for Badges */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none" />
        {/* Deep Bottom Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/90 via-55% to-transparent pointer-events-none" />
      </motion.div>

      {/* Top Badges */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-bone backdrop-blur-md border border-white/15 shadow-md">
          FEATURED PROJECT
        </span>
        <span className="rounded-full bg-crimson px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
          {project.statusBadge}
        </span>
      </div>

      {/* Bottom Content Card - Protected from image bleed */}
      <div className="relative z-10 m-3 sm:m-4 p-4 sm:p-5 rounded-2xl bg-[#0e0e14]/92 backdrop-blur-md border border-white/[0.08] shadow-2xl">
        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-mist">
          <span className="text-crimson font-bold font-ui">{project.year}</span>
          <span className="text-white/30">&bull;</span>
          <span className="truncate text-white/70 text-[11px] font-ui uppercase tracking-wider">{project.genre}</span>
        </div>

        <h3 className="font-space font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-crimson transition-colors">
          {project.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-300 font-body">
          {project.logline}
        </p>

        {/* Tech Stack Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-neutral-200 border border-white/[0.08] font-ui"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 border border-white/[0.08] font-ui">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs font-bold text-crimson group-hover:translate-x-1 transition-transform font-ui tracking-wide">
          <span>VIEW CASE STUDY</span>
          <span>→</span>
        </div>
      </div>
    </Tilt>
  );
}
