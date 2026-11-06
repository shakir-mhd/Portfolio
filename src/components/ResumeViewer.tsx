import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, featuredProjects } from '../data/portfolioData';
import { EASE, Magnetic, SectionHeading } from './fx';
import { downloadResumePdf } from '../utils/downloadResume';

export default function ResumeViewer({ onView }: { onView: () => void }) {
  return (
    <section id="screenplay" className="relative pt-24 pb-36 overflow-hidden border-t border-white/[0.08]">
      <SectionHeading kicker="Curriculum Vitae" title="Professional Background & Resume" />

      <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14 items-start">
        {/* Left: Designed Screenplay Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <ResumeSheet />
        </motion.div>

        {/* Right: Quick Action Controls & Highlights */}
        <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
          <p className="font-serif text-3xl sm:text-4xl italic leading-tight text-bone">
            Qualifications, experience, and projects in one view.
          </p>
          <p className="font-body text-sm leading-relaxed text-mist">
            SLTC Cloud Computing degree track, NVQ Level 4 certification, institutional maritime OJT, and 4 production projects — view it here or take a copy with you.
          </p>

          <div className="flex flex-col gap-3">
            <Magnetic className="w-full">
              <button
                type="button"
                onClick={onView}
                className="font-ui flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-bone px-6 text-sm font-bold text-ink transition hover:bg-white cursor-pointer"
              >
                <span>VIEW FULLSCREEN RESUME</span>
              </button>
            </Magnetic>

            <Magnetic className="w-full">
              <button
                type="button"
                onClick={downloadResumePdf}
                data-cursor="link"
                className="font-ui glass flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-bone transition hover:bg-white/15 cursor-pointer active:scale-95"
              >
                <span>⤓ DOWNLOAD PDF RESUME</span>
              </button>
            </Magnetic>
          </div>

          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 text-center">
            {[
              { v: 'BSc', k: 'Cloud Degree' },
              { v: 'NVQ 4', k: 'Software Dev' },
              { v: String(featuredProjects.length), k: 'Projects' },
            ].map((s) => (
              <div key={s.k} className="bg-ink-2 p-4">
                <dd className="font-space font-bold text-2xl text-bone">{s.v}</dd>
                <dt className="font-ui mt-1 text-[9px] font-bold uppercase tracking-wider text-smoke">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function ResumeSheet() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#14141c,#0a0a0f)] p-6 sm:p-10 border border-white/10 shadow-2xl">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent"
      />

      {/* Header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <p className="font-ui text-[10px] font-bold tracking-[0.34em] text-smoke">STARRING</p>
          <h3 className="mt-1 font-space font-bold text-3xl sm:text-5xl text-bone tracking-tight">
            {personalInfo.fullName}
          </h3>
          <p className="font-ui text-xs font-semibold uppercase tracking-widest text-crimson-2 mt-1">
            {personalInfo.role}
          </p>
        </div>
        <div className="text-xs leading-relaxed text-mist sm:text-right">
          <a href={`mailto:${personalInfo.email}`} className="block hover:text-bone">
            {personalInfo.email}
          </a>
          <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">
            LinkedIn ↗
          </a>{' '}
          •{' '}
          <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="hover:text-bone">
            GitHub ↗
          </a>
        </div>
      </header>

      {/* Grid: Education & Experience */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Education & Credentials */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-crimson-2 border-b border-white/10 pb-1">
            Education & Certifications
          </h4>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-bone text-sm">SLTC Research University</p>
              <p className="text-xs text-mist">BSc (Hons) in Cloud Computing</p>
              <p className="text-[11px] text-smoke">2024 – Present • Padukka, Sri Lanka</p>
            </div>
            <div>
              <p className="font-bold text-bone text-sm">Vocational Training Authority (VTA)</p>
              <p className="text-xs text-mist">NVQ Level 4 in Software Development</p>
              <p className="text-[11px] text-smoke">2025 – 2026 • Padukka, Sri Lanka</p>
            </div>
            <div>
              <p className="font-bold text-bone text-sm">IEEE Student Member</p>
              <p className="text-xs text-mist">Active Student Chapter Participation</p>
            </div>
          </div>
        </div>

        {/* Experience & Practical Roles */}
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-crimson-2 border-b border-white/10 pb-1">
            Practical Experience
          </h4>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-bone text-sm">Mahapola Port & Maritime Academy</p>
              <p className="text-xs text-mist">Software Trainee (OJT)</p>
              <p className="text-[11px] text-smoke">2026 – Present • Colombo, Sri Lanka</p>
              <p className="text-xs text-bone/80 mt-1 leading-relaxed">
                Architecting institutional learning platforms, trainee record databases in MySQL, and academic grading workflows.
              </p>
            </div>
            <div>
              <p className="font-bold text-bone text-sm">Full-Stack Independent Engineering</p>
              <p className="text-xs text-mist">Lead Architect • Route Rescue LK</p>
              <p className="text-xs text-bone/80 mt-1 leading-relaxed">
                Deployed live spatial incident reporting engine with Leaflet map markers, roadside emergency dispatch, and Vercel edge CI/CD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
