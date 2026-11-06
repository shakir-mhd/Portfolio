import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks, cyclingWords } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './BrandIcons';

export default function Footer({ onReplay }: { onReplay?: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="relative bg-black pt-12 sm:pt-16 pb-8 sm:pb-12 overflow-hidden border-t border-white/[0.08]">
      <div className="site-container relative z-10">
        {/* Dynamic cycling headline matching Ruchit Designs proportions */}
        <div className="mb-10 sm:mb-12 overflow-visible">
          <h2 className="font-space font-bold text-[clamp(1.85rem,4.2vw,3.4rem)] leading-[1.25] tracking-[-0.025em] text-[#f0f0f0] overflow-visible">
            Lets{' '}
            <span className="relative inline-flex items-baseline text-crimson font-script font-normal text-[1.2em] tracking-[0.03em] leading-normal pl-1.5 pr-3 py-1 pb-3 align-baseline overflow-visible">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 14, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block whitespace-nowrap overflow-visible pb-2"
                  style={{ display: 'inline-block', lineHeight: 1.25 }}
                >
                  {cyclingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            incredible systems together.
          </h2>
        </div>

        {/* 3 Contact Columns: Email (Left), Call Me (Center), Social (Right) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 sm:pb-10 items-start">
          {/* Email */}
          <div>
            <p className="text-xs text-neutral-400 font-normal mb-2">Email</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-base sm:text-lg font-medium text-white hover:text-crimson transition block truncate"
            >
              {personalInfo.email}
            </a>
          </div>

          {/* Call Me */}
          <div className="sm:text-center">
            <p className="text-xs text-neutral-400 font-normal mb-2">Call Me</p>
            <a
              href={socialLinks.cal}
              target="_blank"
              rel="noreferrer"
              className="text-base sm:text-lg font-medium text-white hover:text-crimson transition inline-block"
            >
              Book Now
            </a>
          </div>

          {/* Social: 3 sleek round crimson buttons matching Ruchit */}
          <div className="sm:text-right sm:flex sm:flex-col sm:items-end">
            <p className="text-xs text-neutral-400 font-normal mb-2">Social</p>
            <div className="flex items-center gap-2.5 sm:justify-end">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram (@_shakir_skr_)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <LinkedInIcon size={13} />
              </a>
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <GitHubIcon size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="border-t border-neutral-800/80 mb-6 sm:mb-8" />

        {/* Menu & Copyright Row */}
        <div className="flex items-start justify-between pb-8 sm:pb-10">
          <div>
            <p className="text-xs text-neutral-400 font-normal mb-2.5">Menu</p>
            <div className="flex items-center gap-7 text-sm sm:text-base font-bold text-white">
              <a href="#originals" className="hover:text-crimson transition">
                Work
              </a>
              <a href="#services" className="hover:text-crimson transition">
                Services
              </a>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-neutral-400 font-normal pt-1">
            © {new Date().getFullYear()} Shakir Designs
          </div>
        </div>

        {/* Giant MR. SHAKIR Typography - Using exact Space Grotesk Bold font from Ruchit Designs */}
        <div className="relative pt-2 sm:pt-4 pb-2 sm:pb-4 select-none flex justify-center items-end leading-none">
          <h1 className="font-['Space_Grotesk_Bold','Space_Grotesk',sans-serif] font-bold text-crimson text-[clamp(3.5rem,12.5vw,11.2rem)] tracking-[-0.03em] leading-none text-center m-0 whitespace-nowrap">
            MR. SHAKIR
          </h1>
        </div>
      </div>
    </footer>
  );
}
