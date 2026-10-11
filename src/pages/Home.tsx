import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';
import MagneticButton from '../components/MagneticButton';
import Marquee from '../components/Marquee';
import { ScrollRevealText } from '../components/ScrollRevealText';
import Meteors from '../components/ui/Meteors';
import BorderBeam from '../components/ui/BorderBeam';
import SpotlightCard from '../components/ui/SpotlightCard';
import StatusPill from '../components/ui/StatusPill';
import TelemetryBar from '../components/TelemetryBar';

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
      <section className="relative w-full overflow-hidden bg-[#070707] pt-20 pb-20 border-b border-white/10">
        {/* Background photo & gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <img
            src="/images/team_celebration.jpg"
            alt="Fiammata Racing Celebration"
            decoding="async"
            className="w-full h-full object-cover object-[center_15%] opacity-40 filter saturate-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#070707]/85 to-[#070707]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,16,46,0.18),transparent_70%)]" />
        </motion.div>

        {/* Realistic Aerodynamic Bolides & Meteors */}
        <Meteors number={4} scrollSensitivity={1.2} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative max-w-[1280px] mx-auto px-margin text-center flex flex-col items-center justify-center z-10"
        >
          {/* 21st.dev Status Pill */}
          <motion.div variants={itemVariants} className="mb-6">
            <StatusPill
              statusText="PIT WALL LIVE"
              label="100% Free STEM Mentorship"
              sublabel="By National Finalists"
            />
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display-hero text-[44px] sm:text-[70px] lg:text-[76px] leading-[1.02] text-white font-extrabold optical-display mb-5 uppercase tracking-tight max-w-4xl">
            Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary drop-shadow-[0_0_35px_rgba(200,16,46,0.6)]">Podium Finish.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-[18px] sm:text-[22px] font-medium text-white/70 tracking-tight mb-10 font-sans max-w-2xl leading-relaxed">
            Need help? Find the right <span className="font-bold text-white border-b-2 border-primary pb-0.5">Fiammata mentor</span> to supercharge your engineering, portfolio, and presentation.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <MagneticButton>
              <Link
                to="/find-a-mentor"
                className="inline-flex items-center gap-3 bg-primary hover:bg-[#a50d24] text-white font-bold text-[13px] uppercase tracking-widest px-9 h-14 rounded-xl transition-all shadow-[0_0_25px_rgba(200,16,46,0.45)] hover:shadow-[0_0_45px_rgba(200,16,46,0.7)] border border-[#ff3355]"
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

            <Link
              to="/ask-an-expert"
              className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white font-bold text-[13px] uppercase tracking-widest px-7 h-14 rounded-xl border border-white/15 transition-all backdrop-blur-md btn-spring"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">chat_bubble</span>
              <span>Ask an Expert</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* 21st.dev Telemetry Counter Strip */}
        <TelemetryBar />
      </section>

      {/* About Fiammata Racing */}
      <section className="w-full py-24 bg-[#000000] overflow-hidden border-b border-white/10 relative">
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
                <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-primary tracking-widest uppercase">
                  <span className="w-2 h-0.5 bg-primary" />
                  WHO WE ARE
                </div>
                <h2 className="font-display-hero text-[34px] sm:text-[44px] text-white font-extrabold uppercase leading-tight tracking-tight">
                  Beyond the Track.
                </h2>
              </motion.div>
              <motion.p variants={itemVariants} className="text-[16px] sm:text-[18px] text-white/60 leading-relaxed font-sans mb-8">
                Fiammata Academy is built from the battle-tested experience we've gained through our own STEM Racing journey. We are an elite, high-performance STEM Racing team combining cutting-edge engineering with sustainability-focused innovation.
              </motion.p>

              {/* 21st.dev Spotlight Mini Cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3.5">
                {[
                  { title: "National Level", desc: "Top Competitors & World Finalists", icon: "emoji_events", id: "01" },
                  { title: "Engineering", desc: "CAD, CFD & Topology Portfolio", icon: "precision_manufacturing", id: "02" },
                  { title: "Award Winning", desc: "Sustainability & Enterprise", icon: "eco", id: "03" },
                  { title: "Mentorship", desc: "100% Free Peer-to-Peer", icon: "volunteer_activism", id: "04" }
                ].map(stat => (
                  <SpotlightCard
                    key={stat.title}
                    className="p-4 bg-[#0a0a0a]/90 border-white/10 hover:border-primary/50"
                    spotlightColor="rgba(200, 16, 46, 0.22)"
                    spotlightSize={250}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 uppercase font-bold tracking-widest">
                        N° {stat.id}
                      </span>
                    </div>
                    <span className="font-bold text-[13px] text-white tracking-wide uppercase block">
                      {stat.title}
                    </span>
                    <span className="text-[11px] text-white/45 font-sans mt-0.5 block leading-snug">
                      {stat.desc}
                    </span>
                  </SpotlightCard>
                ))}
              </motion.div>
            </div>

            {/* Team Award Frame with 21st.dev BorderBeam */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(200,16,46,0.25)] group flex items-center justify-center bg-[#0a0a0a]"
            >
              {/* 21st.dev Border Beam Animation */}
              <BorderBeam size={280} duration={12} colorFrom="#C8102E" colorTo="#ffffff" borderWidth={2} />

              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

              <img
                src="/images/team_award.jpg"
                alt="Fiammata Racing Team Award"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain group-hover:scale-105 transition-all duration-700"
              />

              {/* High-tech telemetry tag overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                    NATIONAL RUNNER-UP • PALMARES
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/50 uppercase">
                  F1 IN SCHOOLS
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* Challenge Areas / Disciplines */}
      <section className="w-full py-24 bg-[#070707] overflow-hidden border-b border-white/10" id="disciplines">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-primary tracking-widest uppercase mb-2">
                <span className="w-2 h-0.5 bg-primary" />
                PROJECT DISCIPLINES
              </div>
              <h2 className="font-display-hero text-[34px] sm:text-[44px] text-white font-extrabold uppercase tracking-tight">
                What can we help with?
              </h2>
            </div>
            <p className="text-[14px] text-white/50 font-sans max-w-md text-left">
              Tailored guidance across every judged portfolio criterion, car design regulation, and verbal presentation.
            </p>
          </motion.div>

          {/* 21st.dev Cybernetic Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                code: "MOD-01",
                title: "Engineering & Car",
                desc: "DNE Portfolio, CAD Topology & CFD Optimization",
                icon: "precision_manufacturing",
                tags: ["CFD Aerodynamics", "CAD Tolerances", "DNE Rubric"]
              },
              {
                code: "MOD-02",
                title: "Enterprise",
                desc: "Enterprise Portfolio, Sponsorship & Brand Pitching",
                icon: "handshake",
                tags: ["Sponsorship Pitch", "Branding Kit", "Budgeting"]
              },
              {
                code: "MOD-03",
                title: "Project Management",
                desc: "PM Portfolio, Gantt Timelines & Risk Matrices",
                icon: "schema",
                tags: ["Gantt Milestones", "Risk Mitigation", "Scrum Roles"]
              },
              {
                code: "MOD-04",
                title: "Presentation",
                desc: "10-Minute Verbal Presentation & Judge Q&A Prep",
                icon: "record_voice_over",
                tags: ["Judge Q&A Drilling", "Script Cadence", "Stage Presence"]
              }
            ].map((area) => (
              <motion.div key={area.title} variants={itemVariants} whileHover={{ y: -6 }}>
                <Link to="/find-a-mentor" className="block h-full">
                  <SpotlightCard
                    className="p-6 h-full flex flex-col justify-between bg-[#000000] border-white/10 hover:border-primary/60 transition-all duration-300"
                    spotlightColor="rgba(200, 16, 46, 0.25)"
                    spotlightSize={350}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/70 group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-white/10 group-hover:border-primary">
                          <span className="material-symbols-outlined text-[24px]">{area.icon}</span>
                        </div>
                        <span className="font-mono text-[10px] text-primary font-bold tracking-widest border border-primary/30 px-2 py-0.5 rounded bg-primary/10">
                          {area.code}
                        </span>
                      </div>

                      <h3 className="font-display-hero text-[20px] text-white uppercase tracking-wide group-hover:text-primary transition-colors font-bold mb-2">
                        {area.title}
                      </h3>
                      <p className="font-sans text-[13px] text-white/50 leading-relaxed mb-5">
                        {area.desc}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                        {area.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 mt-5 text-[11px] font-bold text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        <span>Explore Mentors</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Meet the Mentors */}
      <section className="w-full py-24 bg-[#000000] border-b border-white/10 overflow-hidden" id="mentors">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-primary tracking-widest uppercase">
                <span className="w-2 h-0.5 bg-primary" />
                VERIFIED STUDENT COACHES
              </div>
              <h2 className="font-display-hero text-[34px] sm:text-[44px] text-white font-extrabold uppercase tracking-tight">
                Meet the Roster
              </h2>
              <p className="text-[14px] sm:text-[16px] text-white/50 font-sans mt-1">
                Experienced Fiammata Racing members ready to coach your team. 100% free.
              </p>
            </div>
            <Link
              to="/find-a-mentor"
              className="hidden sm:inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-[12px] uppercase tracking-widest px-6 h-12 rounded-xl transition-all btn-spring"
            >
              View all mentors
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {mentors.map(mentor => (
              <motion.div key={mentor.id} variants={itemVariants} className="h-full">
                <MentorCard mentor={mentor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Banner Wrapped with 21st.dev BorderBeam */}
      <section className="w-full py-24 bg-[#070707] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[1280px] mx-auto px-margin"
        >
          <div className="relative bg-gradient-to-r from-primary via-[#a50d24] to-[#600000] text-white rounded-3xl p-10 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_25px_60px_rgba(200,16,46,0.35)] overflow-hidden border border-[#ff3355]/40">
            {/* 21st.dev Border Beam */}
            <BorderBeam size={320} duration={9} colorFrom="#ffffff" colorTo="#ff99a8" borderWidth={2} />

            {/* Aerodynamic background streaks */}
            <Meteors number={2} className="opacity-40" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />

            <div className="flex flex-col gap-2 text-center md:text-left relative z-10 w-full">
              <span className="font-mono text-[11px] font-bold text-white/70 uppercase tracking-widest">
                ACCELERATE YOUR TEAM TODAY
              </span>
              <ScrollRevealText
                text="Ready to accelerate?"
                className="text-[36px] sm:text-[48px] lg:text-[64px] text-white leading-none mb-2 md:text-left md:justify-start justify-center flex flex-wrap"
              />
              <p className="text-[16px] lg:text-[18px] text-white/85 font-sans md:ml-1 max-w-xl">
                Connect directly with national finalist engineers who have walked the walk and built winning portfolios.
              </p>
            </div>
            <div className="shrink-0 relative z-10">
              <Link
                to="/find-a-mentor"
                className="inline-flex items-center justify-center bg-white text-primary font-extrabold text-[14px] uppercase tracking-widest px-10 h-14 rounded-xl transition-[transform,box-shadow] shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-1 hover:scale-105"
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
