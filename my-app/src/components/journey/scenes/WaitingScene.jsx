import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import Man from "../Man";
import InsightChip from "../InsightChip";
import { PIVOT } from "../origins";

const QUEUE = [
  { x: 110, shirt: "#f59e0b", hair: "#3b2a1a", mood: "worried" },
  { x: 235, shirt: "#6366f1", hair: "#111827", mood: "angry" },
  { x: 360, shirt: "#10b981", hair: "#7c4a21", mood: "angry" },
  { x: 485, shirt: "#ef4444", hair: "#374151", mood: "sad" },
];

/** Scene 3: fast clock + impatient queue. Solution: calm clock, short happy queue. */
export default function WaitingScene({ mode }) {
  const ok = mode === "solution";
  const queue = ok ? QUEUE.slice(2) : QUEUE; // solution: only two people, close to the desk
  return (
    <SceneFrame mode={mode}>
      {/* Clock */}
      <g transform="translate(400 100)">
        <circle r="60" fill="#fff" stroke="#12305a" strokeWidth="7" />
        <motion.line y2="-30" stroke="#12305a" strokeWidth="7" strokeLinecap="round" style={PIVOT} animate={{ rotate: 360 }} transition={{ duration: ok ? 60 : 8, repeat: Infinity, ease: "linear" }} />
        <motion.line y2="-46" stroke={ok ? "#22c55e" : "#e3132c"} strokeWidth="4" strokeLinecap="round" style={PIVOT} animate={{ rotate: 360 }} transition={{ duration: ok ? 12 : 1.2, repeat: Infinity, ease: "linear" }} />
        <circle r="6" fill="#12305a" />
      </g>
      {/* Badge beside the clock */}
      <g transform="translate(560 100)">
        <rect x="-78" y="-20" width="156" height="40" rx="20" fill={ok ? "#16a34a" : "#12305a"} />
        <motion.text y="8" textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff" animate={{ opacity: ok ? 1 : [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>{ok ? "Smooth flow" : "47 min"}</motion.text>
      </g>

      {/* Reception desk */}
      <Man x={705} y={340} s={0.8} shirt="#0ea5a5" mood={ok ? "happy" : "neutral"} />
      <rect x="610" y="298" width="185" height="82" rx="8" fill="#a47c55" />
      <rect x="600" y="290" width="205" height="14" rx="6" fill="#8b6440" />
      <rect x="650" y="252" width="62" height="40" rx="5" fill="#1e293b" />

      {/* Queue */}
      <line x1="50" y1="392" x2="590" y2="392" stroke="#94a3b8" strokeWidth="3" strokeDasharray="10 10" />
      {queue.map(({ x, mood, ...p }, i) => (
        <g key={x}>
          <Man x={ok ? x + 90 : x} y={395} s={0.75} delay={i * 0.25} mood={ok ? "happy" : mood} {...p} />
          {!ok && mood === "angry" && (
            <motion.text x={x} y="182" textAnchor="middle" fontSize="30" animate={{ scale: [0.8, 1.25, 0.8] }} style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }} transition={{ duration: 0.9, repeat: Infinity }}>💢</motion.text>
          )}
        </g>
      ))}
      {ok && <InsightChip x={60} y={230} text="Peak hour predicted → staff reallocated" />}
    </SceneFrame>
  );
}