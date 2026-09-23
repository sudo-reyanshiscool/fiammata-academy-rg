import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

  // useMotionValue bypasses React re-renders entirely — runs on the animation thread
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const springX = useSpring(motionX, { stiffness: 350, damping: 25, mass: 0.5 });
  const springY = useSpring(motionY, { stiffness: 350, damping: 25, mass: 0.5 });

  const handleMouseEnter = () => {
    if (ref.current) {
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      rectRef.current = { height, width, left, top };
    }
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current && ref.current) {
      handleMouseEnter();
    }
    const rect = rectRef.current;
    if (!rect) return;
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    motionX.set(middleX * 0.15);
    motionY.set(middleY * 0.15);
  };

  const reset = () => {
    rectRef.current = null;
    motionX.set(0);
    motionY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, willChange: 'transform' }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
