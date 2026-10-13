import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      addToast(error.message, 'error');
    } else {
      setSuccess(true);
      addToast('Password reset link sent to your email.', 'success');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#E6F3EA] text-[#008A3F] flex items-center justify-center mb-6 shadow-sm border-4 border-white/5">
          <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Check Your Inbox</h1>
        <p className="text-white/70 max-w-md mb-8">
          We've sent a secure recovery link to <span className="font-bold text-primary">{email}</span>. Please click the link to reset your password.
        </p>
        <Link to="/auth-portal" className="bg-[#000000] hover:bg-[#F0EBE7] hover:text-black text-white font-bold text-[14px] px-8 h-11 rounded-full transition-colors flex items-center justify-center border border-white/10 uppercase tracking-widest">
          Return to Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full py-10">
      <div className="w-full max-w-md bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/5 text-white/70 border border-white/10 mb-4">
            <span className="material-symbols-outlined text-[14px]">lock_reset</span>
            Account Recovery
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2 uppercase font-display-hero">Reset Password</h1>
          <p className="text-sm text-white/50">Enter your email and we'll send you a secure link to regain access to your account.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-1.5">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
              placeholder="name@example.com"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold text-[13px] uppercase tracking-widest h-12 rounded transition-all disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {loading ? 'Transmitting...' : 'Send Recovery Link'}
          </button>
        </form>

        <div className="mt-8 text-center text-[12px] text-white/40 border-t border-white/5 pt-6">
          Remembered your password? <Link to="/auth-portal" className="font-bold text-white hover:underline uppercase tracking-widest ml-2">Log In</Link>
        </div>
      </div>
    </div>
  );
}
