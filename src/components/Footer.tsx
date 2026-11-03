import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks, cyclingWords } from '../data/portfolioData';
import { LinkedInIcon, GitHubIcon, InstagramIcon } from './BrandIcons';
import { EASE } from './fx';

export default function Footer({ onReplay }: { onReplay?: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer id="contact" className="relative bg-black pt-16 sm:pt-20 pb-0 overflow-hidden">
      <div className="site-container relative z-10">
        {/* Dynamic cycling headline matching previous appearance */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-hero font-extrabold text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] leading-[1.08] tracking-[-0.035em] text-white">
            Lets{' '}
            <span className="relative inline-flex items-baseline overflow-hidden text-crimson font-['Caveat',cursive] font-bold text-[1.15em] pl-1 pr-4 sm:pr-6 py-1 align-baseline">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block whitespace-nowrap pr-4 sm:pr-6"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-10 items-start">
          {/* Email */}
          <div>
            <p className="text-xs text-neutral-400 font-normal mb-2">Email</p>
            <a
              href={`mailto:${personalInfo.email}`}
              data-cursor="link"
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
              data-cursor="link"
              className="text-base sm:text-lg font-medium text-white hover:text-crimson transition inline-block"
            >
              Book Now
            </a>
          </div>

          {/* Social */}
          <div className="sm:text-right sm:flex sm:flex-col sm:items-end">
            <p className="text-xs text-neutral-400 font-normal mb-2">Social</p>
            <div className="flex items-center gap-2.5 sm:justify-end">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label="Instagram"
                title="Instagram (@_shakir_skr_)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95"
              >
                <InstagramIcon size={14} />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95"
              >
                <LinkedInIcon size={13} />
              </a>
              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label="GitHub"
                title="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95"
              >
                <GitHubIcon size={14} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                data-cursor="link"
                aria-label="Direct Email"
                title="Direct Email"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-crimson text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25 hover:scale-105 active:scale-95"
              >
                <Mail size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="border-t border-neutral-800/80 mb-6 sm:mb-8" />

        {/* Menu & Copyright Row */}
        <div className="flex items-start justify-between pb-8 sm:pb-12">
          <div>
            <p className="text-xs text-neutral-400 font-normal mb-2.5">Menu</p>
            <div className="flex items-center gap-7 text-sm sm:text-base font-bold text-white">
              <a href="#originals" data-cursor="link" className="hover:text-crimson transition">
                Work
              </a>
              <a href="#services" data-cursor="link" className="hover:text-crimson transition">
                Services
              </a>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-neutral-400 font-normal pt-0.5">
            © {new Date().getFullYear()} Shakir Designs
          </div>
        </div>

        {/* Giant MR. SHAKIR Typography - Perfectly balanced & fully visible */}
        <div className="relative pt-4 sm:pt-6 pb-0 select-none flex justify-center items-end leading-none">
          <h1 className="font-hero font-black text-crimson text-[clamp(2.75rem,11.2vw,11.5rem)] tracking-[-0.035em] leading-[0.88] text-center m-0 whitespace-nowrap">
            M. SHAKIR
          </h1>
        </div>
      </div>
    </footer>
  );
}
