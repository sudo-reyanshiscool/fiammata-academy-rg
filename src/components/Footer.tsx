

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] border-t border-white/10 py-12 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-col gap-1.5">
          <span className="font-display-hero font-extrabold text-[16px] text-white uppercase tracking-widest">Fiammata Academy</span>
          <span className="text-[13px] text-white/40 mt-1 max-w-sm leading-relaxed font-sans">
            An initiative of Fiammata Racing. <br className="hidden sm:block" />
            "Your Team. Our Expertise. Learn from experience. Build it yourself."
          </span>
        </div>
        
        <div className="flex flex-col items-center sm:items-end gap-5">
          <div className="flex items-center gap-6">
            <a 
              href="https://fiammata-racing-hub.base44.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[12px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              Main Website
            </a>
            <a 
              href="https://instagram.com/fiammataracing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[12px] font-bold text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              Instagram
            </a>
          </div>
          <span className="inline-flex items-center px-4 py-1.5 rounded font-bold text-[10px] bg-white/5 text-primary tracking-widest uppercase border border-white/10 mt-1">
            100% Free Mentorship
          </span>
        </div>
      </div>
    </footer>
  );
}
