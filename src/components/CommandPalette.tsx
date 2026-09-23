import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mentors } from '../data/mentors';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
    }
  }, [isOpen, query]);

  const actions = [
    { name: 'Go to Home', action: () => navigate('/') },
    { name: 'Find a Mentor', action: () => navigate('/find-a-mentor') },
    { name: 'My Requests', action: () => navigate('/my-requests') },
    { name: 'Profile & Settings', action: () => navigate('/profile') },
    { name: 'Ask an Expert', action: () => navigate('/ask-an-expert') },
    { name: 'Workshops', action: () => navigate('/workshops') },
    ...mentors.map(m => ({
      name: `Mentor: ${m.name}`,
      action: () => {
        navigate(`/find-a-mentor?query=${encodeURIComponent(m.name)}`);
      }
    }))
  ];

  const filteredActions = actions.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredActions.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-auto"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                setIsOpen(false);
              }
            }}
            className="relative w-full max-w-[600px] glass-panel rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
          >
            <div className="flex items-center px-4 border-b border-white/10">
              <span className="material-symbols-outlined text-white/50 text-xl mr-3">search</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search mentors, pages, or commands..."
                className="w-full h-14 bg-transparent border-none outline-none text-white text-[15px] font-sans placeholder:text-white/30"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-white/10 text-white/50 text-[10px] font-bold font-sans">ESC</kbd>
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filteredActions.length === 0 ? (
                <div className="px-6 py-8 text-center text-white/40 text-[13px] font-sans">
                  No results found for "{query}"
                </div>
              ) : (
                filteredActions.map((action, index) => (
                  <div
                    key={action.name}
                    className={`px-4 py-3 mx-2 rounded-lg cursor-pointer flex items-center gap-3 transition-colors btn-spring ${
                      index === selectedIndex 
                        ? 'bg-primary/20 text-white border border-primary/30' 
                        : 'text-white/60 hover:bg-white/5'
                    }`}
                    onClick={() => {
                      action.action();
                      setIsOpen(false);
                    }}
                  >
                    {action.name.startsWith('Mentor:') ? (
                      <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">terminal</span>
                    )}
                    <span className={`text-[13px] font-bold tracking-widest uppercase ${index === selectedIndex ? 'text-primary' : ''}`}>
                      {action.name}
                    </span>
                    {index === selectedIndex && (
                      <span className="material-symbols-outlined text-[14px] text-primary ml-auto">subdirectory_arrow_left</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
