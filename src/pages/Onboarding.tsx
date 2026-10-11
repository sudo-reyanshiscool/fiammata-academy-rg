import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

const slides = [
  {
    id: 1,
    subtitle: 'PROJECT APEX',
    title: 'WELCOME TO FIAMMATA ACADEMY',
    description: 'The definitive platform for elite STEM Racing mentorship. No fees, no barriers. Just high-performance engineering guidance.',
    icon: 'rocket_launch'
  },
  {
    id: 2,
    subtitle: 'GLOBAL ROSTER',
    title: 'LEARN FROM THE CHAMPIONS',
    description: 'Connect with National Finalists, World Stage competitors, and award-winning engineers across every project discipline.',
    icon: 'public'
  },
  {
    id: 3,
    subtitle: 'COMMAND CENTER',
    title: 'START YOUR ENGINES',
    description: 'Request a mentor, track telemetry in real-time, and optimize your portfolio to an elite standard.',
    icon: 'speed'
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
        <button onClick={skip} className="text-white/40 hover:text-white font-bold text-[11px] uppercase tracking-widest transition-colors px-4 py-2">
          Skip Initialization
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
            <div className="w-20 h-20 rounded-2xl bg-[#C8102E]/10 border border-[#C8102E]/30 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,16,46,0.2)]">
              <span className="material-symbols-outlined text-[40px] text-[#C8102E]">{slides[current].icon}</span>
            </div>
            
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8102E] mb-6"
            >
              {slides[current].subtitle}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display-hero text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none mb-6 drop-shadow-lg"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/60 max-w-[600px] leading-relaxed"
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
              className="inline-flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#9B0C23] text-white font-bold text-[14px] uppercase tracking-widest px-12 h-14 rounded transition-all shadow-[0_0_20px_rgba(200,16,46,0.4)] hover:shadow-[0_0_40px_rgba(200,16,46,0.6)] border border-[#C8102E]"
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
