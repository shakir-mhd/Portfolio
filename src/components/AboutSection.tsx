import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { EASE } from './fx';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';

interface WorkHistory {
  id: string;
  organization: string;
  title: string;
  period: string;
  status?: string;
}

const workHistoryItems: WorkHistory[] = [
  {
    id: 'hist-ojt',
    organization: 'Mahapola Port & Maritime Academy',
    title: 'Software Developer — On-the-Job Trainee (OJT)',
    period: '2026 – Present',
    status: 'Ongoing',
  },
  {
    id: 'hist-freelance',
    organization: 'Freelance & Open Source Projects',
    title: 'Cloud & Full-Stack Developer',
    period: 'Ongoing',
    status: 'Ongoing',
  },
  {
    id: 'hist-sltc',
    organization: 'SLTC Research University',
    title: 'BSc (Hons) in Cloud Computing Undergraduate',
    period: '2024 – Present',
  },
  {
    id: 'hist-vta',
    organization: 'Vocational Training Authority (VTA) Padukka',
    title: 'Software Developer NVQ Level 4 Certified',
    period: '2025 – 2026',
  },
  {
    id: 'hist-ieee',
    organization: 'IEEE SLTC Student Branch',
    title: 'Active Student Member & Tech Contributor',
    period: '2024 – Present',
  },
];

export default function AboutSection() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const displayedHistory = showAllHistory ? workHistoryItems : workHistoryItems.slice(0, 2);

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-visible bg-ink">
      {/* Background Accent Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(234,0,68,0.1),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="site-container">
        {/* Main Section Header matching reference */}
        <h2 className="font-space font-bold text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.12] tracking-[-0.03em] text-white mb-8 sm:mb-12">
          Designing experiences <br />
          <span className="text-crimson">that make sense.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-8 lg:gap-14 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Pinned / Sticky Image Card & Identity        */}
          {/* ========================================================= */}
          <div className="w-full max-w-[380px] mx-auto lg:sticky lg:top-28 lg:self-start z-10 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-4"
            >
              {/* Portrait Image Card */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#16161f] shadow-2xl group">
                <img
                  src="/assets/shakir-portrait.png"
                  alt={personalInfo.fullName}
                  className="w-full h-[430px] object-cover object-top transition duration-700 group-hover:scale-105"
                />

                {/* Overlaid Crimson Gradient at Base */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80" />

                {/* Overlaid Social Pills */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/75 p-2 backdrop-blur-md shadow-xl">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-crimson hover:scale-105 transition active:scale-95"
                  >
                    <LinkedInIcon size={14} />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-crimson hover:scale-105 transition active:scale-95"
                  >
                    <GitHubIcon size={14} />
                  </a>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    aria-label="Email"
                    title="Direct Email"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-crimson hover:scale-105 transition active:scale-95"
                  >
                    <Mail size={14} />
                  </a>
                </div>
              </div>

              {/* Sub-card Name & Role matching Ruchit reference */}
              <div className="pt-1">
                <h3 className="font-hero text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {personalInfo.fullName}
                </h3>
                <p className="text-sm font-medium text-neutral-400 mt-1.5 leading-snug">
                  Cloud Engineer &nbsp;|&nbsp; Full-Stack Developer &nbsp;|&nbsp; Systems Architecture
                </p>
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Bio Narrative, Signature & Work History     */}
          {/* ========================================================= */}
          <div className="space-y-8">
            {/* Bio Narrative */}
            <div className="space-y-5 text-base sm:text-lg leading-relaxed text-neutral-300 font-normal">
              {personalInfo.aboutBio.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Authenticated Signature Display matching reference video */}
            <div className="pt-2 flex flex-col items-start">
              <img
                src="/assets/shakir-signature-crimson.png"
                alt="Mohomed Shakir Signature"
                className="h-12 w-auto object-contain opacity-95 drop-shadow-[0_0_15px_rgba(234,0,68,0.4)]"
              />
            </div>

            {/* My work history Section matching Screen Recording 2026-11-06 141312.mp4 */}
            <div className="space-y-4 pt-2">
              <h4 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                My work history
              </h4>

              {/* Individual Separate Rounded Cards matching Ruchit reference */}
              <div className="space-y-3">
                <AnimatePresence initial={false}>
                  {displayedHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-2xl bg-[#141417] border border-white/[0.08] hover:border-white/20 p-5 sm:p-6 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h5
                          className="font-bold text-white text-base sm:text-[17px] tracking-tight"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {item.organization}
                        </h5>
                        <span className="text-xs sm:text-[13px] text-neutral-400 font-normal shrink-0">
                          {item.period}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 mt-1.5">
                        <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                          {item.title}
                        </p>
                        {item.status && (
                          <span className="text-xs text-neutral-500 font-normal shrink-0">
                            {item.status}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Show all / Hide Pill Toggle with Red Dot matching Ruchit reference */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16161b] px-4 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:border-white/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{showAllHistory ? 'Hide' : 'Show all'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
