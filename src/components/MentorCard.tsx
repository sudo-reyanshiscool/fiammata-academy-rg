import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';
import TiltCard from './TiltCard';

interface MentorCardProps {
  mentor: Mentor;
  layout?: 'home' | 'grid';
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <TiltCard>
      <article className="group relative flex flex-col justify-between bg-gradient-to-br from-[#C8102E] to-[#8B0000] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(217,56,45,0.2)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(217,56,45,0.5)] border border-[#C8102E] cursor-pointer h-full btn-spring">
      
      {/* Glare Effect */}
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[glare_1s_ease-in-out_forwards] z-30 pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 z-20 transition-all duration-300 group-hover:h-1.5" />

      {/* Image Area with Gradient Fade */}
      <div className="relative w-full h-[240px] sm:h-[280px] shrink-0 bg-[#0a0a0a] overflow-hidden">
        <img 
          src={mentor.image} 
          alt={mentor.name} 
          className="absolute inset-0 w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out grayscale-[20%] group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000] via-transparent to-transparent opacity-90" />
        
        {/* Floating Role Badge */}
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
          <div>
            <h2 className="font-display-hero text-2xl sm:text-[28px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-md">
              {mentor.name.toUpperCase()}
            </h2>
            <p className="text-[13px] font-bold text-white/90 uppercase tracking-widest drop-shadow">{mentor.role.split(' Lead')[0]}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-white">arrow_forward</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 pt-3 relative z-10">
        
        {/* Telemetry Stats (Expertise) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.expertise.map((exp, i) => (
            <span 
              key={exp} 
              className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${
                i === 0 
                  ? 'bg-white text-[#C8102E] border-white shadow-sm' 
                  : 'bg-white/10 text-white border-white/20'
              }`}
            >
              {exp}
            </span>
          ))}
        </div>

        <p className="text-[13px] leading-relaxed text-white/90 mb-6 flex-1 drop-shadow-sm">
          {mentor.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-4 border-t border-white/20 mt-auto">
          <Link 
            to={`/request/${mentor.id}`} 
            className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded bg-white hover:bg-white/95 text-[#C8102E] font-extrabold text-[13px] uppercase tracking-wide transition-all shadow-md group-hover:shadow-lg btn-spring focus:ring-2 focus:ring-white focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Request mentorship with ${mentor.name}`}
          >
            Request
          </Link>
          <Link 
            to={`/mentor/${mentor.id}`} 
            className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded bg-black/30 hover:bg-black/45 text-white font-extrabold text-[13px] uppercase tracking-wide transition-colors btn-spring border border-white/20 focus:ring-2 focus:ring-white focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View profile for ${mentor.name}`}
          >
            Profile
          </Link>
        </div>
      </div>
    </article>
    </TiltCard>
  );
}
