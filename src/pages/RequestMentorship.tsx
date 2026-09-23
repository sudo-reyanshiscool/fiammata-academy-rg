import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mentors } from '../data/mentors';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { requestRepository } from '../repository/requestRepository';
import { profileRepository } from '../repository/profileRepository';
import MagneticButton from '../components/MagneticButton';

export default function RequestMentorship() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === mentorId);
  const { user, profile } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [team, setTeam] = useState('');
  const [area, setArea] = useState('');
  const [problem, setProblem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-populate from profile
  useEffect(() => {
    if (profile && profile.autoFillRequests) {
      if (profile.teamName && !team) {
        setTeam(profile.teamName);
      }
      if (mentor && profile.primaryCategory && !area) {
        const matchingExpertise = mentor.expertise.find(
          exp => exp.toLowerCase().includes(profile.primaryCategory.toLowerCase()) || 
                 profile.primaryCategory.toLowerCase().includes(exp.toLowerCase())
        );
        if (matchingExpertise) {
          setArea(matchingExpertise);
        }
      }
    }
  }, [profile, mentor, team, area]);

  if (!mentor) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Mentor not found.</h2>
        <Link to="/find-a-mentor" className="text-primary hover:underline">Return to Roster</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!user) {
      addToast('You must be logged in to send a request.', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // If user hasn't set their team in profile yet, auto-save it now
      if (user && (!profile?.teamName || !profile.profileCompleted) && team.trim()) {
        await profileRepository.updateProfile(user, { teamName: team.trim() });
      }

      await requestRepository.saveRequest({
        mentorId: mentor.id,
        studentName: user.user_metadata?.full_name || user.email || 'Unknown Student',
        studentEmail: user.email || '',
        teamName: team,
        areaOfHelp: area,
        problemStatement: problem,
      });

      addToast('Telemetry received! Request sent successfully.', 'success');
      navigate('/my-requests');
    } catch (error: any) {
      addToast(error.message || 'Failed to transmit request.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="flex-1 w-full bg-[#000000] text-white pt-8 pb-16 flex flex-col items-center overflow-hidden">
      
      {/* Mentor Header */}
      <div className="w-full max-w-[700px] px-6 mb-8">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} 
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/50 hover:text-primary transition-colors group mb-6"
        >
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">arrow_back</span>
          <span>{step > 1 ? 'Previous Step' : 'Back to Profile'}</span>
        </button>

        <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-2xl border border-white/10 shadow-lg">
          <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full object-cover grayscale-[20%]" />
          <div>
            <h2 className="font-display-hero text-2xl font-bold uppercase tracking-wide">Requesting {mentor.name}</h2>
            <p className="text-primary text-[12px] uppercase font-bold tracking-widest">{mentor.role}</p>
          </div>
        </div>
      </div>

      {/* Form Wizard */}
      <div className="w-full max-w-[700px] px-6">
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
          
          {/* Progress Tracker */}
          <div className="flex items-center w-full bg-[#000000] p-4 border-b border-white/5">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${step >= num ? 'bg-primary text-white shadow-[0_0_15px_rgba(200,16,46,0.5)]' : 'bg-white/5 text-white/30 border border-white/10'}`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className="flex-1 h-px mx-2 bg-white/5 relative">
                    <motion.div 
                      className="absolute left-0 top-0 h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: step > num ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 flex flex-col min-h-[350px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }} className="flex-1 flex flex-col gap-6">
                  <div className="mb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold mb-1">Team Identification</h3>
                      {profile?.profileCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          Pit Pass: {profile.licenseNumber}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          First Request Setup
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-[13px]">We need to know who you represent on the track.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50">Registered Team Name</label>
                      <Link to="/profile" className="text-[11px] text-primary hover:underline font-bold uppercase tracking-wider">
                        {profile?.profileCompleted ? 'Edit Pit Pass' : 'Set Up Pit Pass'}
                      </Link>
                    </div>
                    <input 
                      type="text" 
                      value={team} 
                      onChange={(e) => setTeam(e.target.value)} 
                      required 
                      placeholder="e.g. Velocity Apex" 
                      className="w-full bg-[#000000] text-white text-[14px] px-4 py-3.5 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-semibold" 
                    />
                  </div>

                  {/* Contextual Pit Pass save hint for first-time users */}
                  {!profile?.profileCompleted && team.trim().length > 0 && (
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[12px] text-white/80">
                        <span className="material-symbols-outlined text-primary text-[16px]">bolt</span>
                        <span>Save <b>{team}</b> to your Pit Pass for future 1-click requests?</span>
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/20 px-2 py-0.5 rounded">Auto-Saved</span>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }} className="flex-1 flex flex-col gap-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold mb-1">Technical Challenge</h3>
                    <p className="text-white/50 text-[13px]">What specific telemetry or design problem are you facing?</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">Discipline</label>
                    <select value={area} onChange={(e) => setArea(e.target.value)} required className="w-full bg-[#000000] text-white text-[14px] px-4 py-3.5 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all appearance-none">
                      <option value="" disabled>Select Area of Expertise</option>
                      {mentor.expertise.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">Problem Statement</label>
                    <textarea value={problem} onChange={(e) => setProblem(e.target.value)} required placeholder="Describe your current blockage..." className="w-full bg-[#000000] text-white text-[14px] px-4 py-3.5 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all min-h-[100px] resize-none" />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }} className="flex-1 flex flex-col gap-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold mb-1">Final Review</h3>
                    <p className="text-white/50 text-[13px]">Verify your transmission payload before sending.</p>
                  </div>
                  <div className="bg-[#000000] rounded-xl border border-white/10 p-5 flex flex-col gap-4">
                    <div>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Target Mentor</p>
                      <p className="font-bold">{mentor.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Team Designation</p>
                      <p className="font-bold">{team || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Discipline</p>
                      <p className="font-bold">{area || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Payload</p>
                      <p className="text-sm text-white/70 line-clamp-2">{problem || "Not specified"}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
              <MagneticButton>
                <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-primary hover:bg-[#9B0C23] text-white font-bold text-[13px] uppercase tracking-widest px-8 h-12 rounded transition-all shadow-[0_0_15px_rgba(200,16,46,0.3)] hover:shadow-[0_0_25px_rgba(200,16,46,0.5)] border border-primary disabled:opacity-50">
                  {isSubmitting ? 'Transmitting...' : step === 3 ? 'Send Request' : 'Next Step'}
                  {!isSubmitting && <span className="material-symbols-outlined text-[18px]">{step === 3 ? 'send' : 'arrow_forward'}</span>}
                </button>
              </MagneticButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
