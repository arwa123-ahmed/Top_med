import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import Man from "../Man";
import { CENTER } from "../origins";
import InsightChip from "../InsightChip";

const LANES = [["HIGH", "#ef4444", 90], ["MED", "#f59e0b", 172], ["LOW", "#22c55e", 254]];

/** Scene 2: a CRITICAL card ends up in the LOW lane while the patient's heart races. */
export default function TriageScene({ mode }) {
  const ok = mode === "solution";
  return (
    <SceneFrame mode={mode}>
      {/* Patient with racing heart + ECG */}
      <Man x={150} y={390} s={0.85} shirt="#f59e0b" pants="#334155" hair="#3b2a1a" mood={ok ? "neutral" : "worried"}>
        <g transform="translate(0 -128)">
          <motion.path d="M0 12 C-22 -6 -19 -26 0 -13 C19 -26 22 -6 0 12Z" fill="#ef4444"
            style={CENTER} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: ok ? 1.2 : 0.6, repeat: Infinity }} />
        </g>
      </Man>
      <motion.path d="M60 100 H100 L112 76 L128 128 L142 90 L152 100 H210" stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
        animate={{ pathLength: [0, 1], opacity: [1, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
      <motion.g style={CENTER} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
        <circle cx="235" cy="150" r="17" fill={ok ? "#22c55e" : "#ef4444"} />
        <text x="235" y="158" textAnchor="middle" fontSize="24" fontWeight="900" fill="#fff">{ok ? "✓" : "!"}</text>
      </motion.g>

      {/* Triage nurse with tablet */}
      <Man x={410} y={390} s={0.85} coat mood="neutral" delay={0.4}>
        <rect x="-22" y="-150" width="44" height="58" rx="7" fill="#1e293b" />
        <rect x="-17" y="-145" width="34" height="42" rx="4" fill="#38bdf8" />
      </Man>

      {/* Triage lanes */}
      {LANES.map(([label, c, y]) => (
        <g key={label}>
          <rect x="570" y={y} width="190" height="66" rx="14" fill="#fff" stroke={c} strokeWidth="4" />
          <rect x="570" y={y} width="18" height="66" rx="9" fill={c} />
          <text x="672" y={y + 42} textAnchor="middle" fontSize="26" fontWeight="800" fill={c}>{label}</text>
        </g>
      ))}
      <motion.rect x="570" y={ok ? 90 : 254} width="190" height="66" rx="14" fill="none" stroke={ok ? "#22c55e" : "#ef4444"} strokeWidth="6"
        animate={{ opacity: [0, 0, 1, 0, 1, 0] }} transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.5, times: [0, 0.75, 0.8, 0.86, 0.92, 1] }} />

      {/* The card that lands in the wrong lane */}
      <g transform="translate(215 232)">
        <motion.g animate={{ x: [0, 0, 355], y: [0, -30, ok ? -140 : 50], rotate: [0, -6, 4] }}
          transition={{ duration: 3.2, times: [0, 0.2, 0.8], ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}>
          <rect width="92" height="42" rx="8" fill="#fff" stroke="#ef4444" strokeWidth="3" />
          <text x="46" y="26" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ef4444">CRITICAL</text>
        </motion.g>
      </g>
      {ok && <InsightChip x={60} y={26} text="Critical risk → routed to HIGH" />}
    </SceneFrame>
  );
}