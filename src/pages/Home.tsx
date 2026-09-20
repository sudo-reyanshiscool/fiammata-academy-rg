import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';
import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#000000]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a] pt-16 pb-20 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <img 
            src="/images/team_celebration.jpg" 
            alt="Fiammata Racing Celebration" 
            className="w-full h-full object-cover object-[center_15%] mix-blend-luminosity grayscale-[30%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#0a0a0a]/80 to-[#0a0a0a]/60"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-[1280px] mx-auto px-margin text-center flex flex-col items-center justify-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-primary/20 border border-primary/30 text-white text-[11px] font-bold mb-6 tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(217,56,45,0.2)] uppercase">
            <span className="material-symbols-outlined text-[15px] text-primary">verified</span>100% Free STEM Mentorship
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-display-hero text-[42px] sm:text-[64px] sm:leading-[1.1] text-white font-extrabold tracking-tight mb-4 uppercase">
            Need help?
          </motion.h1>
          <motion.p variants={itemVariants} className="text-[20px] sm:text-[24px] font-medium text-white/60 tracking-tight mb-10 font-sans">
            Find the right <span className="font-bold text-primary shadow-primary">Fiammata mentor.</span>
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center">
            <MagneticButton>
              <Link 
                to="/find-a-mentor" 
                className="inline-flex items-center gap-2 bg-primary text-white font-bold text-[14px] uppercase tracking-widest px-10 h-14 rounded transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_40px_rgba(220,20,60,0.6)] border border-[#C8102E]"
              >
                <span>View Roster</span>
                <motion.span 
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="material-symbols-outlined text-[20px]"
                >
                  arrow_forward
                </motion.span>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* About Fiammata Racing */}
      <section className="w-full py-24 bg-[#000000] overflow-hidden border-b border-white/5 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto px-margin relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex-1 flex flex-col justify-center">
              <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-6">
                <span className="font-label-caps text-[12px] text-primary tracking-widest uppercase font-bold">WHO WE ARE</span>
                <h2 className="font-display-hero text-[32px] sm:text-[40px] text-white font-extrabold uppercase leading-tight tracking-tight">
                  Beyond the Track.
                </h2>
              </motion.div>
              <motion.p variants={itemVariants} className="text-[16px] sm:text-[18px] text-white/50 leading-relaxed font-sans">
                Fiammata Academy is built from the experience we've gained through our own STEM Racing journey. We are an elite, high-performance STEM Racing team combining cutting-edge engineering with sustainability-focused innovation.
              </motion.p>
              
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { title: "National Level", desc: "Top Competitors", icon: "emoji_events" },
                  { title: "Engineering", desc: "Elite Portfolio", icon: "engineering" },
                  { title: "Award Winning", desc: "Sustainability Champions", icon: "eco" },
                  { title: "Mentorship", desc: "100% free guidance", icon: "volunteer_activism" }
                ].map(stat => (
                  <div key={stat.title} className="flex flex-col gap-2 p-4 rounded bg-[#0a0a0a] border border-white/5 hover:border-primary/50 transition-colors group">
                    <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform">{stat.icon}</span>
                    <span className="font-bold text-[14px] text-white tracking-wide uppercase">{stat.title}</span>
                    <span className="text-[11px] text-white/40 font-sans uppercase tracking-widest">{stat.desc}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(217,56,45,0.15)] group flex items-center justify-center bg-[#0a0a0a]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <img 
                src="/images/team_award.jpg" 
                alt="Fiammata Racing Team Award" 
                className="w-full h-auto object-contain group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* Challenge Areas */}
      <section className="w-full py-24 bg-[#0a0a0a] overflow-hidden border-b border-white/5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-12 text-center sm:text-left">
            <span className="font-label-caps text-[12px] text-primary tracking-widest uppercase font-bold">PROJECT DISCIPLINES</span>
            <h2 className="font-display-hero text-[32px] sm:text-[40px] text-white font-extrabold uppercase">
              What can we help with?
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Engineering & Car", desc: "DNE Portfolio, Car Optimization", icon: "precision_manufacturing" },
              { title: "Enterprise", desc: "Enterprise Portfolio, Sponsorship", icon: "handshake" },
              { title: "Project Management", desc: "PM Portfolio, Timelines", icon: "schema" },
              { title: "Presentation", desc: "Verbal Presentation, Judge Q&A", icon: "record_voice_over" }
            ].map((area) => (
              <motion.div key={area.title} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }}>
                <Link to="/find-a-mentor" className="group flex flex-col justify-between p-6 bg-[#000000] border border-white/10 hover:border-primary/50 rounded-xl shadow-lg transition-all h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col gap-5 relative z-10">
                    <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-white/10 group-hover:border-primary">
                      <span className="material-symbols-outlined text-[24px]">{area.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-display-hero text-[18px] text-white uppercase tracking-wide group-hover:text-primary transition-colors font-bold mb-2">{area.title}</h3>
                      <p className="font-sans text-[12px] text-white/40 leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Meet the Mentors */}
      <section className="w-full py-24 bg-[#000000] border-b border-white/5 overflow-hidden" id="mentors">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <span className="font-label-caps text-[12px] text-primary tracking-widest uppercase font-bold">VERIFIED STUDENT COACHES</span>
              <h2 className="font-display-hero text-[32px] sm:text-[40px] text-white font-extrabold uppercase tracking-tight">
                Meet the Roster
              </h2>
              <p className="text-[14px] sm:text-[16px] text-white/50 font-sans mt-1">
                Experienced Fiammata Racing members ready to coach your team. 100% free.
              </p>
            </div>
            <Link to="/find-a-mentor" className="hidden sm:inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-[12px] uppercase tracking-widest px-6 h-12 rounded transition-all">
              View all mentors
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentors.map(mentor => (
              <motion.div key={mentor.id} variants={itemVariants}>
                <MentorCard mentor={mentor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Banner */}
      <section className="w-full py-24 bg-[#0a0a0a] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <div className="relative bg-gradient-to-r from-primary to-[#8B0000] text-white rounded-2xl p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(217,56,45,0.25)] overflow-hidden border border-[#C8102E]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute -right-20 -top-40 w-96 h-96 bg-white opacity-10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col gap-2 text-center md:text-left relative z-10">
              <h2 className="text-[32px] lg:text-[40px] font-display-hero font-extrabold text-white tracking-tight uppercase leading-none">
                Ready to accelerate?
              </h2>
              <p className="text-[16px] lg:text-[18px] text-white/80 font-sans mt-2">
                Connect with the engineers who have been there.
              </p>
            </div>
            <div className="shrink-0 relative z-10">
              <Link 
                to="/find-a-mentor" 
                className="inline-flex items-center justify-center bg-white text-primary font-bold text-[14px] uppercase tracking-widest px-10 h-14 rounded transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
              >
                Access Roster
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
