const items = [
  "TRUSTED BY REAL WORLD FINALIST JUDGES",
  "//",
  "NATIONAL & WORLD FINALISTS",
  "//",
  "AERODYNAMICS",
  "//",
  "WORLD FINALIST JUDGING STANDARDS",
  "//",
  "SYSTEMS ENGINEERING",
  "//",
  "PROJECT MANAGEMENT",
  "//",
  "PORTFOLIO DESIGN",
  "//"
];

const repeatedItems = [...items, ...items, ...items];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-primary py-4 relative flex items-center border-y border-white/10">
      <div
        className="flex whitespace-nowrap items-center gap-8 text-white font-display-hero font-extrabold text-[24px] uppercase tracking-widest opacity-90 animate-marquee"
        style={{ willChange: "transform" }}
      >
        {repeatedItems.map((item, i) => (
          <span key={i} className={item === "//" ? "text-black/50 mx-4" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
