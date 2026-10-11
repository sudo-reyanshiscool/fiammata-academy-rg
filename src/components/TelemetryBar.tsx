import React from 'react';
import { motion } from 'framer-motion';
import NumberTicker from './ui/NumberTicker';
import SpotlightCard from './ui/SpotlightCard';

export const TelemetryBar: React.FC = () => {
  const metrics = [
    {
      label: 'STUDENT TEAMS COACHED',
      value: 50,
      suffix: '+',
      desc: 'Across national & regional STEM rounds',
      code: 'TEL-01',
      icon: 'groups',
    },
    {
      label: 'COMMUNITY ACCESS',
      value: 100,
      suffix: '%',
      desc: '100% free mentorship, no barriers',
      code: 'TEL-02',
      icon: 'volunteer_activism',
    },
    {
      label: 'NATIONAL ACCOLADES',
      value: 4,
      suffix: '',
      desc: 'Sustainability & Enterprise Champions',
      code: 'TEL-03',
      icon: 'emoji_events',
    },
    {
      label: 'PIT-WALL RESPONSE',
      value: 24,
      prefix: '<',
      suffix: 'h',
      desc: 'Rapid review turnaround for teams',
      code: 'TEL-04',
      icon: 'speed',
    },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-8 mt-12 mb-4 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {metrics.map((metric) => (
          <SpotlightCard
            key={metric.code}
            className="p-4 sm:p-5 bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 hover:border-primary/40 flex flex-col justify-between"
            spotlightColor="rgba(200, 16, 46, 0.2)"
            spotlightSize={320}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase">
                {metric.code}
              </span>
              <span className="material-symbols-outlined text-[18px] text-white/40 group-hover:text-primary transition-colors">
                {metric.icon}
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-1">
              <span className="font-display-hero text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                <NumberTicker
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={2.0}
                />
              </span>
            </div>

            <div className="mt-2">
              <div className="text-[11px] sm:text-[12px] font-bold text-white uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-[10px] text-white/40 font-sans mt-0.5 line-clamp-1">
                {metric.desc}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </motion.div>
    </div>
  );
};

export default TelemetryBar;
