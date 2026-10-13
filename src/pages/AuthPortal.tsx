import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AuthPortal() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[800px] flex flex-col items-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4">
            <span className="material-symbols-outlined text-[14px]">lock_open</span>
            Authentication
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            Select Your <span className="text-primary">Identity</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Choose your access level to enter the Fiammata Academy ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
          
          {/* Team / Student Card */}
          <motion.div variants={itemVariants}>
            <Link 
              to="/login"
              className="flex flex-col h-full bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">groups</span>
              </div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wide mb-2">Team / Student</h2>
              <p className="text-white/50 text-sm flex-1 mb-6">
                Log in to request mentorship, view telemetry, and track your progress.
              </p>
              <div className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-widest">
                Student Access <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          </motion.div>

          {/* Mentor Card */}
          <motion.div variants={itemVariants}>
            <Link 
              to="/mentor/login"
              className="flex flex-col h-full bg-[#0a0a0a] p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-all group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(237,109,5,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
              </div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wide mb-2">Mentor Access</h2>
              <p className="text-white/50 text-sm flex-1 mb-6">
                Log in to the secure Command Center to review and accept incoming requests.
              </p>
              <div className="flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-widest">
                Secure Portal <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Guest Access */}
        <motion.div variants={itemVariants} className="w-full text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[12px] font-bold uppercase tracking-widest border-b border-transparent hover:border-white/30 pb-1"
          >
            Continue as Guest
            <span className="material-symbols-outlined text-[14px]">explore</span>
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
