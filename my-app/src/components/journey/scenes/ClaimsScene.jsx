import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import Man from "../Man";
import { CENTER } from "../origins";
import InsightChip from "../InsightChip";

const CYCLE = { duration: 3.4, repeat: Infinity, repeatDelay: 1.2 };

/** Scene 6: a REJECTED stamp slams onto an insurance claim while the clerk panics. */
export default function ClaimsScene({ mode }) {
  const ok = mode === "solution";
  return (
    <SceneFrame mode={mode}>
      <Man x={170} y={392} s={0.9} shirt="#94a3b8" pants="#334155" hair="#1f1a17" mood={ok ? "happy" : "angry"} arms="up" />

      {/* Claim form (shakes on impact) */}
      <motion.g animate={{ x: ok ? 0 : [0, 0, -8, 8, -5, 0, 0] }} transition={{ ...CYCLE, times: [0, 0.2, 0.26, 0.32, 0.4, 0.5, 1] }}>
        <g transform="translate(330 46)">
          <rect width="260" height="320" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
          <rect width="260" height="44" rx="14" fill="#12305a" />
          <text x="130" y="29" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">INSURANCE CLAIM</text>
          {[70, 96, 122].map((y) => <rect key={y} x="20" y={y} width={y === 96 ? 150 : 210} height="10" rx="5" fill="#e2e8f0" />)}
          <text x="20" y="178" fontSize="13" fontWeight="700" fill="#64748b">DIAGNOSIS CODE</text>
          {ok ? (
            <>
              <rect x="20" y="188" width="150" height="28" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
              <text x="30" y="207" fontSize="14" fontWeight="800" fill="#166534">CODE ✓ VERIFIED</text>
            </>
          ) : (
            <rect x="20" y="188" width="150" height="28" rx="6" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
          )}
          {[236, 262, 288].map((y) => <rect key={y} x="20" y={y} width="180" height="10" rx="5" fill="#e2e8f0" />)}
        </g>
      </motion.g>

      {/* Stamp */}
      <g transform="translate(460 240)">
        <motion.g style={CENTER} initial={{ opacity: 0 }}
          animate={{ scale: [3, 1, 1, 1, 1], opacity: [0, 1, 1, 1, 0], rotate: [-14, -14, -14, -14, -14] }}
          transition={{ ...CYCLE, times: [0, 0.2, 0.5, 0.9, 1] }}>
          <rect x="-118" y="-36" width="236" height="72" rx="8" fill="rgba(255,255,255,.75)" stroke={ok ? "#16a34a" : "#dc2626"} strokeWidth="6" />
          <text y="15" textAnchor="middle" fontSize="42" fontWeight="900" fill={ok ? "#16a34a" : "#dc2626"}>{ok ? "APPROVED" : "REJECTED"}</text>
        </motion.g>
      </g>

      {/* Sticky note appears after the stamp */}
      <g transform="translate(620 130)">
        <motion.g style={CENTER} animate={{ opacity: [0, 0, 1, 1, 0], rotate: [6, 6, 6, 6, 6] }} transition={{ ...CYCLE, times: [0, 0.25, 0.32, 0.9, 1] }}>
          <rect width="140" height="90" rx="6" fill={ok ? "#86efac" : "#fde047"} />
          <text x="70" y="38" textAnchor="middle" fontSize="20" fontWeight="800" fill={ok ? "#14532d" : "#713f12"}>{ok ? "Code" : "Missing"}</text>
          <text x="70" y="66" textAnchor="middle" fontSize="20" fontWeight="800" fill={ok ? "#14532d" : "#713f12"}>{ok ? "verified" : "code"}</text>
        </motion.g>
      </g>
      {ok && <InsightChip x={250} y={408} text="Missing code caught before submission" />}
    </SceneFrame>
  );
}