import React, { useState } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { EASE } from './fx';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';

const workHistoryItems = [
  {
    id: 'hist-ojt',
    organization: 'Mahapola Port & Maritime Academy',
    title: 'Software Developer — On-the-Job Trainee (OJT)',
    period: '2026 – Present',
    description:
      'Developing and maintaining the institutional Learning Management System (LMS) to digitize maritime courses, trainee records, and academic grading workflows.',
  },
  {
    id: 'hist-sltc',
    organization: 'SLTC Research University',
    title: 'BSc (Hons) in Cloud Computing Undergraduate',
    period: '2024 – Present',
    description:
      'Specialized coursework in distributed computing, virtualization, cloud networks, operating systems, and enterprise application architectures.',
  },
  {
    id: 'hist-vta',
    organization: 'Vocational Training Authority (VTA) Padukka',
    title: 'Software Developer NVQ Level 4 Certification',
    period: '2025 – 2026',
    description:
      'Accredited vocational qualification covering structured programming in Java, relational database modeling, and software engineering practices.',
  },
  {
    id: 'hist-ieee',
    organization: 'IEEE SLTC Student Branch',
    title: 'Active Student Member',
    period: 'Active Member',
    description:
      'Active participant in technical engineering workshops, professional developer meetups, and open-source computing initiatives.',
  },
];

export default function AboutSection() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const displayedHistory = showAllHistory ? workHistoryItems : workHistoryItems.slice(0, 2);

  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-visible bg-ink">
      {/* Background Accent Atmosphere (contained so section remains overflow-visible for sticky) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(234,0,68,0.1),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="site-container">
        {/* Main Section Header matching reference video - NO "About Me" label */}
        <h2 className="font-hero font-extrabold text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] leading-[1.08] tracking-[-0.035em] text-white mb-10 sm:mb-14">
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
                  className="w-full h-[420px] object-cover object-top transition duration-700 group-hover:scale-105"
                />

                {/* Overlaid Crimson Gradient at Base */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-80" />

                {/* Overlaid Social Pills */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/75 p-2 backdrop-blur-md shadow-xl">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
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
                    data-cursor="link"
                    aria-label="GitHub"
                    title="GitHub"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-crimson hover:scale-105 transition active:scale-95"
                  >
                    <GitHubIcon size={14} />
                  </a>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    data-cursor="link"
                    aria-label="Email"
                    title="Direct Email"
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-crimson hover:scale-105 transition active:scale-95"
                  >
                    <Mail size={14} />
                  </a>
                </div>
              </div>

              {/* Sub-card Name & Role with pipe separators matching reference */}
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

            {/* Authenticated Signature Display */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <img
                  src="/assets/shakir-signature-crimson.png"
                  alt="Mohomed Shakir Signature"
                  className="h-12 w-auto object-contain opacity-95 drop-shadow-[0_0_15px_rgba(234,0,68,0.4)]"
                />
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 mt-1">
                  AUTHENTICATED SIGNATURE • 2026
                </p>
              </div>

              <div className="text-right">
                <span className="font-display text-2xl text-crimson-2 font-bold tracking-wide">BSc • NVQ 4</span>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">Dual-Track Grounded</p>
              </div>
            </div>

            {/* My work history Card matching reference video */}
            <div className="rounded-[24px] border border-white/10 bg-[#121215]/95 p-6 sm:p-7 backdrop-blur-md shadow-xl">
              <h4 className="font-hero text-xl sm:text-2xl font-bold text-white tracking-tight mb-5">
                My work history
              </h4>

              <div className="divide-y divide-white/10">
                {displayedHistory.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-white text-base sm:text-lg">
                          {item.organization}
                        </h5>
                        <p className="text-sm text-neutral-400 mt-0.5">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Show all / Hide Toggle Button */}
              <div className="text-center pt-3">
                <button
                  type="button"
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white hover:border-white/30 transition cursor-pointer"
                >
                  <span>{showAllHistory ? 'Hide' : 'Show all'}</span>
                  {showAllHistory ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
