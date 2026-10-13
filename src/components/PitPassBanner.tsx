import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function PitPassBanner() {
  const { user, profile } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // Only show if user is logged in, but has not completed their profile/team yet
  if (!user || dismissed || profile?.profileCompleted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="w-full bg-gradient-to-r from-[#E6007E]/20 via-[#1a0507] to-[#0a0a0a] border-b border-primary/30 px-4 py-3 relative z-30"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] font-bold text-white tracking-wide">
                Activate your Official Team Pit Pass
              </p>
              <p className="text-[11px] text-white/60">
                Register your team name & school once to unlock 1-click mentor connections across the academy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/profile"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(230,0,126,0.3)] btn-spring"
            >
              <span>Setup in 15s</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded text-white/40 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
