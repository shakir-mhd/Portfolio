import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { featuredProjects, personalInfo, type Project } from '../data/portfolioData';
import { useDesktop, useReducedMotionPref } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import ProjectCard from './ProjectCard';

export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();
  return (
    <section id="originals" className="relative">
      {desktop && !reduced ? <PinnedOriginals onOpen={onOpen} /> : <RailOriginals onOpen={onOpen} />}
    </section>
  );
}

function Intro() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center lg:w-[32vw]">
      <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-crimson-2">
        <span className="h-px w-8 bg-crimson" /> {featuredProjects.length} Selected Works &bull; Production Systems
      </p>
      <RevealText as="h2" text="PROJECTS" className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] text-bone" />
      <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-mist">
        Real production platforms, institutional LMS systems, and spatial road mapping software. Click any title to inspect the full case study.
      </p>
      <p className="mt-6 hidden text-xs tracking-[0.24em] text-smoke lg:block">SCROLL TO BROWSE →</p>
    </div>
  );
}

function Outro() {
  return (
    <a
      href={personalInfo.links.github}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      className="group flex aspect-[10/14] w-[70vw] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/20 text-center transition hover:border-crimson sm:w-[44vw] lg:aspect-auto lg:h-[66vh] lg:w-[22vw]"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-2xl text-bone transition group-hover:scale-110 group-hover:border-crimson group-hover:text-crimson">
        ↗
      </span>
      <span className="font-display text-3xl tracking-wide text-bone">More on GitHub</span>
      <span className="text-xs text-mist">github.com/shakir-mhd</span>
    </a>
  );
}

function PinnedOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const distMV = useMotionValue(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      setDist(d);
      distMV.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [distMV]);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const raw = useTransform([scrollYProgress, distMV], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={wrap} style={{ height: `calc(100vh + ${dist}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_50%,rgba(234,0,68,0.12),transparent_70%)]"
        />
        <motion.div
          ref={track}
          style={{ x }}
          className="gutter relative flex items-center gap-8 pr-[10vw]"
          data-cursor="drag"
        >
          <Intro />
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
          ))}
          <Outro />
        </motion.div>

        {/* Progress Scrubber Bar */}
        <div className="gutter absolute inset-x-0 bottom-8 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-smoke">PROJECTS</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <motion.div className="h-full origin-left bg-crimson" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RailOriginals({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="py-12">
      <div className="gutter mb-8">
        <Intro />
      </div>
      <motion.div
        className="rail gutter flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => onOpen(p)} />
        ))}
        <Outro />
      </motion.div>
    </div>
  );
}
