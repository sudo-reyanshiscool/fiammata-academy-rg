import React from 'react';
import { cn } from '../../lib/utils';

interface StatusPillProps {
  label: string;
  sublabel?: string;
  statusText?: string;
  pulseColor?: string;
  className?: string;
  href?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  sublabel,
  statusText,
  pulseColor = 'bg-primary',
  className,
}) => {
  return (
    <div
      className={cn(
        'group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full',
        'bg-[#121212]/90 hover:bg-[#181818] border border-white/10 hover:border-primary/40',
        'backdrop-blur-md shadow-[0_0_20px_rgba(237,109,5,0.15)] transition-all duration-300',
        className
      )}
    >
      {/* Radar Pulse Indicator */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            pulseColor
          )}
        />
        <span className={cn('relative inline-flex rounded-full h-2 w-2 shadow-[0_0_8px_#ED6D05]', pulseColor)} />
      </span>

      {statusText && (
        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary border-r border-white/15 pr-2.5">
          {statusText}
        </span>
      )}

      <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-wider text-white uppercase">
        {label}
      </span>

      {sublabel && (
        <span className="hidden sm:inline-block font-sans text-[11px] font-medium text-white/50 border-l border-white/10 pl-2.5">
          {sublabel}
        </span>
      )}

      {/* Shimmer line */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-shimmer-sweep" />
      </div>
    </div>
  );
};

export default StatusPill;
