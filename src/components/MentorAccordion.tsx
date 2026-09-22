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
    
    // 200ms intent delay when entering accordion from scroll (prevents accidental trigger)
    // 80ms responsive delay when sliding between mentors
    const delay = activeImage === null ? 200 : 80;
    
    hoverTimeout.current = setTimeout(() => {
      setActiveImage(index);
    }, delay);
  };

  const handleParentMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    // 100ms tolerance buffer so a micro cursor slip off the card edge doesn't abruptly collapse it
    hoverTimeout.current = setTimeout(() => {
      setActiveImage(null);
    }, 100);
  };

  const smoothTransition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

  const textStaggerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 18, rotateX: -10 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <div 
      className="w-full mx-auto"
      onMouseLeave={handleParentMouseLeave}
    >
      {/* Desktop & Tablet: Horizontal Expanding Accordion */}
      <div className="hidden lg:flex w-full items-stretch justify-center gap-4 lg:gap-5 h-[550px]">
        {mentors.map((mentor, index) => {
          const isActive = activeImage === index;
          const isAnyActive = activeImage !== null;
          const isCompressed = isAnyActive && !isActive;

          return (
            <motion.div
              key={mentor.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl h-full border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] bg-[#0a0a0a]"
              initial={false}
              animate={{
                width: isCompressed ? "4.5rem" : isActive ? "52rem" : `${100 / mentors.length}%`,
                maxWidth: isCompressed ? "4.5rem" : isActive ? "52rem" : "22rem",
                flexGrow: isActive ? 0 : isCompressed ? 0 : 1,
              }}
              transition={smoothTransition}
              onHoverStart={() => handleHoverStart(index)}
              onClick={() => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                setActiveImage(index);
              }}
            >
              {/* ========================================================= */}
              {/* 1. DEFAULT STATE (Normal Vertical Card when no hover)     */}
              {/* ========================================================= */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: (!isActive && !isCompressed) ? 1 : 0,
                  pointerEvents: (!isActive && !isCompressed) ? 'auto' : 'none'
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col justify-end p-6 z-10"
              >
                {/* Full Background Photo */}
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top" 
                />
                
                {/* Dramatic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/95 via-[#8B0000]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Vertical Card Info (Positioned at bottom) */}
                <div className="relative z-10">
                  <h2 className="font-display-hero text-[26px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-md">
                    {mentor.name.toUpperCase()}
                  </h2>
                  <p className="text-[12px] font-bold text-white/90 uppercase tracking-widest drop-shadow mb-3">
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

              {/* ========================================================= */}
              {/* 2. COMPRESSED STATE (Narrow 4.5rem Sliver)                 */}
              {/* ========================================================= */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isCompressed ? 1 : 0,
                  pointerEvents: isCompressed ? 'auto' : 'none'
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0 z-10"
              >
                {/* Darkened Photo */}
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top brightness-40 grayscale-[40%]" 
                />
                
                {/* Red/Black Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/95 via-[#C8102E]/25 to-black/70 pointer-events-none" />

                {/* Vertical Name Running Upwards */}
                <span 
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display-hero text-xl lg:text-2xl font-bold text-white uppercase drop-shadow-lg opacity-80 tracking-widest whitespace-nowrap pointer-events-none"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {mentor.name}
                </span>
              </motion.div>

              {/* ========================================================= */}
              {/* 3. EXPANDED STATE (Huge Card: Left Details, Right Photo)  */}
              {/* ========================================================= */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-row z-20 overflow-hidden"
              >
                {/* LEFT COLUMN: Red details panel (flexible width, never cuts off) */}
                <div className="flex-1 min-w-0 h-full bg-[#5A0A15] p-8 lg:p-12 flex flex-col justify-center border-r border-[#8B0000] relative overflow-hidden">
                  {/* Subtle carbon texture glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,16,46,0.2),transparent_70%)] pointer-events-none" />

                  <motion.div 
                    className="w-full max-w-[420px] relative z-10"
                    variants={textStaggerVariants}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                    style={{ perspective: "1000px" }}
                  >
                    {/* Mentor Name */}
                    <motion.h2 
                      variants={textItemVariants}
                      className="font-display-hero text-[34px] lg:text-[42px] font-extrabold text-white optical-display leading-[0.95] mb-2 drop-shadow-lg uppercase tracking-tight"
                    >
                      {mentor.name}
                    </motion.h2>

                    {/* Role Pill */}
                    <motion.p 
                      variants={textItemVariants}
                      className="text-[12px] font-bold text-[#C8102E] bg-white px-3 py-1 inline-block rounded mb-4 uppercase tracking-widest shadow-sm"
                    >
                      {mentor.role}
                    </motion.p>
                    
                    {/* All Skill Pills */}
                    <motion.div 
                      variants={textItemVariants}
                      className="flex flex-wrap gap-1.5 lg:gap-2 mb-4"
                    >
                      {mentor.expertise.map((exp, i) => (
                        <span 
                          key={exp} 
                          className={`px-2.5 py-1 rounded text-[10px] lg:text-[11px] font-bold tracking-widest uppercase border ${
                            i === 0 
                              ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                              : 'bg-white/10 text-white/90 border-white/20'
                          }`}
                        >
                          {exp}
                        </span>
                      ))}
                    </motion.div>

                    {/* Bio Description */}
                    <motion.p 
                      variants={textItemVariants}
                      className="text-[13px] lg:text-[14px] leading-relaxed text-white/80 mb-6 font-sans"
                    >
                      {mentor.description}
                    </motion.p>

                    {/* Interactive Action Buttons */}
                    <motion.div 
                      variants={textItemVariants}
                      className="flex items-center gap-3"
                    >
                      <Link 
                        to={`/request/${mentor.id}`} 
                        className="inline-flex items-center justify-center h-11 px-7 rounded bg-white hover:bg-gray-100 text-[#C8102E] font-bold text-[13px] uppercase tracking-widest shadow-lg btn-spring pointer-events-auto"
                      >
                        Request Mentor
                      </Link>
                      <Link 
                        to={`/mentor/${mentor.id}`} 
                        aria-label={`View full profile of ${mentor.name}`}
                        className="inline-flex items-center justify-center h-11 w-11 rounded bg-black/40 hover:bg-black/60 text-white font-bold border border-white/20 btn-spring pointer-events-auto transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* RIGHT COLUMN: Mentor Portrait Photo (Always visible on right side) */}
                <div className="w-[40%] lg:w-[42%] h-full relative shrink-0 overflow-hidden bg-black">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover object-top" 
                  />
                  {/* Subtle edge blend gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile / Tablet fallback (Clean 2-column Grid) */}
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
