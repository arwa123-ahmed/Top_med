import { motion } from "framer-motion";

/** Small blue "insight" pill shown inside solution scenes (the data doing its job). */
export default function InsightChip({ x, y, text, delay = 1 }) {
  const w = text.length * 8.6 + 48;
  return (
    <motion.g initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: "spring", stiffness: 180, damping: 16 }}>
      <g transform={`translate(${x} ${y})`}>
        <rect width={w} height="36" rx="18" fill="#0ea5e9" />
        <circle cx="20" cy="18" r="6" fill="#fff" />
        <motion.circle cx="20" cy="18" fill="none" stroke="#fff" strokeWidth="2"
          initial={{ r: 6, opacity: 0.8 }} animate={{ r: [6, 15], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
        <text x="36" y="24" fontSize="15" fontWeight="700" fill="#fff">{text}</text>
      </g>
    </motion.g>
  );
}
