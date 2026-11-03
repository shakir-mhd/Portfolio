import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollLock } from '../hooks/smoothScroll';
import { personalInfo } from '../data/portfolioData';
import { ResumeSheet } from './ResumeViewer';
import { downloadResumePdf } from '../utils/downloadResume';

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4">
          <span className="font-display text-xl text-bone">CURRICULUM VITAE • FULL RESUME</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={downloadResumePdf}
              className="rounded-full bg-crimson px-4 py-1.5 text-xs font-bold text-white shadow-lg hover:bg-crimson-2 transition cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>⤓</span>
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-bone hover:bg-white/20 transition"
            >
              ✕
            </button>
          </div>
        </div>

        <ResumeSheet />
      </motion.div>
    </motion.div>
  );
}
