import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { sectionMeta, type SectionId } from '../data/portfolioData';
import { useWatchProgress } from '../hooks/sectionProgress';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { useFinePointer } from '../hooks/useMedia';
import { EASE, RevealText } from './fx';
import { PosterBackdrop } from './Poster';
import { RailButtons } from './Rail';

const GLYPHS: Record<SectionId, string> = {
  hero: '00',
  services: '01',
  originals: '02',
  journey: '03',
  skills: '04',
  screenplay: 'CV',
  faqs: '?',
  contact: '99',
};

export default function ContinueWatching({ order }: { order: SectionId[] }) {
  const progress = useWatchProgress();
  const { scrollTo } = useSmoothScroll();
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  // Filter out hero/contact if desired, or show all navigable sections
  const navigable = order.filter((id) => id !== 'hero' && id !== 'contact');

  return (
    <section aria-labelledby="continue-title" className="relative z-10 -mt-6 pb-12 sm:-mt-10">
      <div className="site-container mb-4 flex items-end justify-between">
        <RevealText
          as="h2"
          text="Explore Sections"
          className="font-sans text-lg font-semibold tracking-tight text-bone sm:text-2xl"
        />
        <span className="hidden text-xs text-smoke sm:block">
          Interactive Section Navigator • Click to jump to any section
        </span>
      </div>

      <div className="group/rail relative">
        <div
          ref={rail}
          className="rail gutter flex snap-x snap-mandatory gap-4 overflow-x-auto py-6"
          data-cursor={fine ? undefined : 'drag'}
        >
          {navigable.map((id, i) => {
            const meta = sectionMeta[id] || {
              card: id.toUpperCase(),
              meta: 'Section',
              palette: { from: '#140308', via: '#590a1c', to: '#07070a', accent: '#ea0044' },
            };
            const p = progress[id] ?? 0;
            const shift = fine && hovered !== null && hovered !== i ? (i < hovered ? -10 : 10) : 0;

            return (
              <motion.button
                key={id}
                type="button"
                data-cursor="play"
                onClick={() => scrollTo(`#${id}`, { offset: -70 })}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group relative aspect-video w-[72vw] shrink-0 snap-start overflow-visible text-left sm:w-[42vw] md:w-[30vw] lg:w-[22vw]"
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                animate={{
                  x: shift,
                  scale: fine && hovered === i ? 1.05 : 1,
                  zIndex: hovered === i ? 10 : 1,
                }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(234,0,68,0.6)]">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: hovered === i ? 1.1 : 1 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <PosterBackdrop palette={meta.palette}>
                      <span className="absolute -right-2 -top-6 font-display text-[7.5rem] leading-none text-white/[0.08] sm:text-[8.5rem]">
                        {GLYPHS[id] ?? '01'}
                      </span>
                    </PosterBackdrop>
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-crimson-2">
                      Section 0{i + 1}
                    </span>
                    <span className="font-display text-2xl leading-none tracking-wide text-bone transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
                      {meta.card}
                    </span>
                    <span className="mt-1 text-xs text-mist opacity-100 transition duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                      {meta.meta}
                    </span>
                  </div>

                  <span className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/50 text-[10px] text-bone backdrop-blur transition duration-300 group-hover:scale-110 group-hover:bg-crimson group-hover:text-white group-hover:border-crimson">
                    ▶
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-[3px] w-full overflow-hidden rounded bg-white/15">
                  <motion.div
                    className="h-full origin-left bg-crimson"
                    animate={{ scaleX: Math.max(0.05, p) }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
        <RailButtons rail={rail} />
      </div>
    </section>
  );
}
