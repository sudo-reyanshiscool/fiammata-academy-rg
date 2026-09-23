import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileRepository } from '../repository/profileRepository';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettings() {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [institution, setInstitution] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [competitionClass, setCompetitionClass] = useState<'Development Class' | 'Professional Class' | 'Cadet' | 'University / Open'>('Development Class');
  const [competitionStage, setCompetitionStage] = useState<'Regionals Prep' | 'National Finals' | 'World Finals' | 'General STEM'>('Regionals Prep');
  const [autoFillRequests, setAutoFillRequests] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || user?.user_metadata?.full_name || '');
      setTeamName(profile.teamName || '');
      setInstitution(profile.institution || 'Genesis Global School');
      setPhone(profile.phone || '');
      setPrimaryCategory(profile.primaryCategory || 'Enterprise Portfolio');
      setCompetitionClass(profile.competitionClass || 'Development Class');
      setCompetitionStage(profile.competitionStage || 'Regionals Prep');
      setAutoFillRequests(profile.autoFillRequests ?? true);
      setNotificationsEnabled(profile.notificationsEnabled ?? true);
    }
  }, [profile, user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileRepository.updateProfile(user, {
        fullName,
        teamName,
        institution,
        phone,
        primaryCategory,
        competitionClass,
        competitionStage,
        autoFillRequests,
        notificationsEnabled,
      });
      await refreshProfile();
      addToast('🏎️ Pit Pass & telemetry settings saved!', 'success');
    } catch (err: any) {
      addToast(err.message || 'Failed to save settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    addToast('Signed out successfully.', 'success');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.trim().toUpperCase() !== 'DELETE') {
      addToast('Please type DELETE to confirm account purge.', 'error');
      return;
    }

    setIsDeleting(true);
    try {
      await profileRepository.deleteAccountData(user);
      await signOut();
      setShowDeleteModal(false);
      addToast('Account and telemetry data purged successfully.', 'success');
      navigate('/');
    } catch (err: any) {
      addToast(err.message || 'Failed to purge account.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const disciplines = [
    'Enterprise Portfolio',
    'Design & Engineering Portfolio',
    'Project Management',
    'Aerodynamics & Car Optimization',
    'Marketing & Sponsorship Pitching',
    'Verbal Presentation'
  ];

  return (
    <div className="flex-1 w-full bg-[#000000] text-white pt-12 pb-24 px-6 sm:px-8 font-sans">
      <div className="max-w-[1140px] mx-auto w-full">
        
        {/* Header Breadcrumb / Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-3 shadow-[0_0_15px_rgba(217,56,45,0.2)]">
            <span className="material-symbols-outlined text-[14px]">badge</span>
            Pilot / Racer Credentials
          </div>
          <h1 className="font-display-hero text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-2">
            Profile & <span className="text-primary">Settings</span>
          </h1>
          <p className="text-white/70 text-[15px] max-w-xl">
            Configure your racing identity, automated telemetry autofill, and security preferences.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: ID Telemetry Card & Quick Actions */}
          <div className="flex flex-col gap-6">
            
            {/* Holographic Pit Pass Identity Card */}
            <div className="bg-gradient-to-br from-[#121216] via-[#0c0c0e] to-[#08080a] rounded-3xl p-6 sm:p-7 border border-primary/30 shadow-[0_0_40px_rgba(200,16,46,0.15)] relative overflow-hidden group">
              {/* Shimmer / Hologram Glare Effect */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] group-hover:animate-[glare_1.5s_ease-in-out_forwards] pointer-events-none" />
              <div className="absolute top-0 right-0 w-44 h-44 bg-primary/15 rounded-bl-full pointer-events-none blur-3xl" />
              
              {/* Pit Pass Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-display-hero text-[12px] font-extrabold uppercase tracking-widest text-white">
                    Official Pit Pass
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {profile?.licenseNumber || 'FIA-2026-8800'}
                </span>
              </div>

              {/* Pilot Info */}
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#8B0000] flex items-center justify-center text-white font-display-hero text-2xl font-black shadow-lg border border-primary/40 shrink-0">
                  {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display-hero text-xl font-bold uppercase tracking-wide truncate text-white leading-tight">
                    {fullName || 'Racer Name'}
                  </h3>
                  <p className="text-[13px] text-primary font-extrabold uppercase tracking-wider truncate">
                    {teamName || 'Unregistered Team'}
                  </p>
                  <p className="text-[11px] text-white/50 truncate font-mono mt-0.5">{institution || 'Genesis Global School'}</p>
                </div>
              </div>

              {/* Competition Telemetry Pills */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-[11px] relative z-10 mb-4">
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-bold">Class</span>
                  <span className="font-bold text-white truncate block">{competitionClass}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider font-bold">Stage</span>
                  <span className="font-bold text-emerald-400 truncate block">{competitionStage}</span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex items-center justify-between text-[11px] relative z-10">
                <span className="text-white/60">Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {teamName.trim() ? '1-Click Ready' : 'Incomplete'}
                </span>
              </div>
            </div>

            {/* Account Quick Links Box */}
            <div className="bg-[#0c0c0e] rounded-3xl p-6 border border-white/10 shadow-lg flex flex-col gap-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">
                Navigation
              </h4>
              <button
                onClick={() => navigate('/my-requests')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-[13px] font-bold uppercase tracking-wider text-left border border-white/5 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">list_alt</span>
                  <span>My Active Requests</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-white/40">arrow_forward</span>
              </button>

              <button
                onClick={() => navigate('/workshops')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-[13px] font-bold uppercase tracking-wider text-left border border-white/5 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">event</span>
                  <span>View Workshops</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-white/40">arrow_forward</span>
              </button>

              <button
                onClick={() => navigate('/find-a-mentor')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-[13px] font-bold uppercase tracking-wider text-left border border-white/5 min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-blue-400 text-[18px]">group</span>
                  <span>Find a Mentor</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-white/40">arrow_forward</span>
              </button>
            </div>

          </div>

          {/* Right Column: Profile Form & Settings Table (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Main Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-[#0c0c0e] rounded-3xl p-7 sm:p-9 border border-white/10 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <h2 className="font-display-hero text-2xl font-bold uppercase tracking-wide text-white">
                    Racer Identification
                  </h2>
                  <p className="text-[13px] text-white/60">
                    This information is used to auto-populate your mentorship requests automatically.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[28px]">speed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Swastik Katiyar"
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    Registered Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Velocity Apex"
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    School / Institution
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Genesis Global School"
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    WhatsApp / Phone Contact
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Competition Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    Competition Class
                  </label>
                  <select
                    value={competitionClass}
                    onChange={(e) => setCompetitionClass(e.target.value as any)}
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    <option value="Development Class" className="bg-neutral-900 text-white">Development Class</option>
                    <option value="Professional Class" className="bg-neutral-900 text-white">Professional Class</option>
                    <option value="Cadet" className="bg-neutral-900 text-white">Cadet</option>
                    <option value="University / Open" className="bg-neutral-900 text-white">University / Open</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                    Current Season Stage
                  </label>
                  <select
                    value={competitionStage}
                    onChange={(e) => setCompetitionStage(e.target.value as any)}
                    className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  >
                    <option value="Regionals Prep" className="bg-neutral-900 text-white">Regionals Prep</option>
                    <option value="National Finals" className="bg-neutral-900 text-white">National Finals</option>
                    <option value="World Finals" className="bg-neutral-900 text-white">World Finals</option>
                    <option value="General STEM" className="bg-neutral-900 text-white">General STEM Competition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/50 mb-2">
                  Primary STEM Discipline
                </label>
                <select
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value)}
                  className="w-full bg-[#000000] text-white text-[14px] px-4 py-3.5 rounded-xl border border-white/10 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                >
                  {disciplines.map((d) => (
                    <option key={d} value={d} className="bg-neutral-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferences Toggles */}
              <div className="bg-[#000000] p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wide text-white">
                      ⚡ Automated Mentorship Request Autofill
                    </h4>
                    <p className="text-[12px] text-white/60">
                      When contacting a mentor, automatically pre-fill your team name, contact, and category so you never have to retype them.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoFillRequests}
                      onChange={(e) => setAutoFillRequests(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wide text-white">
                      🔔 Notification Alerts
                    </h4>
                    <p className="text-[12px] text-white/60">
                      Receive alerts when your mentorship request status changes to accepted or completed.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-[44px] px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-extrabold text-[13px] uppercase tracking-wider transition-all shadow-lg shadow-primary/20 flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {saving ? 'sync' : 'save'}
                  </span>
                  <span>{saving ? 'Saving...' : 'Save Profile Settings'}</span>
                </button>
              </div>
            </form>

            {/* Dedicated Settings & Account Management Table */}
            <div className="bg-[#0c0c0e] rounded-3xl p-7 sm:p-9 border border-white/10 shadow-xl flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display-hero text-2xl font-bold uppercase tracking-wide text-white">
                  Account Management & Security
                </h2>
                <p className="text-[13px] text-white/60">
                  Manage active credentials, security keys, and data retention.
                </p>
              </div>

              {/* Settings Table */}
              <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden bg-[#000000]">
                
                {/* Row 1: Session Status & Sign Out */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-white uppercase tracking-wide">
                      Active Telemetry Session
                    </h4>
                    <p className="text-[12px] text-white/60">
                      Signed in as <span className="font-mono text-white/90">{user?.email}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="min-h-[44px] px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-extrabold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Sign Out
                  </button>
                </div>

                {/* Row 2: Security & Password */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-[13px] font-bold text-white uppercase tracking-wide">
                      Security & Password
                    </h4>
                    <p className="text-[12px] text-white/60">
                      Reset your password or update security credentials.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/forgot-password')}
                    className="min-h-[44px] px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-[12px] font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                    Reset Password
                  </button>
                </div>

                {/* Row 3: Danger Zone (Delete Account) */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-red-950/20">
                  <div>
                    <h4 className="text-[13px] font-bold text-red-400 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      Danger Zone: Purge Account
                    </h4>
                    <p className="text-[12px] text-white/60">
                      Permanently wipe all student profile telemetry, saved requests, and account credentials.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="min-h-[44px] px-5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/30 text-[12px] font-extrabold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                    Delete Account
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0c0e] rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-2xl max-w-md w-full text-center relative"
            >
              <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <span className="material-symbols-outlined text-[28px]">warning</span>
              </div>
              <h3 className="text-xl font-display-hero font-bold uppercase tracking-wide text-white mb-2">
                Purge Account & Telemetry?
              </h3>
              <p className="text-white/60 text-[13px] mb-6 leading-relaxed">
                This action is irreversible. All your submitted mentorship requests, saved profile data, and session credentials will be permanently erased.
              </p>

              <div className="mb-6 text-left">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1.5">
                  Type <span className="text-red-400 font-bold">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="w-full bg-[#000000] text-white text-[14px] px-4 py-3 rounded-xl border border-red-500/30 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all font-mono text-center tracking-widest"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation('');
                  }}
                  className="flex-1 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-[12px] uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteConfirmation.trim().toUpperCase() !== 'DELETE' || isDeleting}
                  onClick={handleDeleteAccount}
                  className="flex-1 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-extrabold text-[12px] uppercase tracking-wider transition-all shadow-lg shadow-red-900/40"
                >
                  {isDeleting ? 'Purging...' : 'Confirm Purge'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
