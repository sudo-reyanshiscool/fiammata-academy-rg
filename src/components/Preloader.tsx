import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('INITIALIZING FIAMMATA OS');

  useEffect(() => {
    // Simulate boot sequence text changes
    const t1 = setTimeout(() => setText('ESTABLISHING SECURE CONNECTION'), 400);
    const t2 = setTimeout(() => setText('LOADING TELEMETRY SYSTEMS'), 800);
    const t3 = setTimeout(() => setText('SYSTEM READY.'), 1200);
    const finish = setTimeout(() => setLoading(false), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[999999] bg-[#000000] flex flex-col items-center justify-center font-sans"
        >
          <div className="w-full max-w-sm px-8 flex flex-col items-center gap-6">
            
            {/* Logo / Glitch Graphic */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
              <img src="/icons.svg" alt="Logo" className="w-8 h-8 opacity-50 z-10" />
            </motion.div>

            {/* Terminal Text */}
            <motion.div 
              key={text}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-4 flex items-center justify-center"
            >
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] font-mono">
                {text}
              </span>
            </motion.div>

            {/* Glowing Loading Bar */}
            <div className="w-full h-px bg-white/10 relative overflow-hidden mt-4">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_#C8102E]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
