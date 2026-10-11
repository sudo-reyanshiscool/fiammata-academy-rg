import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return <footer className="academy-footer"><div className="academy-wrap academy-footer-inner">
    <div><Link to="/" className="academy-wordmark academy-footer-wordmark"><span className="academy-wordmark-icon" aria-hidden="true">F</span><span className="academy-wordmark-copy"><strong>FIAMMATA</strong><small>ACADEMY</small></span></Link><p>An initiative of Fiammata Racing.<br />Your team. Our expertise. Learn from experience. Build it yourself.</p></div>
    <div className="academy-footer-right"><span>Free mentorship for the next generation of STEM Racing teams.</span><div><a href="https://fiammata-racing-hub.base44.app/" target="_blank" rel="noopener noreferrer">Main website <ArrowUpRight size={14} /></a><a href="https://instagram.com/fiammataracing" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a></div><small>© {new Date().getFullYear()} Fiammata Academy</small></div>
  </div></footer>;
}
