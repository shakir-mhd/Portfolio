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
      className="group relative flex aspect-[10/14] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl bg-ink-2 shadow-2xl ring-1 ring-white/10 sm:w-[50vw] md:w-[38vw] lg:aspect-auto lg:h-[66vh] lg:w-[26vw]"
      onClick={onOpen}
      data-cursor="view"
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </motion.div>

      {/* Top Badges */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-bone backdrop-blur-md border border-white/10">
          FEATURED PROJECT
        </span>
        <span className="rounded-full bg-crimson/80 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
          {project.statusBadge}
        </span>
      </div>

      {/* Bottom Content Card */}
      <div className="relative z-10 p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-mist">
          <span className="text-crimson-2 font-bold">{project.year}</span>
          <span>&bull;</span>
          <span className="truncate">{project.genre}</span>
        </div>

        <h3 className="font-display text-3xl sm:text-4xl tracking-wide text-bone group-hover:text-white transition">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-bone/80 sm:text-sm">
          {project.logline}
        </p>

        {/* Tech Stack Chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-bone/90 border border-white/10"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-smoke border border-white/10">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-crimson group-hover:translate-x-1 transition-transform">
          <span>VIEW CASE STUDY</span>
          <span>→</span>
        </div>
      </div>
    </Tilt>
  );
}
