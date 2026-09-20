import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          team_name: teamName,
          role: 'student'
        }
      }
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Account created successfully! Check your email.', 'success');
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
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Check your email</h1>
        <p className="text-white/70 max-w-md mb-8">
          We've sent a verification link to <span className="font-bold text-primary">{email}</span>. Please click the link to verify your account before logging in.
        </p>
        <Link to="/login" className="bg-[#000000] hover:bg-[#F0EBE7] hover:text-black text-white font-bold text-[14px] px-8 h-11 rounded-full transition-colors flex items-center justify-center border border-white/10">
          Return to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full py-10">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Create an account</h1>
          <p className="text-sm text-[#554A48]">Join Fiammata Academy to request mentorship.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Your Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#000000] text-[14px] px-4 py-3 rounded-xl border border-white/10/80 outline-none focus:bg-[#0a0a0a] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Alex Rivera"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Team Name & School</label>
            <input 
              type="text" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full bg-[#000000] text-[14px] px-4 py-3 rounded-xl border border-white/10/80 outline-none focus:bg-[#0a0a0a] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Velocity Apex · Westlake High"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#000000] text-[14px] px-4 py-3 rounded-xl border border-white/10/80 outline-none focus:bg-[#0a0a0a] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="team@velocityapex.org"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-[#000000] text-[14px] px-4 py-3 rounded-xl border border-white/10/80 outline-none focus:bg-[#0a0a0a] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Min 6 characters"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-[#9B0C23] text-white font-bold text-[15px] h-12 rounded-full transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#554A48]">
          Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
