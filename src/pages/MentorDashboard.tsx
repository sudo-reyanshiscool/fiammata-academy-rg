import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mentors } from '../data/mentors';
import { requestRepository, type MentorshipRequest } from '../repository/requestRepository';
import { motion } from 'framer-motion';

export default function MentorDashboard() {
  const { isMentor, mentorId } = useAuth();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const allRequests = await requestRepository.getAllRequests();
        // Filter requests to only show those for the logged in mentor
        const myRequests = allRequests.filter(req => req.mentorId === mentorId);
        
        // Sort: pending first, then accepted, then others
        const sorted = [...myRequests].sort((a, b) => {
          const statusWeight = { pending: 0, accepted: 1, declined: 2, completed: 3 } as Record<string, number>;
          return (statusWeight[a.status] ?? 99) - (statusWeight[b.status] ?? 99);
        });
        
        setRequests(sorted);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isMentor && mentorId) {
      fetchRequests();
    }
  }, [isMentor, mentorId]);

  const handleStatusUpdate = async (id: string, status: 'accepted' | 'declined' | 'completed') => {
    try {
      await requestRepository.updateRequestStatus(id, status);
      // Optimistically update UI
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center py-20 bg-[#000000] text-white">Loading Command Center...</div>;
  }

  const currentMentorProfile = mentors.find(m => m.id === mentorId);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#000000] text-white font-sans">
      <section className="relative w-full pt-16 pb-10 sm:pt-20 sm:pb-12 px-6 sm:px-8 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        
        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 self-start mb-2">
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            Command Center
          </span>
          <h1 className="font-display-hero text-3xl sm:text-[48px] sm:leading-[56px] text-white tracking-tight font-extrabold uppercase">
            Mentor <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-[15px] text-white/50 max-w-2xl font-sans mt-2">
            Incoming Requests for {currentMentorProfile?.name || 'Mentor'} // Fiammata Network
          </p>
        </div>
      </section>

      <section className="max-w-[1140px] w-full mx-auto px-6 sm:px-8 py-10 sm:py-12 flex-1 relative z-10">
        {requests.length === 0 ? (
          <div className="bg-[#0a0a0a] rounded-2xl p-10 text-center border border-white/10">
            <h3 className="text-xl font-display-hero font-bold text-white mb-2 uppercase tracking-wide">No active requests</h3>
            <p className="text-white/50 font-sans text-[13px]">System is currently clear.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {requests.map((req, i) => {
              const mentor = mentors.find(m => m.id === req.mentorId);
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={req.id} 
                  className={`bg-[#0a0a0a] rounded-xl p-5 sm:p-7 border transition-all ${
                    req.status === 'pending' ? 'border-brand-gold/30' :
                    req.status === 'accepted' ? 'border-brand-green/30' :
                    'border-white/10 opacity-75'
                  }`}
                >
                  <div className="flex flex-col xl:flex-row justify-between gap-6">
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border ${
                          req.status === 'pending' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/30' :
                          req.status === 'accepted' ? 'bg-brand-green/10 text-brand-green border-brand-green/30' :
                          req.status === 'declined' ? 'bg-primary/10 text-primary border-primary/30' :
                          'bg-white/5 text-white/50 border-white/10'
                        }`}>
                          {req.status.toUpperCase()}
                        </span>
                        <span className="font-sans text-[11px] text-white/30 tracking-wider">ID: {req.id.substring(0,8).toUpperCase()}</span>
                        <span className="font-sans text-[11px] text-white/30 tracking-wider">DATE: {new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <h2 className="font-display-hero font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase leading-none mb-1.5">
                        {req.areaOfHelp}
                      </h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 font-sans text-[12px] text-white/70">
                        <div className="flex flex-col gap-1 p-3 bg-white/5 rounded border border-white/10">
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">Target Mentor</span>
                          <span className="font-bold text-white">{mentor?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 bg-white/5 rounded border border-white/10">
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">Student / Team</span>
                          <span className="font-bold text-white">{req.studentName} ({req.teamName})</span>
                          <span className="text-primary">{req.studentEmail}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 rounded bg-[#000000] border border-white/5 font-sans text-[13px] text-white/60 leading-relaxed">
                        {'>'} {req.problemStatement}
                      </div>
                    </div>
                    
                    <div className="shrink-0 flex flex-row xl:flex-col items-center xl:items-end justify-center gap-2 pt-4 xl:pt-0 border-t xl:border-t-0 xl:border-l border-white/10 xl:pl-6 mt-4 xl:mt-0">
                      {req.status === 'pending' ? (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'accepted')}
                            className="w-full inline-flex items-center justify-center gap-2 font-bold text-[12px] uppercase tracking-widest px-6 h-10 rounded bg-brand-green text-[#000000] hover:bg-brand-green transition-all"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'declined')}
                            className="w-full inline-flex items-center justify-center gap-2 font-bold text-[12px] uppercase tracking-widest px-6 h-10 rounded bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <div className="text-[12px] font-sans text-white/40 uppercase tracking-widest text-center xl:text-right">
                          Status Locked
                          {req.status === 'accepted' && (
                            <button 
                              onClick={() => handleStatusUpdate(req.id, 'completed')}
                              className="mt-3 w-full inline-flex items-center justify-center gap-2 font-bold text-[11px] uppercase tracking-widest px-4 h-8 rounded bg-white/10 text-white/70 hover:bg-white/20 transition-all"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
