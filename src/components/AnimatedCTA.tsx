import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialLinks, cyclingWords } from '../data/portfolioData';
import { Magnetic, EASE } from './fx';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';

export default function AnimatedCTA() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 border-t border-white/10 overflow-hidden bg-black/60">
      <div className="site-container">
        {/* Animated Big Cycling Statement */}
        <div className="mb-14 text-center sm:text-left">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-crimson-2 mb-2">
            COLLABORATE & ARCHITECT
          </p>
          <h2 className="font-hero text-[clamp(2.8rem,7.5vw,6.5rem)] font-black text-bone leading-[0.9] tracking-tight">
            Let&apos;s{' '}
            <span className="inline-block relative min-w-[220px] text-crimson font-serif italic font-normal">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 25, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -25, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="inline-block"
                >
                  {cyclingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            incredible systems together.
          </h2>
        </div>

        {/* 3 Contact Channels Row */}
        <div className="grid gap-6 sm:grid-cols-3 pt-8 border-t border-white/10">
          {/* Email Channel */}
          <div className="rounded-2xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-smoke mb-2">
                <Mail size={13} className="text-crimson" />
                <span>Direct Email</span>
              </div>
              <a
                href={`mailto:${socialLinks.email}`}
                data-cursor="link"
                className="font-sans text-base font-bold text-bone hover:text-crimson transition block truncate"
              >
                {socialLinks.email}
              </a>
            </div>
            <p className="text-[11px] text-smoke mt-2 font-mono">Response within 24 hours</p>
          </div>

          {/* Meeting / Call Channel */}
          <div className="rounded-2xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-smoke mb-2">
                <Phone size={13} className="text-crimson" />
                <span>Discussion Request</span>
              </div>
              <a
                href={socialLinks.cal}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="font-sans text-base font-bold text-bone hover:text-crimson transition inline-flex items-center gap-1.5"
              >
                <span>Schedule a Meeting</span>
                <span>↗</span>
              </a>
            </div>
            <p className="text-[11px] text-smoke mt-2 font-mono">Video / Voice Consultations</p>
          </div>

          {/* Social Profiles */}
          <div className="rounded-2xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-smoke mb-2">
                <span className="status-dot" />
                <span>Connected Networks</span>
              </div>
              <div className="flex items-center gap-3">
                <Magnetic>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn"
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-bone hover:border-crimson hover:bg-crimson hover:text-white transition shadow-lg shadow-black/40 hover:shadow-crimson/30 active:scale-95"
                  >
                    <LinkedInIcon size={16} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-crimson px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100 shadow-md">
                      LinkedIn
                    </span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    title="GitHub Repositories"
                    aria-label="GitHub"
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-bone hover:border-crimson hover:bg-crimson hover:text-white transition shadow-lg shadow-black/40 hover:shadow-crimson/30 active:scale-95"
                  >
                    <GitHubIcon size={16} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-crimson px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100 shadow-md">
                      GitHub
                    </span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    data-cursor="link"
                    title="Direct Email"
                    aria-label="Email"
                    className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-bone hover:border-crimson hover:bg-crimson hover:text-white transition shadow-lg shadow-black/40 hover:shadow-crimson/30 active:scale-95"
                  >
                    <Mail size={16} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-crimson px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100 shadow-md">
                      Email
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>
            <p className="text-[11px] text-smoke mt-2 font-mono">Active verified profiles</p>
          </div>
        </div>
      </div>
    </section>
  );
}
