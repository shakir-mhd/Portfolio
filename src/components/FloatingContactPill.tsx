import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { LinkedInIcon } from './BrandIcons';

export default function FloatingContactPill() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="mb-3 w-64 rounded-2xl border border-white/15 bg-ink-2/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <p className="text-xs font-bold text-bone">Direct Transmission</p>
            <p className="text-[11px] text-mist mt-0.5 mb-3">{personalInfo.email}</p>

            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center justify-between rounded-xl bg-crimson px-3.5 py-2.5 text-xs font-bold text-white hover:bg-crimson-2 transition shadow-md shadow-crimson/25"
              >
                <span className="flex items-center gap-2">
                  <Mail size={13} className="shrink-0" />
                  <span>Send Email</span>
                </span>
                <ArrowRight size={13} className="shrink-0" />
              </a>
              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-bone hover:border-crimson hover:bg-white/10 transition"
              >
                <span className="flex items-center gap-2">
                  <LinkedInIcon size={13} className="shrink-0 text-crimson" />
                  <span>LinkedIn Message</span>
                </span>
                <ArrowUpRight size={13} className="shrink-0 text-mist" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full border border-crimson/50 bg-ink-2/90 px-4 py-2.5 text-xs font-bold text-bone shadow-[0_0_25px_rgba(234,0,68,0.4)] backdrop-blur-md hover:border-crimson hover:bg-ink transition"
        aria-label="Toggle contact menu"
      >
        <span className="status-dot" />
        <span>LET&apos;S TALK</span>
      </button>
    </div>
  );
}
