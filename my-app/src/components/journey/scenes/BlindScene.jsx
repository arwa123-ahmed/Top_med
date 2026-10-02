import { motion } from "framer-motion";
import SceneFrame from "../SceneFrame";
import { PIVOT } from "../origins";
import InsightChip from "../InsightChip";

const PAPERS = [
  { x: 120, y: 250, d: 5 }, { x: 260, y: 200, d: 6.5 }, { x: 430, y: 260, d: 5.5 },
  { x: 560, y: 220, d: 7 }, { x: 690, y: 270, d: 6 },
];

/** Live dashboard content (solution mode) for monitor number i. */
function Live({ i }) {
  return (
    <g>
      {i === 0 && [0, 1, 2, 3, 4].map((r) => (
        <motion.rect key={r} x={22 + r * 32} y={110 - (30 + r * 14)} width="22" height={30 + r * 14} rx="4" fill="#38bdf8" style={PIVOT}
          initial={{ scaleY: 0 }} animate={{ scaleY: [0.3, 1, 0.6, 1] }} transition={{ duration: 3, repeat: Infinity, delay: r * 0.2 }} />
      ))}
      {i === 1 && (
        <>
          <path d="M22 100 V24 M22 100 H180" stroke="#64748b" strokeWidth="2" />
          <motion.path d="M22 92 L56 70 L88 78 L120 46 L150 54 L180 26" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }} />
        </>
      )}
      {i === 2 && [0, 1, 2].map((c) => [0, 1].map((r) => (
        <motion.g key={`${c}${r}`} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: (c + r) * 0.3 }}>
          <rect x={16 + c * 58} y={20 + r * 48} width="52" height="40" rx="6" fill="#166534" />
          <text x={42 + c * 58} y={46 + r * 48} textAnchor="middle" fontSize="20" fontWeight="800" fill="#bbf7d0">✓</text>
        </motion.g>
      )))}
    </g>
  );
}

/** Scene 5: dead dashboards, flying papers and an empty management chair (no character: the visitor is the manager). */
export default function BlindScene({ mode }) {
  const ok = mode === "solution";
  return (
    <SceneFrame mode={mode}>
      {/* Three broken dashboards */}
      {[60, 300, 540].map((x, i) => (
        <g key={x} transform={`translate(${x} 40)`}>
          <rect width="200" height="140" rx="12" fill="#1e293b" />
          <rect x="8" y="8" width="184" height="116" rx="6" fill="#0f172a" />
          <rect x="82" y="140" width="36" height="18" fill="#475569" />
          {ok && <g transform="translate(8 8)"><Live i={i} /></g>}
          {!ok && i === 0 && (
            <>
              {[0, 1, 2, 3, 4].map((r) => (
                <motion.rect key={r} x="14" y={16 + r * 22} width={60 + ((r * 37) % 100)} height="8" rx="3" fill="#475569"
                  animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.6 + r * 0.2, repeat: Infinity }} />
              ))}
              <motion.text x="100" y="78" textAnchor="middle" fontSize="20" fontWeight="800" fill="#ef4444" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>NO SIGNAL</motion.text>
            </>
          )}
          {!ok && i === 1 && (
            <>
              <path d="M22 100 V24 M22 100 H180" stroke="#64748b" strokeWidth="2" />
              <path d="M22 84 L56 60 L88 72 L110 40" stroke="#38bdf8" strokeWidth="3" fill="none" />
              <path d="M110 40 L134 60 L180 30" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="5 6" />
              <motion.text x="150" y="92" fontSize="26" fill="#ef4444" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>✕</motion.text>
            </>
          )}
          {!ok && i === 2 && [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => {
            const bad = (r + c) % 3 === 0;
            return (
              <g key={`${r}${c}`}>
                <rect x={16 + c * 58} y={16 + r * 27} width="52" height="22" rx="4" fill={bad ? "#7f1d1d" : "#1e3a5f"} />
                {bad && <text x={42 + c * 58} y={32 + r * 27} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fca5a5">#N/A</text>}
              </g>
            );
          }))}
        </g>
      ))}

      {/* Desk with an EMPTY chair */}
      <rect x="370" y="238" width="60" height="70" rx="14" fill="#475569" />
      <rect x="250" y="300" width="300" height="80" rx="8" fill="#a47c55" />
      <rect x="240" y="292" width="320" height="14" rx="6" fill="#8b6440" />
      <rect x="350" y="316" width="100" height="24" rx="4" fill="#fff" />
      <text x="400" y="333" textAnchor="middle" fontSize="11" fontWeight="800" fill="#12305a" letterSpacing="1">MANAGEMENT</text>

      {/* Unplugged cable + sparks */}
      <path d="M250 340 C190 340 170 372 120 366" stroke="#334155" strokeWidth="5" fill="none" />
      <rect x="104" y="356" width="18" height="20" rx="3" fill="#334155" />
      {!ok && <motion.text x="86" y="364" fontSize="26" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>⚡</motion.text>}

      {/* Flying papers */}
      {!ok && PAPERS.map((p) => (
        <motion.rect key={p.x} x={p.x} y={p.y} width="34" height="44" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="2"
          style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
          animate={{ y: [0, -40, 10, 0], x: [0, 20, -20, 0], rotate: [0, 40, -30, 0] }} transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {/* Lost magnifier + question marks */}
      {!ok && <motion.text fontSize="46" animate={{ x: [80, 300, 560, 300, 80], y: [215, 235, 215, 240, 215] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>🔍</motion.text>}
      {!ok && [[150, 230], [640, 235], [400, 226]].map(([x, y], i) => (
        <motion.text key={x} x={x} y={y} fontSize="44" fontWeight="900" fill="#e3132c" opacity=".8" animate={{ y: [0, -16, 0] }} transition={{ duration: 2 + i * 0.5, repeat: Infinity }}>?</motion.text>
      ))}
      {ok && <InsightChip x={250} y={198} text="One live view of the hospital" />}
    </SceneFrame>
  );
}