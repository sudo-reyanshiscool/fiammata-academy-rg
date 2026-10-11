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
      <article className="group relative flex flex-col justify-between bg-gradient-to-br from-[#b50e28] via-[#8B0000] to-[#500000] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(200,16,46,0.25)] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:shadow-[0_20px_45px_rgba(200,16,46,0.55)] border border-[#ff3355]/40 cursor-pointer h-full btn-spring">

        {/* 21st.dev Glare Effect */}
        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[glare_1s_ease-in-out_forwards] z-30 pointer-events-none" />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 via-white to-white/40 z-20 transition-[height] duration-200 group-hover:h-1.5" />

        {/* Image Area with Gradient Fade */}
        <div className="relative w-full h-[240px] sm:h-[280px] shrink-0 bg-[#0a0a0a] overflow-hidden">
          <img
            src={mentor.image}
            alt={mentor.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500 ease-out grayscale-[10%] group-hover:grayscale-0 will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#600000] via-[#8B0000]/40 to-transparent opacity-95" />

          {/* Top Status & Serial Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold tracking-widest uppercase text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              ACTIVE
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15 text-white/70 uppercase">
              FA-{mentor.id.slice(0, 4).toUpperCase()}
            </span>
          </div>

          {/* Floating Role Badge */}
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
            <div>
              <h2 className="font-display-hero text-2xl sm:text-[28px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-md">
                {mentor.name.toUpperCase()}
              </h2>
              <p className="text-[12px] font-bold text-white/90 uppercase tracking-widest drop-shadow">
                {mentor.role.split(' Lead')[0]}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-sm group-hover:bg-white group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px] text-white group-hover:text-primary transition-colors">
                arrow_forward
              </span>
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
                className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${i === 0
                    ? 'bg-white text-[#C8102E] border-white shadow-sm font-extrabold'
                    : 'bg-black/30 text-white border-white/25 backdrop-blur-sm'
                  }`}
              >
                {exp}
              </span>
            ))}
          </div>

          <p className="text-[13px] leading-relaxed text-white/90 mb-6 flex-1 drop-shadow-sm font-sans">
            {mentor.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 pt-4 border-t border-white/20 mt-auto">
            <Link
              to={`/request/${mentor.id}`}
              className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded-xl bg-white hover:bg-white/95 text-[#C8102E] font-extrabold text-[13px] uppercase tracking-wider transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] btn-spring focus:ring-2 focus:ring-white focus:outline-none"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Request mentorship with ${mentor.name}`}
            >
              Request
            </Link>
            <Link
              to={`/mentor/${mentor.id}`}
              className="flex-1 inline-flex items-center justify-center min-h-[44px] rounded-xl bg-black/40 hover:bg-black/60 text-white font-bold text-[13px] uppercase tracking-wider transition-colors btn-spring border border-white/25 focus:ring-2 focus:ring-white focus:outline-none"
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
