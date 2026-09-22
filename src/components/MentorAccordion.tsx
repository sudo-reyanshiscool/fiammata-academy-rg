import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';
import MentorCard from './MentorCard';

const smoothTransition = { ease: [0.16, 1, 0.3, 1] as const, duration: 0.8 };

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
              className="relative cursor-pointer overflow-hidden rounded-2xl h-full border border-white/5"
              initial={false}
              animate={{
                width: isCompressed ? "5rem" : isActive ? "50rem" : `${100 / mentors.length}%`,
                flexGrow: isActive ? 0 : isCompressed ? 0 : 1,
              }}
              transition={smoothTransition}
              onHoverStart={() => setActiveImage(index)}
              onClick={() => setActiveImage(index)}
            >
              {/* Default State (Clean Vertical Card - Just Image and Tags) */}
              <AnimatePresence>
                {!isAnyActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full bg-black group"
                  >
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-90 transition-all duration-700 ease-out grayscale-[20%]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 via-[#8B0000]/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                      <h2 className="font-display-hero text-[28px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-md">
                        {mentor.name.toUpperCase()}
                      </h2>
                      <p className="text-[13px] font-bold text-white/90 uppercase tracking-widest drop-shadow mb-4">
                        {mentor.role.split(' Lead')[0]}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.expertise.slice(0, 3).map((exp, i) => (
                          <span 
                            key={exp} 
                            className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${
                              i === 0 
                                ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                                : 'bg-white/20 text-white border-white/30 backdrop-blur-sm'
                            }`}
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-black overflow-hidden"
                  >
                    <img
                      src={mentor.image}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-30 grayscale transition-all duration-700"
                      alt={mentor.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#C8102E]/20 to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                      <span className="font-display-hero text-xl font-bold text-white uppercase -rotate-90 origin-bottom whitespace-nowrap mb-8 drop-shadow-lg opacity-50">
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
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-row bg-gradient-to-br from-[#C8102E] to-[#8B0000] overflow-hidden"
                  >
                    {/* Left Side: Apt Description */}
                    <div className="flex-[1.2] p-12 lg:p-16 flex flex-col justify-center relative z-10 bg-black/40 backdrop-blur-md">
                      <motion.div 
                        className="max-w-[450px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                      >
                        <h2 className="font-display-hero text-[48px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-lg uppercase">
                          {mentor.name}
                        </h2>
                        <p className="text-[14px] font-bold text-primary uppercase tracking-widest drop-shadow mb-6">
                          {mentor.role}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
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

                        <p className="text-[16px] leading-relaxed text-white/90 mb-10 drop-shadow-sm">
                          {mentor.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <Link 
                            to={`/request/${mentor.id}`} 
                            className="inline-flex items-center justify-center h-12 px-8 rounded bg-white text-[#C8102E] font-bold text-[14px] uppercase tracking-widest shadow-lg btn-spring"
                          >
                            Request Mentor
                          </Link>
                          <Link 
                            to={`/mentor/${mentor.id}`} 
                            className="inline-flex items-center justify-center h-12 w-12 rounded bg-black/40 text-white font-bold backdrop-blur-md border border-white/20 btn-spring"
                          >
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </Link>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="flex-[0.8] relative shrink-0 bg-[#0a0a0a]">
                      <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        src={mentor.image} 
                        alt={mentor.name} 
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale-[10%]" 
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
