import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function MentorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL) {
      addToast("Supabase not connected. Please add your credentials to .env", 'error');
      setLoading(false);
      return;
    }
    
    // Quick local check to prevent unnecessary requests
    const mentorWhitelist = [
      'swastik316250206@genesisgs.edu.in',
      'vedant306150099@genesisgs.edu.in',
      'shaurea306150085@genesisgs.edu.in',
      'naishasingla@gmail.com'
    ];
    
    if (!mentorWhitelist.includes(email.toLowerCase())) {
      addToast("Access Denied. Email not recognized in the Mentor Vault.", 'error');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast("Command Center access granted.", 'success');
      navigate('/mentor/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(200,16,46,0.1)] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 mb-4">
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            Secure Portal
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Mentor Login</h1>
          <p className="text-sm text-white/50">Authenticate to access the Command Center.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="mentor@fiammataracing.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50">Secure Password</label>
              <Link to="/forgot-password" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Forgot?</Link>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-[#9B0C23] text-white font-bold text-[13px] uppercase tracking-widest h-12 rounded transition-all shadow-[0_0_15px_rgba(200,16,46,0.3)] hover:shadow-[0_0_25px_rgba(200,16,46,0.5)] border border-primary disabled:opacity-50 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Establish Connection'}
          </button>
        </form>

        <div className="mt-8 text-center text-[12px] text-white/40 border-t border-white/5 pt-6 leading-relaxed">
          Need secure access? <Link to="/mentor/signup" className="font-bold text-primary hover:underline uppercase tracking-widest ml-2">Register Identity</Link>
        </div>
      </div>
    </div>
  );
}
