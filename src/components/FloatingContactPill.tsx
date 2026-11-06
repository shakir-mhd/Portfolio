import React, { useState, useEffect, useRef } from 'react';
import { Mail, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks } from '../data/portfolioData';

export const FloatingContactPill: React.FC = () => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const leaveTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hidden on first look (at top of page / hero)
      const pastHero = scrollY > 140;

      // Hidden when reaching the end of the site / footer
      // When the user reaches the footer, the floating pill hides cleanly
      // so it never covers the footer contact information or M. SHAKIR mark.
      // When the user scrolls back up, it smoothly reappears!
      const nearBottom = scrollY + viewportHeight >= documentHeight - 380;

      const shouldShow = pastHero && !nearBottom;
      setIsScrolledPastHero(shouldShow);

      if (!shouldShow) {
        setIsHovered(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 160);
  };

  return (
    <aside
      aria-label="Floating quick contact"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {isScrolledPastHero && (
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.92 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 100%), rgba(22, 21, 26, 0.74)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '9999px',
              padding: isHovered ? '8px 10px' : '8px 10px 8px 20px',
              boxShadow:
                '0 20px 45px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'padding 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {!isHovered ? (
              /* State 1: Compact "Speak to me" view (Default while scrolled down) */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  userSelect: 'none',
                }}
              >
                {/* Left text block */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      color: '#ffffff',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Speak to me
                  </span>
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.65)',
                      fontSize: '11px',
                      marginTop: '2px',
                    }}
                  >
                    Email or book a call
                  </span>
                </div>

                {/* Right circular buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-crimson)',
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(234, 0, 68, 0.5)',
                    }}
                  >
                    <Mail size={16} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(40, 38, 44, 0.92)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: '#ffffff',
                    }}
                  >
                    <Calendar size={16} />
                  </div>
                </div>
              </div>
            ) : (
              /* State 2: Expanded Long View (When cursor moves onto the pill) */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {/* Contact Button (Solid Crimson Pill) */}
                <a
                  href={`mailto:${socialLinks.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    backgroundColor: 'var(--color-crimson)',
                    color: '#ffffff',
                    padding: '10px 22px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    boxShadow: '0 4px 18px rgba(234, 0, 68, 0.45)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-crimson-hover)';
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(234, 0, 68, 0.65)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-crimson)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(234, 0, 68, 0.45)';
                  }}
                >
                  <Mail size={16} />
                  <span>Contact</span>
                </a>

                {/* Book a Call Button (Charcoal Pill) */}
                <a
                  href={socialLinks.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    backgroundColor: 'rgba(40, 38, 44, 0.92)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(55, 52, 60, 0.98)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(40, 38, 44, 0.92)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Calendar size={16} />
                  <span>Book a call</span>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default FloatingContactPill;
