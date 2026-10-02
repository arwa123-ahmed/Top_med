import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import Man from "../Man";
import { CENTER } from "../origins";
import InsightChip from "../InsightChip";

/**
 * A hospital bed with a patient (head on pillow, blanket up to the chest).
 * wheels = true turns it into a stretcher; worried = true gives a worried face.
 */
function Bed({ x, blanket, hair = "#2b2118", wheels = false, worried = false }) {
  return (
    <g transform={`translate(${x} 380)`}>
      {/* Legs: fixed posts for a bed, wheels for a stretcher */}
      {wheels ? (
        <>
          <rect x="34" y="-34" width="8" height="22" fill="#64748b" /><rect x="158" y="-34" width="8" height="22" fill="#64748b" />
          <circle cx="38" cy="-9" r="12" fill="#334155" /><circle cx="162" cy="-9" r="12" fill="#334155" />
        </>
      ) : (
        <>
          <rect x="6" y="-30" width="9" height="30" rx="3" fill="#64748b" />
          <rect x="185" y="-30" width="9" height="30" rx="3" fill="#64748b" />
        </>
      )}
      <rect x="0" y="-40" width="200" height="14" rx="6" fill="#94a3b8" />
      <rect x="6" y="-62" width="188" height="24" rx="10" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="78" y="-72" width="112" height="38" rx="14" fill={blanket} />
      <path d="M100 -70 V-38" stroke="#fff" strokeOpacity=".35" strokeWidth="3" />
      <rect x="10" y="-78" width="58" height="22" rx="10" fill="#e2e8f0" />
      {/* Patient head */}
      <circle cx="40" cy="-86" r="22" fill="#e3ac84" />
      <path d="M18 -92 Q22 -114 42 -110 Q62 -108 62 -90 Q44 -102 18 -92Z" fill={hair} />
      <circle cx="33" cy="-84" r="3" fill="#1f2937" /><circle cx="49" cy="-84" r="3" fill="#1f2937" />
      {worried ? (
        <>
          <path d="M27 -92 L37 -88 M55 -92 L45 -88" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 -70 Q41 -77 48 -70" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <path d="M34 -74 H46" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      )}
    </g>
  );
}

/** Scene 4: all beds taken, a ready patient waits to leave, a new one arrives on a stretcher. */
export default function BedsScene({ mode }) {
  const ok = mode === "solution";
  return (
    <SceneFrame mode={mode}>
      {/* Occupancy lights */}
      <text x="40" y="44" fontSize="12" fontWeight="700" fill="#64748b" letterSpacing="2">BED OCCUPANCY</text>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.rect key={i} x={40 + i * 38} y="54" width="30" height="18" rx="5" fill={ok ? (i < 6 ? "#22c55e" : "#f59e0b") : "#ef4444"}
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }} />
      ))}

      <Bed x={20} blanket="#60a5fa" />
      <Bed x={245} blanket="#34d399" hair="#111827" />

      {/* Patient ready to leave, waiting for paperwork */}
      <Man x={510} y={380} s={0.85} shirt="#e2e8f0" pants="#334155" hair="#6b7280" mood={ok ? "happy" : "sad"}>
        <rect x="-62" y="-70" width="42" height="34" rx="7" fill="#92400e" />
      </Man>
      <motion.text x="510" y="128" textAnchor="middle" fontSize="40" style={CENTER} animate={ok ? { scale: [1, 1.25, 1] } : { rotate: [0, 180, 180, 360] }} transition={{ duration: 3, repeat: Infinity }}>{ok ? "✅" : "⏳"}</motion.text>

      {/* New patient on a stretcher: sign hangs from a pole at the head end, clear of the patient */}
      <motion.g animate={ok ? { x: 0 } : { x: [220, 0] }} transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity, repeatDelay: 2.5 }}>
        <Bed x={590} blanket="#f97316" hair="#3b2a1a" wheels={!ok} worried={!ok} />
        <g transform="translate(590 380)">
          <line x1="2" y1="-40" x2="2" y2="-170" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          <rect x="-16" y="-206" width="124" height="38" rx="9" fill={ok ? "#22c55e" : "#ef4444"} />
          <text x="46" y="-180" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">{ok ? "BED READY" : "NO BED"}</text>
        </g>
      </motion.g>
      {ok && <InsightChip x={40} y={88} text="Discharge planned → bed ready" />}
    </SceneFrame>
  );
}