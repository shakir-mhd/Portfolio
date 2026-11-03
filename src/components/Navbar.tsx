import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { viewerProfiles, type ProfileId, type SectionId } from '../data/portfolioData';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { ProfileAvatar } from './ProfileSelector';

const sectionLabels: Record<SectionId, string> = {
  hero: 'Home',
  services: 'Services',
  originals: 'Projects',
  journey: 'Experience',
  skills: 'Skills',
  screenplay: 'Resume',
  faqs: 'FAQs',
  contact: 'Contact',
};

export default function Navbar({
  order,
  profileId,
  onSwitch,
}: {
  order: SectionId[];
  profileId: ProfileId;
  onSwitch: (id: ProfileId) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const lastScrollY = useRef(0);
  const { scrollTo } = useSmoothScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setIsScrolled(currentY > 70);

      // Scroll direction detection
      if (Math.abs(diff) > 4) {
        if (diff > 0 && currentY > 120) {
          setIsScrollingDown(true);
        } else if (diff < 0) {
          setIsScrollingDown(false);
        }
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for active section detection
  useEffect(() => {
    const ids = ['hero', ...order, 'contact'];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [order]);

  // Click outside to close persona menu
  useEffect(() => {
    if (!menu) return;
    const close = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenu(false);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [menu]);

  const go = (id: string) => {
    scrollTo(`#${id}`, { offset: id === 'hero' ? 0 : -64 });
    setMobileMenuOpen(false);
  };

  const current = viewerProfiles.find((p) => p.id === profileId) || viewerProfiles[0];

  // Expand if near top, scrolling up, or hovered
  const isExpanded = (!isScrolled || !isScrollingDown || isHovered) && !mobileMenuOpen;

  // Selected priority links for desktop pill view
  const primaryOrder = order.filter((id) => ['services', 'originals', 'journey', 'screenplay'].includes(id));

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex justify-center pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: 'calc(100% - 32px)',
          maxWidth: isExpanded ? '820px' : '230px',
        }}
      >
        <nav
          className="pointer-events-auto flex items-center justify-between w-full rounded-full transition-all duration-300"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(16, 15, 20, 0.78)',
            backdropFilter: 'blur(28px) saturate(190%)',
            WebkitBackdropFilter: 'blur(28px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '6px 10px',
            boxShadow:
              '0 20px 45px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.4)',
            gap: '8px',
          }}
        >
          {/* Left: Avatar with Crimson Halo + Name Shakir */}
          <button
            type="button"
            onClick={() => go('hero')}
            className="flex items-center gap-2.5 shrink-0 pl-1 pr-2 text-left cursor-pointer group"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-[radial-gradient(circle,#ea0044_0%,#7a0022_100%)] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(234,0,68,0.55)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1b1a1f]">
                <img
                  src="/assets/shakir-portrait.png"
                  alt="Shakir"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-white text-sm font-semibold tracking-tight whitespace-nowrap">
              Shakir
            </span>
          </button>

          {/* Center: Desktop Navigation Links (Visible when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={() => go('hero')}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    active === 'hero'
                      ? 'bg-white/10 text-white font-semibold shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </button>
                {primaryOrder.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      active === id
                        ? 'bg-white/10 text-white font-semibold shadow-sm'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {sectionLabels[id]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* When expanded: Full CTA & Profile Switcher */}
            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  key="expanded-actions"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => go('contact')}
                    className="hidden sm:inline-flex items-center justify-center text-xs font-bold px-4 py-1.5 rounded-full bg-crimson text-white shadow-[0_4px_14px_rgba(234,0,68,0.45)] hover:bg-[#ff1a53] hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                  >
                    LET&apos;S BUILD
                  </button>

                  {/* Persona Switcher Dropdown */}
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => setMenu((m) => !m)}
                      aria-haspopup="menu"
                      aria-expanded={menu}
                      aria-label={`Viewing as ${current.name}. Switch profile`}
                      className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1 px-2 hover:bg-white/10 transition cursor-pointer"
                    >
                      <ProfileAvatar id={profileId} size="sm" />
                      <span className="hidden lg:inline text-[11px] font-medium text-bone max-w-[90px] truncate">
                        {current.name}
                      </span>
                      <motion.span animate={{ rotate: menu ? 180 : 0 }} className="text-[9px] text-mist">
                        ▼
                      </motion.span>
                    </button>

                    {menu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-white/15 bg-[#121218]/95 p-2 shadow-2xl backdrop-blur-2xl z-[120]"
                      >
                        <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-smoke">
                          Switch Persona
                        </p>
                        {viewerProfiles.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              onSwitch(p.id);
                              setMenu(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs transition cursor-pointer ${
                              p.id === profileId
                                ? 'bg-crimson/20 text-crimson font-bold'
                                : 'text-mist hover:bg-white/10 hover:text-bone'
                            }`}
                          >
                            <ProfileAvatar id={p.id} size="sm" />
                            <div>
                              <p className="font-semibold text-white">{p.name}</p>
                              <p className="text-[10px] text-smoke">{p.role}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* When collapsed (matching Image 5 reference): Clean minimalist hamburger menu */
                <motion.button
                  key="collapsed-menu"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition cursor-pointer"
                  aria-label="Open navigation menu"
                >
                  <Menu size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Mobile-only toggle when expanded */}
            {isExpanded && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex md:hidden items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Floating Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-4 top-20 z-[95] max-w-md mx-auto rounded-3xl border border-white/15 bg-[#121218]/98 p-6 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-mist">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-mist hover:text-white hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-2 py-4">
              <button
                type="button"
                onClick={() => go('hero')}
                className="text-left text-sm font-semibold text-white py-2 px-3 rounded-xl hover:bg-white/5 transition"
              >
                Home
              </button>
              {order.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  className="text-left text-sm font-semibold text-neutral-300 hover:text-white py-2 px-3 rounded-xl hover:bg-white/5 transition"
                >
                  {sectionLabels[id]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go('contact')}
              className="w-full py-3 rounded-full bg-crimson text-white font-bold text-center text-xs shadow-lg shadow-crimson/30 hover:bg-[#ff1a53] transition"
            >
              LET&apos;S BUILD ↗
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
