import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import InsightChip from "../InsightChip";
import { CENTER, PIVOT } from "../origins";

const ITEMS = ["💊", "🩺", "🛏️", "🧪", "📄"];
const ROWS = [["💊", 90], ["🩺", 60], ["🛏️", 100]]; // solution: cost breakdown inside the (now glass) box

/** Scene 7: services vanish into a black box. Solution: the box turns transparent and shows cost per service. */
export default function CostScene({ mode }) {
  const ok = mode === "solution";
  const tone = ok ? "#22c55e" : "#ef4444";
  return (
    <SceneFrame mode={mode}>
      {/* Items flowing into the box */}
      {ITEMS.map((e, i) => (
        <motion.text key={e} x="60" y={270 + (i % 2) * 40} fontSize="54" style={CENTER}
          animate={{ x: [0, 250], scale: [1, 0.6], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.65, ease: "easeIn", times: [0, 0.1, 0.9, 1] }}>{e}</motion.text>
      ))}

      {/* Beacon (red alarm → calm green) */}
      {!ok && <motion.path d="M400 172 L320 70 L480 70Z" fill="#ef4444" animate={{ opacity: [0.03, 0.3, 0.03] }} transition={{ duration: 1.2, repeat: Infinity }} />}
      <rect x="384" y="176" width="32" height="14" rx="3" fill="#475569" />
      <motion.path d="M386 176 A14 14 0 0 1 414 176Z" fill={tone} animate={{ opacity: ok ? 1 : [1, 0.35, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />

      {/* Box */}
      <rect x="300" y="334" width="200" height="46" rx="6" fill="#cbd5e1" />
      <motion.g animate={ok ? { x: 0 } : { x: [0, -3, 3, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.6 }}>
        {ok ? (
          <>
            <rect x="330" y="190" width="140" height="144" rx="18" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="4" />
            {ROWS.map(([e, w], r) => (
              <g key={e}>
                <text x="344" y={238 + r * 40} fontSize="26">{e}</text>
                <motion.rect x="382" y={222 + r * 40} width={w} height="14" rx="7" fill="#22c55e" style={{ transformBox: "fill-box", originX: 0, originY: 0.5 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1] }} transition={{ duration: 1, delay: 0.4 + r * 0.3, repeat: Infinity, repeatDelay: 2 }} />
              </g>
            ))}
          </>
        ) : (
          <>
            <rect x="330" y="190" width="140" height="144" rx="18" fill="#1f2937" />
            <motion.text x="400" y="298" textAnchor="middle" fontSize="96" fontWeight="900" fill="#fff" animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 1.6, repeat: Infinity }}>?</motion.text>
          </>
        )}
      </motion.g>

      {/* Invoice */}
      <motion.g style={CENTER} animate={ok ? { rotate: 0 } : { rotate: [-4, 4, -4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <g transform="translate(540 190)">
          <rect width="112" height="150" rx="8" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="56" y="32" textAnchor="middle" fontSize="16" fontWeight="800" fill="#64748b">COST</text>
          {ok ? (
            <>
              {[58, 82, 106].map((y) => <rect key={y} x="16" y={y} width="70" height="9" rx="4" fill="#bbf7d0" />)}
              <text x="98" y="118" textAnchor="middle" fontSize="22" fill="#16a34a">✓</text>
            </>
          ) : (
            <>
              <text x="56" y="98" textAnchor="middle" fontSize="40" fontWeight="900" fill="#e3132c">???</text>
              <rect x="16" y="118" width="80" height="8" rx="4" fill="#e2e8f0" />
            </>
          )}
        </g>
      </motion.g>
      {ok && <InsightChip x={273} y={118} text="Cost per service: clear" />}
    </SceneFrame>
  );
}