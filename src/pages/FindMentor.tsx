import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'engineering', label: 'Engineering & Car' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'project-management', label: 'Project Management' },
  { id: 'presentation', label: 'Presentation' }
];

const COMMON_CHALLENGES = [
  'Car Optimization',
  'Sponsorship Pitching',
  'Portfolio Design',
  'Project Management',
  'Verbal Presentation'
];

export default function FindMentor() {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMentors = mentors.filter(mentor => {
    const matchesCategory = currentCategory === 'all' || mentor.categories.some(c => c.toLowerCase() === currentCategory.toLowerCase());
    const searchString = `${mentor.name} ${mentor.expertise.join(' ')} ${mentor.description}`.toLowerCase();
    const matchesQuery = !searchQuery || searchString.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full bg-[#000000] min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 sm:px-8 border-b border-white/10 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C8102E10,transparent_50%)]" />
        
        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-4 shadow-[0_0_15px_rgba(217,56,45,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Guided Discovery
            </span>
            <h1 className="font-display-hero text-4xl sm:text-[56px] sm:leading-[1.1] optical-display font-extrabold mb-4 text-white uppercase">
              What do you need <span className="text-primary">help with?</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/50 leading-relaxed font-sans">
              Don't know who to ask? Describe your challenge below, or select a category, and we'll match you with the Fiammata engineer or manager who solved it.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <div className="relative flex items-center w-full group">
              <span className="material-symbols-outlined absolute left-4 text-white/40 text-[20px] group-focus-within:text-primary transition-colors">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-[#000000] border border-white/10 rounded-xl text-[14px] font-medium text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                placeholder="I'm struggling with..." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="w-full px-6 sm:px-8 py-10 sm:py-12 relative z-10 flex-1">
        <div className="max-w-[1140px] mx-auto w-full">
          
          {/* Discovery Controls */}
          <div className="flex flex-col gap-6 mb-10">
            
            {/* Macro Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentCategory(cat.id);
                    setSearchQuery(''); // Clear search to prevent stale queries from hiding category results
                  }}
                  className={`px-5 py-2.5 rounded text-[12px] font-bold tracking-widest uppercase transition-all duration-300 btn-spring ${
                    currentCategory === cat.id 
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(200,16,46,0.4)] border border-primary' 
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Micro Challenges (Quick Filters) */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mr-2">Common Challenges:</span>
              {COMMON_CHALLENGES.map(challenge => (
                <button
                  key={challenge}
                  onClick={() => {
                    setSearchQuery(challenge);
                    setCurrentCategory('all');
                  }}
                  className="px-3 py-1.5 rounded bg-[#0a0a0a] border border-white/10 text-[11px] font-bold uppercase tracking-wide text-white/70 hover:border-primary/50 hover:text-white transition-colors btn-spring"
                >
                  {challenge}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 rounded bg-primary/10 text-primary border border-primary/20 text-[11px] font-bold uppercase tracking-wide hover:bg-primary/20 transition-colors ml-auto btn-spring"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredMentors.length > 0 ? (
                filteredMentors.map(mentor => (
                  <motion.div 
                    key={mentor.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    className="h-full"
                  >
                    <MentorCard mentor={mentor} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 p-10 text-center bg-white/5 border border-white/10 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-white mb-2">No mentors found.</h3>
                  <p className="text-white/50">Try adjusting your filters or search query.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
