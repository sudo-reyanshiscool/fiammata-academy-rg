import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event to ensure they arrived via the email link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        addToast('Recovery mode active. Enter your new password.', 'success');
      }
    });
    return () => subscription.unsubscribe();
  }, [addToast]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      addToast('Password updated successfully! You can now log in.', 'success');
      navigate('/auth-portal');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full py-10">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(230,0,126,0.1)] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 mb-4">
            <span className="material-symbols-outlined text-[14px]">key</span>
            Secure Credential
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Set New Password</h1>
          <p className="text-sm text-white/50">Enter a new secure password for your account.</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1.5">New Password</label>
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
            className="w-full bg-primary hover:bg-[#961B81] text-white font-bold text-[13px] uppercase tracking-widest h-12 rounded transition-all shadow-[0_0_15px_rgba(230,0,126,0.3)] hover:shadow-[0_0_25px_rgba(230,0,126,0.5)] border border-primary disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? 'Encrypting...' : 'Lock In Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
