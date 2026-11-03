import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqsData } from '../data/portfolioData';
import { SectionHeading } from './fx';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-20 overflow-hidden">
      <SectionHeading kicker="Intel & FAQs" title="Frequently Asked Questions" />

      <div className="site-container max-w-4xl space-y-4">
        {faqsData.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2 transition hover:border-white/20"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-sans text-base sm:text-lg font-bold text-bone">
                  {faq.q}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-bone font-mono text-sm transition-transform duration-300 ${
                    isOpen ? 'rotate-45 text-crimson' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-white/5 p-6 pt-0 text-sm sm:text-base leading-relaxed text-mist">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
