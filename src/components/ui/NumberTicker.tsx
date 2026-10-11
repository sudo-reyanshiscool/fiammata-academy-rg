import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  direction = 'up',
  delay = 0,
  className,
  prefix = '',
  suffix = '',
  duration = 1.8,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(direction === 'down' ? value : 0);

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const startVal = direction === 'down' ? value : 0;
    const endVal = direction === 'down' ? 0 : value;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = (timestamp - startTimestamp) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startVal + (endVal - startVal) * easeProgress);

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [isInView, value, direction, delay, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums font-mono tracking-tight', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default NumberTicker;
