import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';
import MentorCard from './MentorCard';

export const MentorAccordion = ({ mentors }: { mentors: Mentor[] }) => {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <div 
      className="w-full mx-auto"
      onMouseLeave={() => setActiveImage(null)}
    >
      {/* Desktop & Tablet: Horizontal Accordion */}
      <div className="hidden lg:flex w-full items-stretch justify-center gap-6 h-[500px]">
        {mentors.map((mentor, index) => {
          const isActive = activeImage === index;
          const isAnyActive = activeImage !== null;
          const isCompressed = isAnyActive && !isActive;

          return (
            <motion.div
              key={mentor.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl h-full"
              initial={false}
              animate={{
                width: isCompressed ? "5rem" : isActive ? "45rem" : `${100 / mentors.length}%`,
                flexGrow: isActive ? 0 : isCompressed ? 0 : 1,
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              onHoverStart={() => setActiveImage(index)}
              onClick={() => setActiveImage(index)}
            >
              {/* Default State (Normal Card) */}
              <AnimatePresence>
                {!isAnyActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* We can just render the original MentorCard component here! */}
                    <div className="pointer-events-none w-full h-full">
                      <MentorCard mentor={mentor} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Compressed State (Sliver) */}
              <AnimatePresence>
                {isCompressed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 border border-white/10 shadow-xl bg-black rounded-2xl overflow-hidden"
                  >
                    <img
                      src={mentor.image}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-40 grayscale transition-all duration-700"
                      alt={mentor.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#C8102E]/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                      <span className="font-display-hero text-xl font-bold text-white uppercase -rotate-90 origin-bottom whitespace-nowrap mb-8 drop-shadow-lg">
                        {mentor.name}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded State (Huge Card, Image Right, Text Left) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-row bg-gradient-to-br from-[#C8102E] to-[#8B0000] border border-[#C8102E] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(217,56,45,0.5)]"
                  >
                    {/* Left Side: Apt Description */}
                    <div className="flex-1 p-10 flex flex-col justify-center relative z-10 bg-black/40 backdrop-blur-sm">
                      <div className="max-w-[400px]">
                        <h2 className="font-display-hero text-[40px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-lg uppercase">
                          {mentor.name}
                        </h2>
                        <p className="text-[14px] font-bold text-primary uppercase tracking-widest drop-shadow mb-6">
                          {mentor.role}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {mentor.expertise.map((exp, i) => (
                            <span 
                              key={exp} 
                              className={`px-3 py-1.5 rounded text-[11px] font-bold tracking-widest uppercase border ${
                                i === 0 
                                  ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                                  : 'bg-white/10 text-white border-white/20 backdrop-blur-sm'
                              }`}
                            >
                              {exp}
                            </span>
                          ))}
                        </div>

                        <p className="text-[15px] leading-relaxed text-white/90 mb-8 drop-shadow-sm">
                          {mentor.description}
                        </p>

                        <div className="flex items-center gap-3">
                          <Link 
                            to={`/request/${mentor.id}`} 
                            className="inline-flex items-center justify-center h-12 px-8 rounded bg-white text-[#C8102E] font-bold text-[14px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg btn-spring"
                          >
                            Request Mentor
                          </Link>
                          <Link 
                            to={`/mentor/${mentor.id}`} 
                            className="inline-flex items-center justify-center h-12 w-12 rounded bg-black/40 text-white font-bold backdrop-blur-md border border-white/20 hover:scale-105 transition-transform btn-spring"
                          >
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-[45%] relative shrink-0 bg-[#0a0a0a]">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-95 grayscale-[10%]" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / Tablet fallback (Original Grid) */}
      <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6">
        {mentors.map(mentor => (
          <div key={mentor.id} className="h-full">
            <MentorCard mentor={mentor} />
          </div>
        ))}
      </div>
    </div>
  );
};
