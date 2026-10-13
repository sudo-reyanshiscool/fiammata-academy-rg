import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';

const CATEGORIES = [
  { id: 'all', label: 'All disciplines' },
  { id: 'engineering', label: 'Engineering & car' },
  { id: 'enterprise', label: 'Enterprise & sponsorship' },
  { id: 'project-management', label: 'Project management' },
  { id: 'presentation', label: 'Verbal presentation' },
];
export default function FindMentor() {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory = currentCategory === 'all' || mentor.categories.some((category) => category.toLowerCase() === currentCategory);
    const searchable = `${mentor.name} ${mentor.expertise.join(' ')} ${mentor.description}`.toLowerCase();
    return matchesCategory && (!searchQuery || searchable.includes(searchQuery.toLowerCase()));
  });

  return <div className="academy-directory">
    <section className="academy-directory-hero"><div className="academy-wrap academy-directory-hero-layout"><div className="academy-directory-hero-inner"><span className="academy-eyebrow">Fiammata Academy · Free mentorship</span><h1>Find someone<br /><em>who’s been there.</em></h1><p>Talk through your car, portfolio, sponsor pitch or presentation with National Finalists, World Finalists and active World Finalist judges.</p>
      <label className="academy-search"><Search size={19} /><span className="sr-only">Search mentors and expertise</span><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try “car optimization”, “sponsorship” or a name" /></label>
    </div><figure className="academy-directory-photo"><img src="/images/team_award.jpg" alt="Fiammata Racing team at the National Finals" /><figcaption>Fiammata Racing · National Finals</figcaption></figure></div></section>
    <section className="academy-directory-results"><div className="academy-wrap">
      <div className="academy-directory-toolbar"><nav className="academy-filter-row" aria-label="Filter mentors by discipline">{CATEGORIES.map((category) => {
        const count = category.id === 'all' ? mentors.length : mentors.filter((mentor) => mentor.categories.includes(category.id)).length;
        return <button key={category.id} onClick={() => { setCurrentCategory(category.id); setSearchQuery(''); }} aria-pressed={currentCategory === category.id} className={`academy-filter ${currentCategory === category.id ? 'is-selected' : ''}`}>{category.label}<span>{count}</span></button>;
      })}</nav>{searchQuery && <button className="academy-clear-search" onClick={() => setSearchQuery('')}>Clear search ×</button>}</div>
      <div className="academy-results-heading"><span>{filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'} to talk to</span><span>Every session is free</span></div>
      <motion.div layout className="academy-directory-grid"><AnimatePresence mode="popLayout">{filteredMentors.length ? filteredMentors.map((mentor) => <motion.div key={mentor.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}><MentorCard mentor={mentor} layout="directory" /></motion.div>) : <motion.div className="academy-empty-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h2>No mentors matched</h2><p>Try another name, skill or discipline—or ask us directly about your challenge.</p><a href="/ask-an-expert">Ask an expert <ArrowUpRight size={15} /></a></motion.div>}</AnimatePresence></motion.div>
    </div></section>
  </div>;
}
