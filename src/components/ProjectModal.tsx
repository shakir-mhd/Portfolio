import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { featuredProjects, type Project } from '../data/portfolioData';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Magnetic } from './fx';
import { GitHubIcon } from './BrandIcons';

const block = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
};

export default function ProjectModal({
  project,
  onClose,
  onSwitch,
}: {
  project: Project;
  onClose: () => void;
  onSwitch: (p: Project) => void;
}) {
  useScrollLock(true);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const more = featuredProjects.filter((p) => p.id !== project.id);

  return (
    <motion.div
      className="fixed inset-0 z-[140]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`title-${project.id}-modal`}
    >
      {/* Darkened Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div
        ref={scroller}
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        onClick={onClose}
      >
        <motion.div
          className="relative mx-auto min-h-full max-w-4xl bg-ink-2 shadow-2xl sm:my-10 sm:min-h-0 sm:rounded-3xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
        >
          {/* Billboard Image Container */}
          <div className="relative h-[48vh] min-h-[320px] overflow-hidden sm:rounded-t-3xl">
            <img
              src={project.poster}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/40 to-transparent" />

            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              data-cursor="close"
              aria-label="Close project"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-lg text-bone backdrop-blur hover:bg-black transition"
            >
              &times;
            </button>

            <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-10">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-crimson-2 uppercase">
                SYSTEM CASE STUDY
              </p>
              <h2
                id={`title-${project.id}-modal`}
                className="font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.88] text-bone"
              >
                {project.title}
              </h2>
            </div>
          </div>

          {/* Details Content */}
          <motion.div
            className="px-6 pb-12 sm:px-10 pt-6"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
          >
            <motion.div variants={block} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-mist">
              <span className="font-semibold text-crimson-2">{project.year}</span>
              <span>•</span>
              <span>{project.genre}</span>
              <span>•</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-bone font-medium">
                {project.statusBadge}
              </span>
            </motion.div>

            <motion.p variants={block} className="mt-4 text-base sm:text-lg leading-relaxed text-bone/90">
              {project.logline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={block} className="mt-6 flex flex-wrap gap-3">
              {project.demo && (
                <Magnetic>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex min-h-12 items-center gap-2 rounded-xl bg-crimson px-6 text-sm font-bold text-white shadow-lg shadow-crimson/30 hover:bg-crimson-2 transition"
                  >
                    <span>• LIVE DEMO</span>
                    <span>↗</span>
                  </a>
                </Magnetic>
              )}
              {project.github && (
                <Magnetic>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="glass flex min-h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-bone hover:border-crimson hover:bg-white/15 transition"
                  >
                    <GitHubIcon size={16} className="shrink-0" />
                    <span>GitHub Repository</span>
                    <span>↗</span>
                  </a>
                </Magnetic>
              )}
            </motion.div>

            {/* Impact / Result Grid */}
            <motion.section variants={block} className="mt-10">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-crimson-2">
                Quantitative Impact & Metrics
              </h3>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="bg-ink p-4 text-center">
                    <p className="font-display text-3xl text-bone">{m.value}</p>
                    <p className="mt-1 text-[11px] font-medium text-mist">{m.label}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Engineering Highlights */}
            <motion.section variants={block} className="mt-8">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-crimson-2">
                Engineering & Architecture Highlights
              </h3>
              <ul className="space-y-2 text-sm text-mist">
                {project.build.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-crimson mt-1">&bull;</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Tech Stack Pills */}
            <motion.section variants={block} className="mt-8">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-crimson-2">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-bone"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Switch to Other Projects */}
            {more.length > 0 && (
              <motion.section variants={block} className="mt-12 border-t border-white/10 pt-8">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-smoke">
                  More Featured Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {more.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSwitch(m)}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink p-2 text-left hover:border-crimson/50 hover:bg-white/5 transition"
                    >
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="h-14 w-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-display text-lg text-bone truncate">{m.title}</p>
                        <p className="text-[10px] text-crimson-2 font-semibold">{m.year}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
