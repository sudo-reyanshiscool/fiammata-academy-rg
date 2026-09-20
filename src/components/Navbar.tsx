import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function ConfirmSignOutButton({ onConfirm }: { onConfirm: () => void }) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <button
      onClick={() => {
        if (isConfirming) {
          onConfirm();
        } else {
          setIsConfirming(true);
        }
      }}
      onMouseLeave={() => setIsConfirming(false)}
      className={`relative overflow-hidden px-4 py-2 rounded border text-[11px] uppercase tracking-widest font-bold transition-all w-[100px] flex justify-center ${
        isConfirming 
          ? 'bg-[#C8102E]/20 text-[#C8102E] border-[#C8102E]/50 shadow-[0_0_15px_rgba(200,16,46,0.2)]' 
          : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
      }`}
    >
      <AnimatePresence mode="wait">
        {isConfirming ? (
          <motion.span
            key="confirm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute"
          >
            Confirm?
          </motion.span>
        ) : (
          <motion.span
            key="signout"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute"
          >
            Sign Out
          </motion.span>
        )}
      </AnimatePresence>
      <span className="opacity-0">Sign Out</span>
    </button>
  );
}

export default function Navbar() {
  const location = useLocation();
  const { user, isMentor, signOut } = useAuth();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => {
    if (isActive(path)) {
      return "relative py-2 text-[12px] font-bold text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:rounded-full transition-colors uppercase tracking-widest";
    }
    return "text-[12px] font-semibold text-white/50 hover:text-white py-2 transition-colors uppercase tracking-widest";
  };

  return (
    <motion.header 
      initial={false}
      animate={{
        paddingTop: isScrolled ? "12px" : "0px",
        paddingBottom: isScrolled ? "0px" : "0px",
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <motion.div 
        animate={{
          width: isScrolled ? "95%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          borderRadius: isScrolled ? "100px" : "0px",
          backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.75)" : "rgba(0, 0, 0, 0.9)",
          borderBottomColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
          borderTopColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
          borderLeftColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
          borderRightColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
          boxShadow: isScrolled ? "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset" : "0 4px 30px rgba(0,0,0,0.5)",
          height: isScrolled ? "64px" : "72px"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto backdrop-blur-xl border flex items-center justify-between px-6 lg:px-10 overflow-hidden relative"
      >
        <div className="flex items-center gap-3 relative z-10">
          <Link to="/" className="flex items-center gap-3.5 group whitespace-nowrap">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDixOz_aPV5S18pmP1os4spfKgu8ymEWq0kj8m9olfFVmxFNEt--bdb5BuhKh0pIhmBkzCOHenEvTyehgKyyOi7OcVBA-Tzb_zvwAstMkkwvfoltZwvJBcyt0Csr-alwTzaL8QnzwgxCN3MG8g9bA6B9FA-yIozUyhXgQZc2y7v-x7ytniNu6S_8RfwNSsB7iconm6rB4ARTmYyoHeLETOZkE46lsjZUXAsdb3lXJ0bsQRBC6lF8MNR73agijG6x2eKaQ" 
              alt="Fiammata Racing" 
              className="h-[32px] w-auto object-contain rounded transition-transform group-hover:scale-105" 
            />
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-extrabold text-[13px] tracking-wider text-white uppercase font-display-hero">FIAMMATA ACADEMY</span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">MENTORSHIP</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 relative z-10 whitespace-nowrap">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/find-a-mentor" className={linkClass("/find-a-mentor")}>Find a Mentor</Link>
          <Link to="/ask-an-expert" className={linkClass("/ask-an-expert")}>Ask an Expert</Link>
          <Link to="/workshops" className={linkClass("/workshops")}>Workshops</Link>
        </nav>
        
        <div className="flex items-center gap-3 relative z-10">
          {user ? (
            <div className="flex items-center gap-2">
              {isMentor ? (
                <Link 
                  to="/mentor/dashboard" 
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded text-[11px] font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors uppercase tracking-widest whitespace-nowrap"
                >
                  Command Center
                </Link>
              ) : (
                <Link 
                  to="/my-requests" 
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded text-[11px] font-bold text-white hover:bg-white/5 transition-colors border border-white/10 uppercase tracking-widest whitespace-nowrap"
                >
                  My Requests
                </Link>
              )}
              <ConfirmSignOutButton onConfirm={signOut} />
            </div>
          ) : (
            <Link 
              to="/auth-portal"
              className="text-[12px] font-bold text-white/50 hover:text-white transition-colors ml-2 uppercase tracking-widest whitespace-nowrap"
            >
              Log In
            </Link>
          )}
        </div>
      </motion.div>
    </motion.header>
  );
}
