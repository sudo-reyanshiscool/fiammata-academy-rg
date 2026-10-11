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
const COMMON_CHALLENGES = ['Car Optimization', 'Sponsorship Pitching', 'Portfolio Design', 'Project Management', 'Verbal Presentation'];

export default function FindMentor() {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredMentors = mentors.filter((mentor) => {
    const matchesCategory = currentCategory === 'all' || mentor.categories.some((category) => category.toLowerCase() === currentCategory);
    const searchable = `${mentor.name} ${mentor.expertise.join(' ')} ${mentor.description}`.toLowerCase();
    return matchesCategory && (!searchQuery || searchable.includes(searchQuery.toLowerCase()));
  });

  return <div className="academy-directory">
    <section className="academy-directory-hero"><div className="academy-wrap academy-directory-hero-inner"><span className="academy-eyebrow">04 — Find your person</span><h1>What do you need<br /><em>help with?</em></h1><p>Connect with National Finalists, World Finalists and active World Finalist judges. Search for your challenge or choose a discipline to find the right mentor.</p>
      <label className="academy-search"><Search size={19} /><span className="sr-only">Search mentors and expertise</span><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try “car optimisation” or a mentor’s name" /></label>
    </div></section>
    <section className="academy-directory-results"><div className="academy-wrap">
      <div className="academy-filter-row" aria-label="Filter mentors by discipline">{CATEGORIES.map((category) => {
        const count = category.id === 'all' ? mentors.length : mentors.filter((mentor) => mentor.categories.includes(category.id)).length;
        return <button key={category.id} onClick={() => { setCurrentCategory(category.id); setSearchQuery(''); }} aria-pressed={currentCategory === category.id} className={`academy-filter ${currentCategory === category.id ? 'is-selected' : ''}`}>{category.label}<span>{count}</span></button>;
      })}</div>
      <div className="academy-challenges"><span>Common challenges</span>{COMMON_CHALLENGES.map((challenge) => <button key={challenge} onClick={() => { setSearchQuery(challenge); setCurrentCategory('all'); }}>{challenge}</button>)}{searchQuery && <button className="academy-clear-search" onClick={() => setSearchQuery('')}>Clear search ×</button>}</div>
      <div className="academy-results-heading"><span>{filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}</span><span>100% free · built from experience</span></div>
      <motion.div layout className="academy-directory-grid"><AnimatePresence mode="popLayout">{filteredMentors.length ? filteredMentors.map((mentor) => <motion.div key={mentor.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}><MentorCard mentor={mentor} layout="grid" /></motion.div>) : <motion.div className="academy-empty-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h2>No mentors matched</h2><p>Try adjusting your filters or search query, or ask us directly via the Ask an Expert portal.</p><a href="/ask-an-expert">Ask an expert <ArrowUpRight size={15} /></a></motion.div>}</AnimatePresence></motion.div>
    </div></section>
  </div>;
}
