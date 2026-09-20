import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function MentorSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL) {
      addToast("Supabase not connected. Please add your credentials to .env", 'error');
      setLoading(false);
      return;
    }

    // The Vault: Hardcoded Mentor Email Whitelist
    const mentorWhitelist: Record<string, string> = {
      'swastik316250206@genesisgs.edu.in': 'mentor-1',
      'vedant306150099@genesisgs.edu.in': 'mentor-2',
      'shaurea306150085@genesisgs.edu.in': 'mentor-3',
      'naishasingla@gmail.com': 'mentor-4'
    };

    const userEmail = email.toLowerCase();
    
    if (!mentorWhitelist[userEmail]) {
      addToast("Access Denied. Email not authorized for Mentor creation.", 'error');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'mentor',
          mentorId: mentorWhitelist[userEmail]
        }
      }
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Mentor account created successfully!', 'success');
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-6 shadow-sm border-4 border-white/5">
          <span className="material-symbols-outlined text-[32px]">check_circle</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Authorization Granted</h1>
        <p className="text-white/70 max-w-md mb-8">
          Your mentor profile has been secured. You may now access the Command Center.
        </p>
        <Link to="/mentor/login" className="bg-[#000000] hover:bg-[#F0EBE7] hover:text-black text-white font-bold text-[14px] px-8 h-11 rounded-full transition-colors flex items-center justify-center border border-white/10 uppercase tracking-widest">
          Go to Mentor Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full py-10">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(200,16,46,0.1)] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 mb-4">
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            Secure Portal
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Mentor Registration</h1>
          <p className="text-sm text-white/50">Establish your secure Command Center credentials.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1.5">Authorized Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="name@genesisgs.edu.in"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1.5">Create Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-[#9B0C23] text-white font-bold text-[13px] uppercase tracking-widest h-12 rounded transition-all shadow-[0_0_15px_rgba(200,16,46,0.3)] hover:shadow-[0_0_25px_rgba(200,16,46,0.5)] border border-primary disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : 'Establish Access'}
          </button>
        </form>

        <div className="mt-8 text-center text-[12px] text-white/40 border-t border-white/5 pt-6">
          Already verified? <Link to="/mentor/login" className="font-bold text-primary hover:underline uppercase tracking-widest ml-2">Log In</Link>
        </div>
      </div>
    </div>
  );
}
