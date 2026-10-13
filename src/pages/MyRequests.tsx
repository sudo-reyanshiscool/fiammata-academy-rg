import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestRepository } from '../repository/requestRepository';
import type { MentorshipRequest } from '../repository/requestRepository';
import { mentors } from '../data/mentors';
import type { Mentor } from '../data/mentors';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyRequests() {
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  // State for the Communication Link Modal
  const [activeComm, setActiveComm] = useState<{req: MentorshipRequest, mentor: Mentor} | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      if (!user?.email) return;
      try {
        const data = await requestRepository.getMyRequests(user.email);
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [user]);

  if (loading) {
    return <div className="flex-1 flex items-center justify-center py-20 bg-[#000000] text-white">Loading telemetry...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#000000] text-white font-sans">
      <section className="relative w-full pt-16 pb-10 sm:pt-20 sm:pb-12 px-6 sm:px-8 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        
        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10 self-start mb-2">
            <span className="material-symbols-outlined text-[14px]">speed</span>
            Pit Wall
          </span>
          <h1 className="font-display-hero text-3xl sm:text-[48px] sm:leading-[56px] text-white tracking-tight font-extrabold uppercase">
            Telemetry <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-[15px] text-white/50 max-w-2xl font-sans mt-2">
            STATUS: ACTIVE // USER: {user?.user_metadata?.full_name?.toUpperCase() || 'UNKNOWN'}
          </p>
        </div>
      </section>

      <section className="max-w-[1140px] w-full mx-auto px-6 sm:px-8 py-10 sm:py-12 flex-1 relative z-10">
        {requests.length === 0 ? (
          <div className="bg-[#0a0a0a] rounded-2xl p-10 text-center border border-white/10">
            <h3 className="text-xl font-display-hero font-bold text-white mb-2 uppercase tracking-wide">No active telemetry</h3>
            <p className="text-white/50 mb-6 font-sans text-[13px]">Awaiting mentorship request initialization.</p>
            <Link 
              to="/find-a-mentor" 
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-bold text-[13px] px-8 h-12 rounded uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(237,109,5,0.3)] hover:shadow-[0_0_30px_rgba(237,109,5,0.5)]"
            >
              Initialize Request
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {requests.map((req, i) => {
              const mentor = mentors.find(m => m.id === req.mentorId);
              if (!mentor) return null;
              
              let statusClasses = '';
              let statusLabel = '';
              let pulseColor = '';
              
              switch (req.status) {
                case 'pending':
                  statusClasses = 'bg-brand-gold/10 text-brand-gold border-brand-gold/30';
                  statusLabel = 'AWAITING REVIEW';
                  pulseColor = 'bg-brand-gold';
                  break;
                case 'accepted':
                  statusClasses = 'bg-brand-green/10 text-brand-green border-brand-green/30';
                  statusLabel = 'LINK ESTABLISHED';
                  pulseColor = 'bg-brand-green';
                  break;
                case 'completed':
                  statusClasses = 'bg-white/5 text-white/50 border-white/10';
                  statusLabel = 'ARCHIVED';
                  pulseColor = 'bg-white/30';
                  break;
                case 'declined':
                  statusClasses = 'bg-primary/10 text-primary border-primary/30';
                  statusLabel = 'SIGNAL LOST';
                  pulseColor = 'bg-primary';
                  break;
              }

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={req.id} 
                  className={`bg-[#0a0a0a] rounded-xl p-5 sm:p-7 border transition-all hover:-translate-y-0.5 ${req.status === 'accepted' ? 'border-brand-green/30 shadow-[0_0_30px_rgba(0,138,63,0.05)]' : 'border-white/10'}`}
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex items-start gap-5 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-display-hero text-2xl font-extrabold text-white">
                          {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        {req.status === 'accepted' && (
                          <div className="absolute -inset-1 border border-brand-green/50 rounded-xl animate-pulse" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border ${statusClasses}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${pulseColor} ${req.status === 'pending' || req.status === 'accepted' ? 'animate-pulse' : ''}`} />
                            {statusLabel}
                          </span>
                          <span className="font-sans text-[11px] text-white/30 tracking-wider hidden sm:block">ID: {req.id.substring(0,8).toUpperCase()}</span>
                        </div>
                        <h2 className="font-display-hero font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase leading-none mb-1.5">{req.areaOfHelp || 'MENTORSHIP REQUEST'}</h2>
                        <div className="flex flex-wrap items-center gap-x-2 text-[12px] text-white/50 font-sans">
                          <span className="text-white/80 font-bold">{mentor.name.toUpperCase()}</span>
                          <span>//</span>
                          <span>{mentor.role.toUpperCase()}</span>
                        </div>
                        <div className="mt-4 p-4 rounded bg-[#000000] border border-white/5 font-sans text-[13px] text-white/60 leading-relaxed">
                          {'>'} {req.problemStatement}
                        </div>
                        <div className="mt-8 mb-2">
                          <div className="flex items-center w-full max-w-sm">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-[#ED6D05] shadow-[0_0_10px_rgba(237,109,5,0.5)] z-10" />
                              <span className="text-[9px] font-bold font-sans mt-2 text-[#ED6D05] uppercase tracking-widest">Sent</span>
                            </div>
                            <div className="h-px flex-1 bg-white/10 relative -translate-y-3 mx-2">
                              <div className={`absolute left-0 top-0 h-full transition-all duration-1000 ${req.status !== 'pending' ? 'w-full bg-[#ED6D05]' : 'w-0'}`} />
                            </div>
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full z-10 transition-colors duration-1000 ${req.status !== 'pending' ? 'bg-[#ED6D05] shadow-[0_0_10px_rgba(237,109,5,0.5)]' : 'bg-[#000000] border border-white/20'}`} />
                              <span className={`text-[9px] font-bold font-sans mt-2 uppercase tracking-widest ${req.status !== 'pending' ? 'text-[#ED6D05]' : 'text-white/30'}`}>Review</span>
                            </div>
                            <div className="h-px flex-1 bg-white/10 relative -translate-y-3 mx-2">
                              <div className={`absolute left-0 top-0 h-full transition-all duration-1000 ${req.status === 'accepted' ? 'w-full bg-brand-green' : req.status === 'declined' ? 'w-full bg-[#ED6D05]' : 'w-0'}`} />
                            </div>
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full z-10 transition-colors duration-1000 ${req.status === 'accepted' ? 'bg-brand-green shadow-[0_0_10px_rgba(0,138,63,0.5)]' : req.status === 'declined' ? 'bg-[#ED6D05] shadow-[0_0_10px_rgba(237,109,5,0.5)]' : 'bg-[#000000] border border-white/20'}`} />
                              <span className={`text-[9px] font-bold font-sans mt-2 uppercase tracking-widest ${req.status === 'accepted' ? 'text-brand-green' : req.status === 'declined' ? 'text-[#ED6D05]' : 'text-white/30'}`}>
                                {req.status === 'accepted' ? 'Accepted' : req.status === 'declined' ? 'Declined' : 'Decision'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex items-center lg:items-start pt-2 lg:pt-0">
                      {req.status === 'accepted' ? (
                        <button 
                          onClick={() => setActiveComm({ req, mentor })}
                          className="w-full lg:w-auto inline-flex items-center justify-center gap-2 font-bold text-[12px] uppercase tracking-widest px-6 h-10 rounded bg-brand-green text-[#000000] hover:bg-brand-green transition-all shadow-[0_0_15px_rgba(0,138,63,0.3)]"
                        >
                          <span className="material-symbols-outlined text-[16px]">terminal</span>
                          Open Comm Link
                        </button>
                      ) : (
                        <button className="w-full lg:w-auto inline-flex items-center justify-center font-bold text-[12px] uppercase tracking-widest px-6 h-10 rounded bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-12 p-4 text-center font-sans text-[11px] text-white/30 uppercase tracking-widest border-t border-white/5">
          Fiammata Academy Network // Encrypted Connection // Direct Comms Established Upon Acceptance
        </div>
      </section>

      {/* Communication Link Modal */}
      <AnimatePresence>
        {activeComm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-brand-green/30 overflow-hidden shadow-[0_0_50px_rgba(0,138,63,0.15)]"
            >
              <div className="bg-brand-green/10 p-6 flex flex-col items-center border-b border-brand-green/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-green" />
                <div className="w-16 h-16 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,138,63,0.3)]">
                  <span className="material-symbols-outlined text-[32px]">satellite_alt</span>
                </div>
                <h3 className="font-display-hero text-2xl font-extrabold text-white uppercase tracking-tight mb-1">
                  Secure Link Established
                </h3>
                <p className="text-[13px] text-brand-green/80 uppercase tracking-widest font-bold">
                  Connection Active
                </p>
              </div>
              
              <div className="p-8 flex flex-col gap-6">
                <p className="text-white/60 text-[14px] text-center leading-relaxed">
                  Your request has been accepted. You may now contact your mentor directly using the secure channels below.
                </p>
                
                <div className="bg-[#000000] border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-display-hero text-lg font-bold text-white shrink-0">
                      {(activeComm.mentor.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-bold uppercase tracking-widest text-[13px]">{activeComm.mentor.name}</div>
                      <div className="text-white/50 text-[11px] uppercase tracking-wider">{activeComm.mentor.role}</div>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-white/10" />
                  
                  <a href={`https://wa.me/${activeComm.mentor.phone || '919999999999'}?text=Hi%20${activeComm.mentor.name.split(' ')[0]}!%20I'm%20reaching%20out%20from%20the%20Fiammata%20Mentorship%20Network.`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-green hover:text-brand-green transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Primary Channel</span>
                      <span className="text-[14px] font-bold">+{activeComm.mentor.phone ? `${activeComm.mentor.phone.substring(0,2)} ${activeComm.mentor.phone.substring(2,7)} ${activeComm.mentor.phone.substring(7)}` : '91 XXXXX XXXXX'} (WhatsApp)</span>
                    </div>
                  </a>
                  
                  <a href={`mailto:${activeComm.mentor.email || 'mentor@fiammataracing.com'}?subject=Mentorship%20Request:%20${activeComm.req.teamName}`} className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Secondary Channel</span>
                      <span className="text-[14px] font-bold">{activeComm.mentor.email || `${activeComm.mentor.name.split(' ')[0].toLowerCase()}@fiammataracing.com`}</span>
                    </div>
                  </a>
                </div>

                <button 
                  onClick={() => setActiveComm(null)}
                  className="w-full h-12 rounded bg-white/5 text-white/70 font-bold text-[12px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                >
                  Close Connection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
