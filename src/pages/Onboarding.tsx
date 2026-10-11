import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const slides = [
  {
    id: 1,
    subtitle: 'Welcome',
    title: 'Welcome to Fiammata Academy',
    description: 'Free mentorship for teams taking part in STEM Racing. No fees, no barriers.',
    icon: 'sports_score'
  },
  {
    id: 2,
    subtitle: 'Meet the mentors',
    title: 'Learn from people who have competed',
    description: 'Connect with National Finalists, World Finals competitors and award-winning engineers across every project discipline.',
    icon: 'groups'
  },
  {
    id: 3,
    subtitle: 'How it works',
    title: 'Get help with your next step',
    description: 'Request a mentor, follow your requests, review your team telemetry and strengthen your portfolio.',
    icon: 'menu_book'
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (current === slides.length - 1) {
      localStorage.setItem('hasSeenOnboarding', 'true');
      navigate('/auth-portal');
    } else {
      setCurrent(prev => prev + 1);
    }
  };

  const skip = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/auth-portal');
  };

  return (
    <div className="academy-onboarding fixed inset-0 z-[100] bg-[#000000] text-white flex flex-col justify-center items-center overflow-hidden cursor-auto">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C8102E]/20 via-black to-black pointer-events-none opacity-50" />
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute top-8 right-8 z-50">
        <button onClick={skip} className="text-white/60 hover:text-white font-semibold text-[12px] transition-colors px-4 py-2">
          Skip
        </button>
      </div>

      <div className="relative w-full max-w-[800px] px-8 z-10 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#C8102E]/10 border border-[#C8102E]/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[28px] text-[#ff73ba]">{slides[current].icon}</span>
            </div>
            
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 text-[12px] font-semibold text-[#ff73ba] mb-4"
            >
              {slides[current].subtitle}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display-hero text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02] mb-5"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed"
            >
              {slides[current].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex flex-col items-center gap-8 w-full">
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-10 bg-[#C8102E] shadow-[0_0_10px_rgba(200,16,46,0.8)]' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>

          <MagneticButton>
            <button
              onClick={nextSlide}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] px-8 h-12 transition-colors border border-primary"
            >
              <span>{current === slides.length - 1 ? 'Enter Academy' : 'Continue'}</span>
              <span className="material-symbols-outlined text-[18px]">
                {current === slides.length - 1 ? 'sports_score' : 'arrow_forward'}
              </span>
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
