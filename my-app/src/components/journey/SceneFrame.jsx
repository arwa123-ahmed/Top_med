/**
 * Shared room background for every scene (800 x 460 canvas, floor at y = 380).
 * The wall / floor rectangles are much larger than the canvas, so the scene
 * always fills the whole card whatever its aspect ratio (no visible seams).
 * mode="solution" adds a soft blue glow around the scene (used later for solutions).
 */
import { motion } from "framer-motion";

export default function SceneFrame({ children, mode = "problem" }) {
  const glow = mode === "solution" ? "ring-4 ring-sky-400/70 shadow-[0_0_60px_rgba(56,189,248,.55)]" : "";
  return (
    <div className={`size-full bg-[#eaf2fb] ${glow}`}>
      <svg viewBox="0 0 800 460" className="size-full" preserveAspectRatio="xMidYMax meet">
        <rect x="-3000" y="-3000" width="6800" height="3380" fill="#eaf2fb" />
        <rect x="-3000" y="352" width="6800" height="28" fill="#dbe6f2" />
        <rect x="-3000" y="380" width="6800" height="600" fill="#c9d6e6" />
        <rect x="200" y="0" width="400" height="10" rx="5" fill="#fff" opacity=".8" />
        {/* Solution mode: data lines flowing across the room */}
        {mode === "solution" && (
          <g opacity=".5" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 10">
            <motion.path d="M-200 300 C200 230 420 350 1000 250" animate={{ strokeDashoffset: [0, -64] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
            <motion.path d="M-200 340 C260 300 480 400 1000 320" animate={{ strokeDashoffset: [0, -64] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          </g>
        )}
        {children}
      </svg>
    </div>
  );
}