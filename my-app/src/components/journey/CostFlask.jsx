import { motion } from "framer-motion";

// One colour per journey step: green → red
export const FLASK_COLORS = ["#22c55e", "#84cc16", "#eab308", "#f59e0b", "#f97316", "#ef4444", "#b91c1c"];
const BODY = "M22 24 H98 V250 Q98 284 66 284 H54 Q22 284 22 250 Z";
const STATUS = ["Rising", "Rising", "High", "High", "Severe", "Severe", "Critical"];

/** Glass flask that fills up and changes colour as hidden cost accumulates (no numbers). */
export default function CostFlask({ level, total = 7, status }) {
  const ratio = level / total;
  const top = 284 - ratio * 250; // y of the liquid surface
  const color = FLASK_COLORS[level - 1] ?? FLASK_COLORS[0];
  const danger = level >= 6;

  return (
    <div className="flex h-full flex-col items-center gap-2">
      <motion.div
        className="min-h-0 flex-1"
        animate={danger ? { x: [0, -3, 3, -3, 0] } : { x: 0 }}
        transition={danger ? { duration: 0.5, repeat: Infinity, repeatDelay: 1.2 } : {}}
      >
        <motion.svg
          viewBox="0 0 120 300" className="h-full w-auto"
          animate={{ filter: `drop-shadow(0 0 ${6 + ratio * 22}px ${color}88)` }}
        >
          <defs><clipPath id="flask-clip"><path d={BODY} /></clipPath></defs>
          <path d={BODY} fill="#f1f5f9" />
          <g clipPath="url(#flask-clip)">
            <motion.g initial={{ y: 300 }} animate={{ y: top }} transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}>
              {/* Two wave layers, sliding sideways forever */}
              <motion.path
                d="M-120 0 q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 V400 H-120Z"
                initial={{ fill: color }} animate={{ fill: color, x: [0, 120] }}
                transition={{ fill: { duration: 1 }, x: { duration: 3, repeat: Infinity, ease: "linear" } }}
              />
              <motion.path
                d="M-120 4 q30 10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 V400 H-120Z" opacity=".45" fill="#fff"
                animate={{ x: [0, -120] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* Bubbles */}
              {[36, 56, 74, 88].map((cx, i) => (
                <motion.circle key={cx} cx={cx} r={3 + (i % 2) * 2} fill="#fff"
                  initial={{ cy: ratio * 240 - 6, opacity: 0 }}
                  animate={{ cy: [ratio * 240 - 6, 8], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }} />
              ))}
            </motion.g>
          </g>
          {/* Glass outline + highlight */}
          <path d={BODY} fill="none" stroke="#94a3b8" strokeWidth="4" />
          <rect x="16" y="14" width="88" height="12" rx="6" fill="#cbd5e1" />
          <rect x="32" y="44" width="6" height="170" rx="3" fill="#fff" opacity=".45" />
        </motion.svg>
      </motion.div>

      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Hidden Cost</p>
        <motion.p key={status ?? STATUS[level - 1]} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-extrabold" style={{ color }}>
          {status ?? STATUS[level - 1]}
        </motion.p>
      </div>
    </div>
  );
}