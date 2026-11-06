import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { type Project, type SectionId } from './data/portfolioData';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesStack from './components/ServicesStack';
import Originals from './components/Originals';
import JourneySection from './components/JourneySection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ResumeViewer from './components/ResumeViewer';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingContactPill from './components/FloatingContactPill';
import ProgressiveBlur from './components/ProgressiveBlur';
import { EASE } from './components/fx';

// Overlays lazy loaded for performance
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'home';

const DEFAULT_ORDER: SectionId[] = ['services', 'originals', 'journey', 'skills', 'screenplay', 'faqs'];

export default function App() {
  return (
    <SmoothScrollProvider>
      <PortfolioApp />
    </SmoothScrollProvider>
  );
}

function PortfolioApp() {
  const [stage, setStage] = useState<Stage>('home');
  const [playing, setPlaying] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { lock, unlock } = useSmoothScroll();

  const order = DEFAULT_ORDER;

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const sections: Record<SectionId, ReactNode> = {
    hero: null,
    services: <ServicesStack key="services" />,
    originals: <Originals key="originals" onOpen={setSelectedProject} />,
    journey: (
      <div key="journey-wrap">
        <JourneySection key="journey" />
        <AboutSection key="about" />
      </div>
    ),
    skills: <SkillsSection key="skills" />,
    screenplay: <ResumeViewer key="screenplay" onView={() => setResumeOpen(true)} />,
    faqs: <FAQSection key="faqs" />,
    contact: null,
  };

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <CustomCursor />

      {/* Opening Sequence (only triggered on manual replay) */}
      <AnimatePresence>
        {stage === 'opening' && (
          <OpeningSequence key="opening" onDone={() => setStage('home')} />
        )}
      </AnimatePresence>

      {/* Main Home Experience */}
      {stage === 'home' && (
        <>
          <Navbar order={order} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <main>
            <Hero
              onPlay={() => setPlaying(true)}
              onResume={() => setResumeOpen(true)}
            />

            {/* Render sections in clean, structured order */}
            {order.map((sectionId) => sections[sectionId])}

            <Footer onReplay={() => setStage('opening')} />
          </main>

          <FloatingContactPill />
          <ProgressiveBlur />
        </motion.div>
      </>
      )}

      {/* Demand-Loaded Modals & Overlays */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {playing && <PlayIntro key="intro" onClose={() => setPlaying(false)} />}
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              key="project"
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
              onSwitch={setSelectedProject}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {resumeOpen && (
            <ResumeModal key="resume" onClose={() => setResumeOpen(false)} />
          )}
        </AnimatePresence>
      </Suspense>

      <Analytics />
    </LayoutGroup>
  );
}
