import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import Man from "../Man";
import { CENTER, PIVOT } from "../origins";
import InsightChip from "../InsightChip";

const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00"];

/** Scene 1: appointment board fills up, one slot stays empty; empty chair + ghost patient. */
export default function NoShowScene({ mode }) {
  const ok = mode === "solution";
  return (
    <SceneFrame mode={mode}>
      {/* Appointment board */}
      <g transform="translate(50 60)">
        <rect width="260" height="250" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
        <rect width="260" height="40" rx="18" fill="#12305a" />
        <text x="130" y="27" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">TODAY · OPD</text>
        {SLOTS.map((t, i) => (
          <g key={t}>
            <motion.rect x="14" y={56 + i * 37} width="232" height="28" rx="8" initial={{ fill: "#e2e8f0" }}
              animate={i === 3 && !ok ? { fill: ["#e2e8f0", "#e2e8f0", "#fca5a5", "#ef4444", "#fca5a5"] } : { fill: ["#e2e8f0", "#bbf7d0"] }}
              transition={{ delay: i * 0.35, duration: i === 3 && !ok ? 2.4 : 0.5, repeat: i === 3 && !ok ? Infinity : 0 }} />
            <text x="26" y={76 + i * 37} fontSize="15" fontWeight="700" fill="#334155">{t}</text>
            {i === 3 && <text x="234" y={76 + i * 37} textAnchor="end" fontSize="14" fontWeight="800" fill={ok ? "#166534" : "#7f1d1d"}>{ok ? "ATTENDED" : "NO-SHOW"}</text>}
          </g>
        ))}
      </g>

      {/* Wall clock */}
      <g transform="translate(450 110)">
        <circle r="52" fill="#fff" stroke="#12305a" strokeWidth="6" />
        <motion.line y2="-24" stroke="#12305a" strokeWidth="6" strokeLinecap="round" style={PIVOT} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        <motion.line y2="-38" stroke="#e3132c" strokeWidth="4" strokeLinecap="round" style={PIVOT} animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
        <circle r="5" fill="#12305a" />
      </g>

      {/* Empty chair + ghost patient */}
      <g transform="translate(400 380)">
        <rect x="-40" y="-74" width="80" height="14" rx="6" fill="#64748b" />
        <rect x="-40" y="-154" width="14" height="86" rx="6" fill="#64748b" />
        <rect x="-34" y="-60" width="10" height="60" fill="#475569" />
        <rect x="24" y="-60" width="10" height="60" fill="#475569" />
        {!ok && <motion.g animate={{ opacity: [0, 0.7, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <circle cx="6" cy="-196" r="28" fill="none" stroke="#e3132c" strokeWidth="4" strokeDasharray="8 7" />
          <rect x="-30" y="-166" width="72" height="90" rx="26" fill="none" stroke="#e3132c" strokeWidth="4" strokeDasharray="8 7" />
          <text x="6" y="-186" textAnchor="middle" fontSize="34" fontWeight="800" fill="#e3132c">?</text>
        </motion.g>}
      </g>

      {ok && (
        <motion.g initial={{ x: -380 }} animate={{ x: 0 }} transition={{ duration: 2, ease: "easeOut" }}>
          <Man x={470} y={380} s={0.85} shirt="#f59e0b" pants="#334155" hair="#3b2a1a" mood="happy" />
        </motion.g>
      )}
      {ok && <InsightChip x={50} y={322} text="High no-show risk → reminder sent" />}

      {/* Doctor waiting behind the desk */}
      <Man x={680} y={335} s={0.85} coat mood={ok ? "happy" : "worried"} delay={0.3} />
      <rect x="555" y="285" width="220" height="95" rx="8" fill="#a47c55" />
      <rect x="545" y="277" width="240" height="14" rx="6" fill="#8b6440" />
      {!ok && <motion.path d="M735 150 q-7 12 0 18 q7 -6 0 -18z" fill="#38bdf8" style={CENTER} animate={{ y: [0, 16], opacity: [1, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
    </SceneFrame>
  );
}