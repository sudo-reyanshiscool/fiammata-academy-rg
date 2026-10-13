import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  showCorners?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(230, 0, 126, 0.18)',
  spotlightSize = 400,
  showCorners = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:border-primary/50',
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Cybernetic Corner Crosshairs */}
      {showCorners && (
        <>
          <div className="absolute top-2 left-2 pointer-events-none text-white/20 group-hover:text-primary/70 transition-colors font-mono text-[10px] select-none leading-none z-20">
            +
          </div>
          <div className="absolute top-2 right-2 pointer-events-none text-white/20 group-hover:text-primary/70 transition-colors font-mono text-[10px] select-none leading-none z-20">
            +
          </div>
          <div className="absolute bottom-2 left-2 pointer-events-none text-white/20 group-hover:text-primary/70 transition-colors font-mono text-[10px] select-none leading-none z-20">
            +
          </div>
          <div className="absolute bottom-2 right-2 pointer-events-none text-white/20 group-hover:text-primary/70 transition-colors font-mono text-[10px] select-none leading-none z-20">
            +
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
