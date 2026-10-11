import { useParams, Link, useNavigate } from 'react-router-dom';
import { mentors } from '../data/mentors';

export default function MentorProfile() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === mentorId);

  if (!mentor) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">That mentor couldn't be found.</h2>
        <Link to="/find-a-mentor" className="text-primary hover:underline">Back to mentors</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-[#000000] text-white pt-8 pb-16">
      <div className="max-w-[700px] mx-auto px-6">
        <div className="py-3 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/60 hover:text-primary transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">arrow_back</span>
            <span>Back to Mentors</span>
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-sm text-center flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center font-display-hero text-4xl font-extrabold text-white mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {mentor.image ? <img src={mentor.image} alt={mentor.name} className="w-full h-full rounded-2xl object-cover object-top" /> : mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          
          <h1 className="text-[32px] sm:text-[36px] font-extrabold text-white tracking-tight leading-none mb-2">
            {mentor.name}
          </h1>
          <p className="text-[15px] font-bold text-primary uppercase tracking-wider mb-6">
            {mentor.role} · Fiammata Racing
          </p>

          <p className="text-[16px] text-white/70 leading-relaxed max-w-[500px] mb-8">
            {mentor.description}
          </p>

          <div className="w-full border-t border-white/10 pt-8 mb-8">
            <h3 className="text-[15px] font-bold text-white mb-4">I can help with:</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {mentor.expertise.map(exp => (
                <span key={exp} className="px-3.5 py-1.5 rounded-full text-[13px] font-bold tracking-wide uppercase bg-white/5 text-white/70 border-white/10">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          <Link 
            to={`/request/${mentor.id}`} 
            className="w-full sm:w-auto inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-bold text-[15px] px-10 h-12 rounded-full transition-all shadow-[0_4px_16px_rgba(224,43,32,0.3)] active:scale-[0.98]"
          >
            Request Mentor
          </Link>
        </div>
      </div>
    </div>
  );
}
