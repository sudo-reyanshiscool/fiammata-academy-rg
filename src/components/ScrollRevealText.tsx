import { motion } from "framer-motion";
import React from "react";

export const ScrollRevealText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = "" }) => {
  const words = text.split(" ");

  return (
    <div className="relative flex items-center justify-center w-full">
      <div className={`font-display-hero text-center font-extrabold uppercase optical-display flex flex-wrap justify-center gap-x-3 gap-y-1 ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
