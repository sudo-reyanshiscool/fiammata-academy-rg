import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, Settings, UserRound, X, LogOut } from 'lucide-react';

const links = [
  { to: '/', label: 'Academy' },
  { to: '/find-a-mentor', label: 'Find a mentor' },
  { to: '/ask-an-expert', label: 'Ask an expert' },
  { to: '/workshops', label: 'Workshops' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isMentor, profile, signOut } = useAuth();
  const { addToast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => { if (accountRef.current && !accountRef.current.contains(event.target as Node)) setAccountOpen(false); };
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setAccountOpen(false); setMobileOpen(false); } };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onEscape);
    return () => { document.removeEventListener('mousedown', onOutside); document.removeEventListener('keydown', onEscape); };
  }, []);

  const handleSignOut = async () => {
    setAccountOpen(false);
    setMobileOpen(false);
    await signOut();
    addToast('You have successfully signed out.', 'success');
    navigate('/');
  };

  const accountLink = isMentor ? '/mentor/dashboard' : '/my-requests';
  const accountLabel = isMentor ? 'Mentor dashboard' : 'My requests';
  return <header className="academy-header">
    <div className="academy-nav-inner">
      <Link to="/" className="academy-wordmark" onClick={() => setMobileOpen(false)} aria-label="Fiammata Academy home">
        <span className="academy-wordmark-copy"><strong>FIAMMATA</strong><small>ACADEMY</small></span>
      </Link>
      <nav className="academy-nav-links" aria-label="Main navigation">{links.map(({ to, label }) => <Link key={to} to={to} className={location.pathname === to ? 'is-current' : ''}>{label}</Link>)}</nav>
      <div className="academy-nav-actions">
        {user ? <>
          <Link to={accountLink} className="academy-nav-account">{accountLabel}<ArrowUpRight size={15} /></Link>
          <div className="academy-account-wrap" ref={accountRef}>
            <button className="academy-account-button" onClick={() => setAccountOpen((open) => !open)} aria-expanded={accountOpen} aria-label="Open account menu"><span>{profile?.fullName?.charAt(0) || user.email?.charAt(0) || 'F'}</span><ChevronDown size={14} /></button>
            {accountOpen && <div className="academy-account-menu"><div className="academy-account-identity"><small>{isMentor ? 'MENTOR ACCESS' : 'TEAM ACCOUNT'}</small><strong>{profile?.fullName || user.email}</strong>{profile?.teamName && <span>{profile.teamName}</span>}</div><Link to="/profile" onClick={() => setAccountOpen(false)}><UserRound size={15} /> My profile</Link><Link to="/settings" onClick={() => setAccountOpen(false)}><Settings size={15} /> Settings</Link><button onClick={handleSignOut}><LogOut size={15} /> Sign out</button></div>}
          </div>
        </> : <Link to="/auth-portal" className="academy-nav-login">Log in <ArrowUpRight size={15} /></Link>}
        <button className="academy-menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}>{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </div>
    {mobileOpen && <nav className="academy-mobile-menu" aria-label="Mobile navigation">{links.map(({ to, label }) => <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={location.pathname === to ? 'is-current' : ''}>{label}<ArrowUpRight size={17} /></Link>)}{user ? <><Link to={accountLink} onClick={() => setMobileOpen(false)}>{accountLabel}<ArrowUpRight size={17} /></Link><button onClick={handleSignOut}>Sign out<LogOut size={17} /></button></> : <Link to="/auth-portal" onClick={() => setMobileOpen(false)}>Log in<ArrowUpRight size={17} /></Link>}</nav>}
  </header>;
}
