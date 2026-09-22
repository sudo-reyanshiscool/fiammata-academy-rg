import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';

export const MentorAccordion = ({ mentors }: { mentors: Mentor[] }) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);

  return (
    <div className="w-full max-w-[1280px] mx-auto py-8">
      {/* Desktop & Tablet: Horizontal Accordion */}
      <div className="hidden md:flex w-full items-stretch justify-center gap-2 h-[450px]">
        {mentors.map((mentor, index) => {
          const isActive = activeImage === index;
          return (
            <motion.div
              key={mentor.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-black"
              initial={false}
              animate={{
                width: isActive ? "100%" : "5rem",
                flexGrow: isActive ? 1 : 0,
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <img
                src={mentor.image}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${isActive ? 'opacity-95' : 'opacity-50 grayscale'}`}
                alt={mentor.name}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#C8102E]/20 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />

              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-end pb-8"
                  >
                    <span className="font-display-hero text-xl font-bold text-white uppercase -rotate-90 origin-bottom whitespace-nowrap mb-8">
                      {mentor.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute inset-0 flex flex-col justify-end p-8"
                  >
                    <div className="max-w-[400px]">
                      <h2 className="font-display-hero text-3xl lg:text-[40px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-lg uppercase">
                        {mentor.name}
                      </h2>
                      <p className="text-[14px] font-bold text-primary uppercase tracking-widest drop-shadow mb-4">
                        {mentor.role}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {mentor.expertise.slice(0, 3).map((exp, i) => (
                          <span 
                            key={exp} 
                            className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${
                              i === 0 
                                ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                                : 'bg-white/10 text-white border-white/20 backdrop-blur-sm'
                            }`}
                          >
                            {exp}
                          </span>
                        ))}
                      </div>

                      <p className="text-[14px] leading-relaxed text-white/90 mb-6 drop-shadow-sm line-clamp-2">
                        {mentor.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <Link 
                          to={`/request/${mentor.id}`} 
                          className="inline-flex items-center justify-center h-11 px-8 rounded bg-white text-[#C8102E] font-bold text-[13px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg btn-spring"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Request Mentor
                        </Link>
                        <Link 
                          to={`/mentor/${mentor.id}`} 
                          className="inline-flex items-center justify-center h-11 w-11 rounded bg-black/40 text-white font-bold backdrop-blur-md border border-white/20 hover:scale-105 transition-transform btn-spring"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Vertical Accordion */}
      <div className="flex md:hidden w-full flex-col items-stretch justify-center gap-2 h-[700px]">
        {mentors.map((mentor, index) => {
          const isActive = activeImage === index;
          return (
            <motion.div
              key={mentor.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-black"
              initial={false}
              animate={{
                height: isActive ? "100%" : "4.5rem",
                flexGrow: isActive ? 1 : 0,
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              onClick={() => setActiveImage(isActive ? null : index)}
            >
              <img
                src={mentor.image}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ${isActive ? 'opacity-95' : 'opacity-40 grayscale'}`}
                alt={mentor.name}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-[#C8102E]/20 to-transparent opacity-90" />

              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center px-6"
                  >
                    <span className="font-display-hero text-lg font-extrabold text-white uppercase tracking-widest">
                      {mentor.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute inset-0 flex flex-col justify-end p-6"
                  >
                    <h2 className="font-display-hero text-3xl font-extrabold text-white optical-display leading-none mb-1 drop-shadow-lg uppercase">
                      {mentor.name}
                    </h2>
                    <p className="text-[12px] font-bold text-primary uppercase tracking-widest drop-shadow mb-4">
                      {mentor.role}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <Link 
                        to={`/request/${mentor.id}`} 
                        className="flex-1 inline-flex items-center justify-center h-10 rounded bg-white text-[#C8102E] font-bold text-[12px] uppercase tracking-widest shadow-lg btn-spring"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Request
                      </Link>
                      <Link 
                        to={`/mentor/${mentor.id}`} 
                        className="inline-flex items-center justify-center h-10 w-10 rounded bg-black/40 text-white font-bold backdrop-blur-md border border-white/20 btn-spring"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
