import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TextRoll } from './TextRoll';

function ConfirmSignOutButton({ onConfirm }: { onConfirm: () => void }) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isConfirming ? (
          <motion.button
            key="confirm"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            onClick={() => {
              onConfirm();
              setIsConfirming(false);
            }}
            className="text-[12px] font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest whitespace-nowrap bg-red-500/10 px-3 py-1.5 rounded"
          >
            CONFIRM OUT
          </motion.button>
        ) : (
          <motion.button
            key="signout"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            onClick={() => setIsConfirming(true)}
            className="text-[12px] font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest whitespace-nowrap"
          >
            SIGN OUT
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isMentor, signOut } = useAuth();
  const { addToast } = useToast();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    addToast('Connection severed. You have successfully signed out.', 'success');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 70 && !isScrolled) setIsScrolled(true);
    else if (latest < 20 && isScrolled) setIsScrolled(false);
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

  const mobileLinkClass = (path: string) => {
    if (isActive(path)) {
      return "block py-4 text-2xl font-display-hero font-extrabold text-white uppercase tracking-widest border-l-4 border-primary pl-4 bg-white/5";
    }
    return "block py-4 text-2xl font-display-hero font-bold text-white/50 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest pl-4";
  };

  return (
    <>
      <motion.header 
        initial={false}
        animate={{
          paddingTop: isScrolled ? "12px" : "0px",
          paddingBottom: isScrolled ? "0px" : "0px",
        }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.div 
          initial={false}
          animate={{
            width: isScrolled ? "min(100%, 1140px)" : "100%",
            borderRadius: isScrolled ? "16px" : "0px",
            y: isScrolled ? 16 : 0,
            borderTopColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
            borderLeftColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
            borderRightColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "transparent",
            boxShadow: isScrolled ? "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset" : "0 4px 30px rgba(0,0,0,0.5)",
            height: isScrolled ? "64px" : "72px"
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="pointer-events-auto glass-panel flex items-center justify-between px-6 lg:px-10 overflow-hidden relative"
        >
          <div className="flex items-center gap-3 relative z-10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3.5 group whitespace-nowrap btn-spring">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDixOz_aPV5S18pmP1os4spfKgu8ymEWq0kj8m9olfFVmxFNEt--bdb5BuhKh0pIhmBkzCOHenEvTyehgKyyOi7OcVBA-Tzb_zvwAstMkkwvfoltZwvJBcyt0Csr-alwTzaL8QnzwgxCN3MG8g9bA6B9FA-yIozUyhXgQZc2y7v-x7ytniNu6S_8RfwNSsB7iconm6rB4ARTmYyoHeLETOZkE46lsjZUXAsdb3lXJ0bsQRBC6lF8MNR73agijG6x2eKaQ" 
                alt="Fiammata Racing" 
                className="h-[32px] w-auto object-contain rounded transition-transform group-hover:scale-105" 
              />
              <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-extrabold text-[13px] tracking-wider text-white uppercase optical-display font-display-hero">FIAMMATA ACADEMY</span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-primary uppercase drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">MENTORSHIP</span>
              </div>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 relative z-10 whitespace-nowrap">
            <Link to="/" className={`${linkClass("/")} btn-spring`}>
              <TextRoll>Home</TextRoll>
            </Link>
            <Link to="/find-a-mentor" className={`${linkClass("/find-a-mentor")} btn-spring`}>
              <TextRoll>Find a Mentor</TextRoll>
            </Link>
            <Link to="/ask-an-expert" className={`${linkClass("/ask-an-expert")} btn-spring`}>
              <TextRoll>Ask an Expert</TextRoll>
            </Link>
            <Link to="/workshops" className={`${linkClass("/workshops")} btn-spring`}>
              <TextRoll>Workshops</TextRoll>
            </Link>
          </nav>
          
          <div className="flex items-center gap-3 relative z-10">
            {user ? (
              <div className="flex items-center gap-2">
                {isMentor ? (
                  <Link 
                    to="/mentor/dashboard" 
                    className="hidden lg:inline-flex items-center px-4 py-2 rounded text-[11px] font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 uppercase tracking-widest whitespace-nowrap btn-spring"
                  >
                    Command Center
                  </Link>
                ) : (
                  <Link 
                    to="/my-requests" 
                    className="hidden lg:inline-flex items-center px-4 py-2 rounded text-[11px] font-bold text-white hover:bg-white/5 border border-white/10 uppercase tracking-widest whitespace-nowrap btn-spring"
                  >
                    My Requests
                  </Link>
                )}
                <div className="hidden lg:block btn-spring">
                  <ConfirmSignOutButton onConfirm={handleSignOut} />
                </div>
              </div>
            ) : (
              <Link 
                to="/auth-portal"
                className="hidden lg:block text-[12px] font-bold text-white/50 hover:text-white transition-colors ml-2 uppercase tracking-widest whitespace-nowrap btn-spring"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button 
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded bg-white/5 text-white/70 hover:text-white hover:bg-white/10 btn-spring"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 glass-panel pt-24 px-6 pb-6 flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-2 flex-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass("/")} btn-spring`}>Home</Link>
              <Link to="/find-a-mentor" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass("/find-a-mentor")} btn-spring`}>Find a Mentor</Link>
              <Link to="/ask-an-expert" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass("/ask-an-expert")} btn-spring`}>Ask an Expert</Link>
              <Link to="/workshops" onClick={() => setIsMobileMenuOpen(false)} className={`${mobileLinkClass("/workshops")} btn-spring`}>Workshops</Link>
              
              <div className="mt-8 border-t border-white/10 pt-8 flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Authenticated As {isMentor ? 'Mentor' : 'Student'}</div>
                    {isMentor ? (
                      <Link 
                        to="/mentor/dashboard" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 h-14 rounded bg-primary text-white font-bold text-[14px] uppercase tracking-widest btn-spring"
                      >
                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                        Command Center
                      </Link>
                    ) : (
                      <Link 
                        to="/my-requests" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 h-14 rounded bg-white/10 text-white font-bold text-[14px] uppercase tracking-widest border border-white/20 btn-spring"
                      >
                        <span className="material-symbols-outlined text-[18px]">list_alt</span>
                        My Requests
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 h-14 rounded bg-red-500/10 text-red-500 font-bold text-[14px] uppercase tracking-widest border border-red-500/20 mt-2 btn-spring"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth-portal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 h-14 rounded bg-white text-black font-bold text-[14px] uppercase tracking-widest btn-spring"
                  >
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Secure Login
                  </Link>
                )}
              </div>
            </div>
            
            <div className="mt-auto pt-8 text-center text-[10px] text-white/30 uppercase tracking-widest font-bold">
              Fiammata OS v2.0
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
