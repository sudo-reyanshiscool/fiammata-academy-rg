import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function Login() {
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast("Successfully logged in", 'success');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm text-[#554A48]">Log in to manage your mentorship requests.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
              className="w-full bg-[#000000] text-[14px] px-4 py-3 rounded-xl border border-white/10/80 outline-none focus:bg-[#0a0a0a] focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-[#9B0C23] text-white font-bold text-[15px] h-12 rounded-full transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[#554A48]">
          Don't have an account? <Link to="/signup" className="font-bold text-primary hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
