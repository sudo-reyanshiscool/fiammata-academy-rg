import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';
import MentorCard from './MentorCard';

export const MentorAccordion = ({ mentors }: { mentors: Mentor[] }) => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHoverStart = (index: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    // 300ms delay if first hover (avoids accidental scroll activation)
    // 100ms delay if moving between mentors (feels more responsive once active)
    const delay = activeImage === null ? 300 : 100;
    
    hoverTimeout.current = setTimeout(() => {
      setActiveImage(index);
    }, delay);
  };

  const handleParentMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveImage(null);
  };

  const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div 
      className="w-full mx-auto"
      onMouseLeave={handleParentMouseLeave}
    >
      {/* Desktop & Tablet: Horizontal Accordion */}
      <div className="hidden lg:flex w-full items-stretch justify-center gap-6 h-[550px]">
        {mentors.map((mentor, index) => {
          const isActive = activeImage === index;
          const isAnyActive = activeImage !== null;
          const isCompressed = isAnyActive && !isActive;

          return (
            <motion.div
              key={mentor.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl h-full border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
              initial={false}
              animate={{
                width: isCompressed ? "5rem" : isActive ? "50rem" : `${100 / mentors.length}%`,
                flexGrow: isActive ? 0 : isCompressed ? 0 : 1,
              }}
              transition={smoothTransition}
              onHoverStart={() => handleHoverStart(index)}
              onClick={() => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                setActiveImage(index);
              }}
            >
              {/* Persistent Background Image (Avoids DOM unmounting lag) */}
              <motion.div 
                className="absolute inset-y-0 right-0 h-full bg-black origin-right"
                animate={{
                  width: isActive ? "45%" : "100%",
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover object-center" 
                />
                {/* Hardware-accelerated overlay instead of expensive CSS filters */}
                <motion.div 
                  className="absolute inset-0 bg-black pointer-events-none"
                  initial={false}
                  animate={{ opacity: isCompressed ? 0.7 : 0.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: "opacity" }}
                />
              </motion.div>

              {/* Compressed State (Sliver Gradient & Text) */}
              <motion.div
                initial={false}
                animate={{ opacity: isCompressed ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#8B0000]/90 via-[#C8102E]/20 to-black/60"
              >
                <span 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display-hero text-2xl font-bold text-white uppercase drop-shadow-lg opacity-70 tracking-widest whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {mentor.name}
                </span>
              </motion.div>

              {/* Default State (Vertical Card) */}
              <motion.div
                initial={false}
                animate={{ opacity: (!isActive && !isCompressed) ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-[#8B0000]/90 via-[#8B0000]/40 to-transparent"
              >
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
                          : 'bg-white/20 text-white border-white/30'
                      }`}
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Expanded State (Huge Card) */}
              <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.1 : 0 }}
                className={`absolute inset-0 pointer-events-none flex flex-row ${isActive ? 'pointer-events-auto' : ''}`}
              >
                {/* Solid Red Left Panel (Fixed width prevents text wrapping during expansion) */}
                <div className="w-[480px] shrink-0 h-full bg-[#5A0A15] p-12 lg:p-16 flex flex-col justify-center border-r border-[#8B0000] relative z-10">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none" />
                  <motion.div 
                    className="w-full relative z-10"
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                      }
                    }}
                    style={{ perspective: "1000px" }}
                  >
                    <motion.h2 
                      variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -30 },
                        show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      style={{ transformOrigin: "bottom center" }}
                      className="font-display-hero text-[44px] font-extrabold text-white optical-display leading-[0.9] mb-1 drop-shadow-lg uppercase"
                    >
                      {mentor.name}
                    </motion.h2>

                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, y: 30, rotateX: -20 },
                        show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="text-[13px] font-bold text-[#C8102E] bg-white/10 px-3 py-1 inline-block rounded mb-4 uppercase tracking-widest"
                    >
                      {mentor.role}
                    </motion.p>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {mentor.expertise.map((exp, i) => (
                        <span 
                          key={exp} 
                          className={`px-3 py-1.5 rounded text-[11px] font-bold tracking-widest uppercase border ${
                            i === 0 
                              ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                              : 'bg-transparent text-white/80 border-white/20'
                          }`}
                        >
                          {exp}
                        </span>
                      ))}
                    </motion.div>

                    <motion.p 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="text-[14px] leading-relaxed text-white/80 mb-6"
                    >
                      {mentor.description}
                    </motion.p>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                      }}
                      className="flex items-center gap-3"
                    >
                      <Link 
                        to={`/request/${mentor.id}`} 
                        className="inline-flex items-center justify-center h-12 px-8 rounded bg-white hover:bg-gray-100 text-[#C8102E] font-bold text-[14px] uppercase tracking-widest shadow-lg btn-spring pointer-events-auto"
                      >
                        Request Mentor
                      </Link>
                      <Link 
                        to={`/mentor/${mentor.id}`} 
                        className="inline-flex items-center justify-center h-12 w-12 rounded bg-black/40 hover:bg-black/60 text-white font-bold border border-white/20 btn-spring pointer-events-auto transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Dark Gradient Overlay for the remaining visible image on the right */}
                <div className="flex-1 h-full bg-gradient-to-r from-black/60 to-transparent relative z-10 pointer-events-none" />
              </motion.div>
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
