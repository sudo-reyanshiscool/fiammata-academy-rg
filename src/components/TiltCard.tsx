import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      handleMouseEnter();
    }
    const rect = rectRef.current;
    if (!rect) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      className={`relative w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
