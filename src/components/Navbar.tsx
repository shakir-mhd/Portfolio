import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { type SectionId } from '../data/portfolioData';
import { useSmoothScroll } from '../hooks/smoothScroll';
import shakirNavHeadshot from '../assets/shakir-nav-headshot.png';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', id: 'originals' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
];

export default function Navbar({
  order,
}: {
  order?: SectionId[];
} = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const lastScrollY = useRef(0);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setIsScrolled(currentY > 70);

      // Scroll direction technology:
      // When scrolling DOWN (diff > 4 and currentY > 120): shorten navbar
      // When scrolling UP (diff < -4): lengthen navbar
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

  // Intersection observer for active link
  useEffect(() => {
    const ids = ['hero', 'originals', 'services', 'about', 'contact'];
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
  }, []);

  const go = (id: string) => {
    scrollTo(`#${id}`, { offset: id === 'hero' ? 0 : -64 });
    setMobileMenuOpen(false);
  };

  // Expand if near top, scrolling up, or hovered
  const isExpanded = (!isScrolled || !isScrollingDown || isHovered) && !mobileMenuOpen;

  return (
    <>
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex justify-center pointer-events-none transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: 'calc(100% - 32px)',
          maxWidth: isExpanded ? '560px' : '210px',
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
            padding: '6px 8px 6px 10px',
            boxShadow:
              '0 20px 45px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.4)',
            gap: '8px',
          }}
        >
          {/* Left: Avatar with Glowing Crimson Halo + Name Shakir */}
          <button
            type="button"
            onClick={() => go('hero')}
            className="flex items-center gap-2.5 shrink-0 pl-1 pr-1.5 text-left cursor-pointer group"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 rounded-full p-[1.5px] bg-[radial-gradient(circle,#ea0044_0%,#7a0022_100%)] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(234,0,68,0.55)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1b1a1f]">
                <img
                  src={shakirNavHeadshot}
                  alt="Shakir"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span
              className="text-white text-sm font-semibold tracking-tight whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Shakir
            </span>
          </button>

          {/* Center: Clean, Minimal Navigation Links (Matching Ruchit Reference) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-1"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(item.id)}
                      className={`text-[13px] px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${isActive
                        ? 'bg-white/10 text-white font-semibold shadow-sm'
                        : 'text-[#b8b8b8] hover:text-white hover:bg-white/5'
                        }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* When expanded on Desktop: Clean Crimson Contact Pill matching Ruchit */}
            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  key="expanded-contact"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex items-center"
                >
                  <button
                    type="button"
                    onClick={() => go('contact')}
                    className="inline-flex items-center justify-center text-[13px] font-semibold px-4.5 py-1.5 rounded-full bg-crimson text-white shadow-[0_4px_16px_rgba(234,0,68,0.45)] hover:bg-[#ff1a53] hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Contact
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* When Collapsed (Scrolling Down): Sleek Minimal Hamburger Icon [ ≡ ] */}
            <motion.button
              key={isExpanded ? 'exp-btn' : 'col-btn'}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/15 hover:scale-105 active:scale-95 transition cursor-pointer ${isExpanded ? 'flex md:hidden' : 'flex'
                }`}
              aria-label="Open navigation menu"
            >
              <Menu size={15} />
            </motion.button>
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
            className="fixed inset-x-4 top-20 z-[95] max-w-sm mx-auto rounded-3xl border border-white/15 bg-[#121218]/98 p-6 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Navigation</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <button
                type="button"
                onClick={() => go('hero')}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-neutral-300 hover:text-white hover:bg-white/5 transition font-medium"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span>Home</span>
                <span className="text-xs text-neutral-500 font-mono">↗</span>
              </button>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-neutral-300 hover:text-white hover:bg-white/5 transition font-medium"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-neutral-500 font-mono">↗</span>
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 mt-2">
                <button
                  type="button"
                  onClick={() => go('contact')}
                  className="w-full py-3 rounded-2xl bg-crimson font-semibold text-white text-center shadow-lg hover:bg-[#ff1a53] transition cursor-pointer"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Contact Shakir
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
