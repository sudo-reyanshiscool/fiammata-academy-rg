export default function Workshops() {
  return (
    <div className="flex-1 flex flex-col w-full bg-[#000000] min-h-screen text-white pt-16 pb-20 px-6 sm:px-8">
      <div className="max-w-[1140px] mx-auto w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4 shadow-[0_0_15px_rgba(217,56,45,0.2)]">
          <span className="material-symbols-outlined text-[14px]">event</span>
          Live Sessions
        </span>
        <h1 className="font-display-hero text-4xl sm:text-[48px] tracking-tight font-extrabold mb-4 uppercase">
          Fiammata <span className="text-primary">Workshops</span>
        </h1>
        <p className="text-[16px] sm:text-[18px] text-white/50 leading-relaxed font-sans mb-10 max-w-2xl">
          Join our virtual community workshops or attend in-person sessions (currently available for Genesis Global School students).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Virtual Workshop */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/10 shadow-sm flex flex-col h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,56,45,0.15)] transition-all group">
            <div className="inline-flex items-center self-start px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-bold bg-white/5 text-white/70 border border-white/10 mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-colors">
              Virtual Session
            </div>
            <h3 className="font-display-hero text-[22px] font-extrabold text-white mb-2 uppercase tracking-wide">Enterprise Portfolio Basics</h3>
            <p className="text-[12px] uppercase tracking-widest text-primary font-bold mb-4">Host: Swastik Katiyar</p>
            <p className="text-[14px] text-white/50 mb-8 flex-1 font-sans">
              Learn the foundational elements of structuring a winning enterprise portfolio.
            </p>
            <div className="border-t border-white/10 pt-4 mt-auto">
              <p className="text-[12px] uppercase tracking-widest text-white/40 font-bold">To be announced</p>
            </div>
          </div>

          {/* In-Person Workshop */}
          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/10 shadow-sm flex flex-col h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(217,56,45,0.15)] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
            <div className="inline-flex items-center self-start px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-bold bg-primary/10 text-primary border border-primary/20 mb-6 relative z-10">
              In-Person (Genesis Global)
            </div>
            <h3 className="font-display-hero text-[22px] font-extrabold text-white mb-2 uppercase tracking-wide relative z-10">Car Optimization Strategy</h3>
            <p className="text-[12px] uppercase tracking-widest text-primary font-bold mb-4 relative z-10">Host: Vedant Jain</p>
            <p className="text-[14px] text-white/50 mb-8 flex-1 font-sans relative z-10">
              Deep dive into aerodynamic trade-offs and structural decision making.
            </p>
            <div className="border-t border-white/10 pt-4 mt-auto relative z-10">
              <p className="text-[12px] uppercase tracking-widest text-white/40 font-bold">Every Friday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
