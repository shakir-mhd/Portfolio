import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { faqsData, socialLinks } from '../data/portfolioData';
import shakirNavHeadshot from '../assets/shakir-nav-headshot.png';

export default function FAQSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIdx = (i: number) => {
    setOpenIndices((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  return (
    <section id="faqs" className="relative py-20 sm:py-28 overflow-visible border-t border-white/[0.08]">
      <div className="site-container">
        {/* Simple, bold title matching Ruchit's video */}
        <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-8 sm:mb-12">
          FAQs
        </h2>

        {/* 2-Column Responsive Layout: Accordion (Left) + Sticky Discovery Call Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative">
          {/* Left Column: Numbered Accordion List (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqsData.map((faq, i) => {
              const isOpen = openIndices.includes(i);
              const num = String(i + 1).padStart(2, '0');
              return (
                <div
                  key={faq.q}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-white/20 bg-[#1c1b20]'
                      : 'border-white/[0.08] bg-[#141417] hover:border-white/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleIdx(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 pr-3 transition-all duration-200">
                      <span
                        className={`font-mono-custom text-sm font-semibold transition-all duration-200 shrink-0 ${
                          isOpen ? 'opacity-0 w-0 -mr-3.5 overflow-hidden' : 'opacity-40 text-white w-6'
                        }`}
                      >
                        {num}
                      </span>
                      <span className="font-space font-bold text-base sm:text-lg text-white leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/70 font-mono-custom text-lg transition-transform duration-200">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0 font-body text-sm sm:text-base leading-relaxed text-neutral-300">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Crimson Discovery Card matching video (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="relative overflow-hidden rounded-[28px] bg-[#ea0044] p-8 sm:p-10 text-white shadow-2xl">
              {/* Avatar circle with composite studio headshot */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/25 mb-6 shadow-md bg-neutral-900">
                <img
                  src={shakirNavHeadshot}
                  alt="Mohomed Shakir"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Headline */}
              <h3 className="font-space font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Still not sure?
                <br />
                Book a free discovery call.
              </h3>

              {/* Body Copy */}
              <p className="font-body text-white/90 text-sm sm:text-base leading-relaxed mt-4 mb-8">
                It should make your engineering clear, strong, and easy to trust.
                <br /><br />
                If that&apos;s what you&apos;re aiming for, we should talk.
              </p>

              {/* Bottom CTA Row */}
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href={`mailto:${socialLinks.email}?subject=Discovery%20Call%20-%20Mohomed%20Shakir`}
                  className="font-ui inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-bold shadow-xl hover:bg-neutral-900 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book a Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
