import { Link } from 'react-router-dom';
import type { Mentor } from '../data/mentors';
import TiltCard from './TiltCard';

interface MentorCardProps {
  mentor: Mentor;
  layout?: 'home' | 'grid';
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const initials = mentor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <TiltCard>
      <article className="group relative flex flex-col justify-between bg-gradient-to-br from-[#b50e28] via-[#8B0000] to-[#500000] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(200,16,46,0.25)] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:shadow-[0_20px_45px_rgba(200,16,46,0.55)] border border-[#ff3355]/40 cursor-pointer h-full btn-spring">

        {/* 21st.dev Glare Effect */}
        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:animate-[glare_1s_ease-in-out_forwards] z-30 pointer-events-none" />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 via-white to-white/40 z-20 transition-[height] duration-200 group-hover:h-1.5" />

        {/* Header Area without photo */}
        <div className="relative w-full p-5 sm:p-6 pb-2 shrink-0 overflow-hidden bg-black/20 border-b border-white/10">
          {/* Monogram Background Watermark */}
          <span className="absolute -right-2 -bottom-6 font-display-hero text-8xl font-black text-white/[0.06] select-none pointer-events-none tracking-tighter">
            {initials}
          </span>

          {/* Top Status & Serial Badges */}
          <div className="flex items-center justify-between mb-4 pointer-events-none">
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

          {/* Initials Shield + Mentor Name & Role */}
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center font-display-hero text-2xl font-black text-white shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display-hero text-2xl sm:text-[26px] font-extrabold text-white optical-display leading-none mb-1 drop-shadow-md truncate">
                {mentor.name.toUpperCase()}
              </h2>
              <p className="text-[11px] font-bold text-white/90 uppercase tracking-widest drop-shadow truncate">
                {mentor.role.split(' Lead')[0]}
              </p>
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
