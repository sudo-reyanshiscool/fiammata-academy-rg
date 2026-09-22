import { motion } from "framer-motion";
import React from "react";

const STAGGER = 0.025;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className = "", center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden ${className}`}
      style={{
        lineHeight: 1.1, // Adjusted from 0.75 for better readability
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.25
              }}
              className="inline-block whitespace-pre"
              key={`top-${i}`}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.25
              }}
              className="inline-block whitespace-pre"
              key={`bottom-${i}`}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};
