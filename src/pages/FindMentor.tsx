import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mentors } from '../data/mentors';
import MentorCard from '../components/MentorCard';
import Meteors from '../components/ui/Meteors';
import StatusPill from '../components/ui/StatusPill';

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'engineering', label: 'Engineering & Car' },
  { id: 'enterprise', label: 'Enterprise & Sponsorship' },
  { id: 'project-management', label: 'Project Management' },
  { id: 'presentation', label: 'Verbal Presentation' }
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
      <section className="relative w-full pt-20 pb-14 sm:pt-24 sm:pb-16 px-6 sm:px-8 border-b border-white/10 overflow-hidden bg-[#070707]">
        <Meteors number={3} scrollSensitivity={1.0} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,16,46,0.15),transparent_65%)]" />

        <div className="max-w-[1140px] mx-auto w-full relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4">
              <StatusPill
                statusText="DISCOVERY"
                label="Verified Mentor Roster"
                sublabel={`${filteredMentors.length} Coaches Active`}
              />
            </div>
            <h1 className="font-display-hero text-4xl sm:text-[58px] leading-[1.05] optical-display font-extrabold mb-4 text-white uppercase tracking-tight">
              What do you need <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary">help with?</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/60 leading-relaxed font-sans">
              Don't know who to ask? Describe your challenge below, or select a category, and we'll match you with the Fiammata engineer or manager who solved it.
            </p>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <div className="relative flex items-center w-full group">
              <span className="material-symbols-outlined absolute left-4 text-white/40 text-[20px] group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-[#0d0d0d] border border-white/15 rounded-2xl text-[14px] font-medium text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
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
              {CATEGORIES.map(cat => {
                const count = cat.id === 'all'
                  ? mentors.length
                  : mentors.filter(m => m.categories.some(c => c.toLowerCase() === cat.id.toLowerCase())).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCurrentCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-bold tracking-widest uppercase transition-all duration-300 btn-spring ${currentCategory === cat.id
                        ? 'bg-primary text-white shadow-[0_0_20px_rgba(200,16,46,0.5)] border border-primary'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${currentCategory === cat.id ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Micro Challenges (Quick Filters) */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary mr-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                COMMON CHALLENGES:
              </span>
              {COMMON_CHALLENGES.map(challenge => (
                <button
                  key={challenge}
                  onClick={() => {
                    setSearchQuery(challenge);
                    setCurrentCategory('all');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-white/10 text-[11px] font-bold uppercase tracking-wide text-white/70 hover:border-primary/50 hover:text-white transition-all btn-spring"
                >
                  {challenge}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/40 text-[11px] font-bold uppercase tracking-wide hover:bg-primary/30 transition-colors ml-auto btn-spring"
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
                  className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-[#0a0a0a] border border-white/10 rounded-2xl"
                >
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">search_off</span>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase font-display-hero">No mentors matched</h3>
                  <p className="text-white/50 text-sm max-w-md mx-auto">
                    Try adjusting your filters or search query, or ask us directly via the Ask an Expert portal.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
