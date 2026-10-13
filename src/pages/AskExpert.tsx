import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AskExpert() {
  const [category, setCategory] = useState('Engineering & Car');
  const [question, setQuestion] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;

    let recipients = '';
    if (category === 'Engineering & Car') {
      recipients = 'VEDANT306150099@genesisgs.edu.in,reyansh@fiammata.com';
    } else {
      // Non-engineering categories go to Shaurea, Swastik, and Naisha
      recipients = 'SHAUREA306150085@genesisgs.edu.in,Swastik316250206@genesisgs.edu.in,naishasingla@gmail.com';
    }

    const subject = encodeURIComponent(`Expert Question: ${category}`);
    const body = encodeURIComponent(`From: ${user?.email || 'Guest'}\nCategory: ${category}\n\nQuestion:\n${question}`);
    
    // Open default mail client
    window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#000000] min-h-screen text-white pt-16 pb-20 px-6 sm:px-8">
      <div className="max-w-[800px] mx-auto w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4 shadow-[0_0_15px_rgba(230,0,126,0.2)]">
          <span className="material-symbols-outlined text-[14px]">forum</span>
          Direct Line
        </span>
        <h1 className="font-display-hero text-4xl sm:text-[48px] tracking-tight font-extrabold mb-4 uppercase">
          Ask an <span className="text-primary">Expert</span>
        </h1>
        <p className="text-[16px] sm:text-[18px] text-white/50 leading-relaxed font-sans mb-10">
          Submit a specific technical or strategic question directly to the Fiammata Racing engineering team inbox.
        </p>

        <div className="bg-[#0a0a0a] rounded-2xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[12px] font-bold text-white/70 uppercase tracking-widest mb-3">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#000000] text-[14px] px-4 py-3.5 rounded border border-white/10 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
              >
                <option>Engineering & Car</option>
                <option>Enterprise & Sponsorship</option>
                <option>Project Management</option>
                <option>Presentation & Judging</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-white/70 uppercase tracking-widest mb-3">Your Question</label>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                rows={6}
                placeholder="What exactly is the difference between..."
                className="w-full bg-[#000000] text-[14px] p-4 rounded border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner font-sans"
              ></textarea>
            </div>
            <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#961B81] text-white font-bold text-[14px] uppercase tracking-widest px-10 h-14 rounded transition-all shadow-[0_0_20px_rgba(230,0,126,0.4)] hover:shadow-[0_0_40px_rgba(230,0,126,0.6)] hover:-translate-y-1">
              <span className="material-symbols-outlined text-[18px]">send</span>
              Submit Telemetry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
