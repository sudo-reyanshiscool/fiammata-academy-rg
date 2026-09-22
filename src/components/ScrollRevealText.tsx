import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [distanceFromCenter * 50, 0]
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [distanceFromCenter * 30, 0]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <motion.span
      className={`inline-block ${isSpace ? "w-4 sm:w-6" : ""}`}
      style={{
        x,
        rotateX,
        opacity,
        transformStyle: "preserve-3d"
      }}
    >
      {char}
    </motion.span>
  );
};

export const ScrollRevealText: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className = "" }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 90%", "center center"]
  });

  // Apply a very slow spring to the scroll progress so it lags beautifully and gives the viewer time to read
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30, // Extremely low stiffness makes it slow
    damping: 15,
    mass: 1.5
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <div
      ref={targetRef}
      className="relative flex items-center justify-center w-full"
    >
      <div
        className={`font-display-hero text-center font-extrabold uppercase optical-display ${className}`}
        style={{
          perspective: "1000px",
        }}
      >
        {characters.map((char, index) => (
          <CharacterV1
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
};
