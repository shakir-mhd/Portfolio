import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { viewerProfiles, type ProfileId, type Project, type SectionId } from './data/portfolioData';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesStack from './components/ServicesStack';
import ContinueWatching from './components/ContinueWatching';
import Originals from './components/Originals';
import JourneySection from './components/JourneySection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ResumeViewer from './components/ResumeViewer';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingContactPill from './components/FloatingContactPill';
import { EASE } from './components/fx';

// Overlays lazy loaded for performance
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'profiles' | 'home';

const STORAGE_KEY = 'shakir-portfolio-profile';

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <PortfolioApp />
    </SmoothScrollProvider>
  );
}

function PortfolioApp() {
  const stored = readStoredProfile();
  const [stage, setStage] = useState<Stage>(stored ? 'home' : 'opening');
  const [profileId, setProfileId] = useState<ProfileId>(stored ?? 'shakir');
  const [playing, setPlaying] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  const currentProfile = viewerProfiles.find((p) => p.id === profileId)!;
  const order = currentProfile.order;

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage fallback */
      }
      if (stage !== 'home') {
        window.scrollTo(0, 0);
        setStage('home');
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Viewing as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
    },
    [stage, scrollTo]
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

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

      {/* Opening & Profile Stages */}
      <AnimatePresence>
        {stage === 'opening' && (
          <OpeningSequence key="opening" onDone={() => setStage('profiles')} />
        )}
        {stage === 'profiles' && (
          <ProfileSelector key="profiles" onPick={pickProfile} />
        )}
      </AnimatePresence>

      {/* Main Home Experience */}
      {stage === 'home' && (
        <>
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <main>
            <Hero
              profileId={profileId}
              onPlay={() => setPlaying(true)}
              onResume={() => setResumeOpen(true)}
            />

            <ContinueWatching order={order} />

            {/* Render sections according to selected persona order */}
            {order.map((sectionId) => sections[sectionId])}

            <Footer onReplay={() => setStage('opening')} />
          </main>

          <FloatingContactPill />
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

      {/* Persona Notification Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,440px)] -translate-x-1/2 rounded-2xl px-5 py-3.5 text-center text-sm font-medium text-bone border border-crimson/30 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
