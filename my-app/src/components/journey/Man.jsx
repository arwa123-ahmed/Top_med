import { motion } from "framer-motion";

/**
 * Flat-style male character (feet at 0,0; ~250px tall before scaling).
 * Props: x, y (feet position), s (scale), flip, shirt, pants, coat (doctor),
 * mood (neutral|happy|sad|angry|worried), arms (down|hip|up),
 * children = extra props drawn in the character's local space.
 */
const MOUTH = {
  happy: "M-9 -187 Q0 -178 9 -187", neutral: "M-8 -184 H8",
  sad: "M-9 -180 Q0 -189 9 -180", angry: "M-9 -180 Q0 -187 9 -180", worried: "M-9 -181 Q0 -187 9 -181",
};
const BROWS = {
  angry: ["M-20 -212 L-5 -206", "M20 -212 L5 -206"],
  worried: ["M-20 -206 L-5 -212", "M20 -206 L5 -212"],
  sad: ["M-20 -206 L-5 -211", "M20 -206 L5 -211"],
};

export default function Man({
  x = 0, y = 380, s = 0.8, flip = false, shirt = "#3b82f6", pants = "#1f3a5f",
  coat = false, hair = "#2b2118", skin = "#e3ac84",
  mood = "neutral", arms = "down", delay = 0, children,
}) {
  const a = arms === "up" ? 165 : arms === "hip" ? 28 : 6;
  const sleeve = coat ? "#ffffff" : shirt;

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="2" rx="46" ry="8" fill="#0f172a" opacity=".12" />
      {/* Gentle idle "breathing" bob */}
      <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay }}>
        {/* Legs + shoes */}
        <rect x="-24" y="-84" width="20" height="82" rx="9" fill={pants} />
        <rect x="4" y="-84" width="20" height="82" rx="9" fill={pants} />
        <ellipse cx="-16" cy="0" rx="16" ry="7" fill="#1e293b" />
        <ellipse cx="16" cy="0" rx="16" ry="7" fill="#1e293b" />

        {/* Arms (behind torso) */}
        {[[-34, a], [34, -a]].map(([px, r]) => (
          <g key={px} transform={`translate(${px} -160) rotate(${r})`}>
            <rect x="-10" y="0" width="20" height="72" rx="10" fill={sleeve} />
            <circle cy="76" r="11" fill={skin} />
          </g>
        ))}

        {/* Torso */}
        <rect x="-36" y="-174" width="72" height="98" rx="26" fill={sleeve} />
        {coat ? (
          <>
            <path d="M0 -172 V-80" stroke="#cbd5e1" strokeWidth="3" />
            <path d="M-14 -172 Q-14 -132 0 -128 Q14 -132 14 -172" stroke="#475569" strokeWidth="4" fill="none" />
            <circle cx="0" cy="-124" r="6" fill="#94a3b8" />
          </>
        ) : (
          <path d="M-12 -174 L0 -158 L12 -174Z" fill={skin} />
        )}

        {/* Head */}
        <circle cy="-200" r="30" fill={skin} />
        <circle cx="-30" cy="-198" r="6" fill={skin} />
        <circle cx="30" cy="-198" r="6" fill={skin} />
        <path d="M-31 -203 Q-36 -246 0 -244 Q36 -246 31 -203 Q14 -226 -31 -203Z" fill={hair} />

        {/* Face */}
        <circle cx="-11" cy="-198" r="3.5" fill="#1f2937" />
        <circle cx="11" cy="-198" r="3.5" fill="#1f2937" />
        {BROWS[mood]?.map((d) => <path key={d} d={d} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />)}
        <path d={MOUTH[mood] || MOUTH.neutral} stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />

        {children}
      </motion.g>
    </g>
  );
}