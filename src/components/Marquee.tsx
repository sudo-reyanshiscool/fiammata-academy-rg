import { motion } from 'framer-motion';

const items = [
  "AERODYNAMICS",
  "//",
  "TELEMETRY",
  "//",
  "SYSTEMS ENGINEERING",
  "//",
  "PROJECT MANAGEMENT",
  "//",
  "MANUFACTURING",
  "//",
  "MARKETING",
  "//",
  "PORTFOLIO DESIGN",
  "//"
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-primary py-4 relative flex items-center border-y border-white/10">
      <motion.div
        className="flex whitespace-nowrap items-center gap-8 text-white font-display-hero font-extrabold text-[24px] uppercase tracking-widest opacity-90"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {/* We duplicate the items to make the infinite loop seamless */}
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className={item === "//" ? "text-black/50 mx-4" : ""}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
