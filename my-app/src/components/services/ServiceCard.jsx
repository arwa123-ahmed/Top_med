import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

/** One service tile. Tap the card for details, tap +/✓ to add it to "my interests". */
export default function ServiceCard({ service, category, picked, index, onOpen, onToggle }) {
  const Icon = service.icon;
  return (
    <motion.div
      layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }} whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(service)}
      className="relative flex cursor-pointer flex-col rounded-3xl border-2 bg-white p-5 shadow-lg transition-colors"
      style={{ borderColor: picked ? category.color : "#e2e8f0" }}
    >
      <span className="grid size-14 place-items-center rounded-2xl text-white shadow-md" style={{ background: category.color }}>
        <Icon size={28} />
      </span>
      <h3 className="mt-4 text-lg font-extrabold leading-tight text-navy">{service.name}</h3>
      <p className="mt-2 text-sm leading-snug text-slate-soft">{service.tagline}</p>
      <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-widest" style={{ color: category.color }}>Learn more →</span>

      <button
        aria-label={picked ? "Remove from my interests" : "Add to my interests"}
        onClick={(e) => { e.stopPropagation(); onToggle(service.id); }}
        className="absolute end-3 top-3 grid size-11 place-items-center rounded-full border-2 transition-colors"
        style={picked ? { background: category.color, borderColor: category.color, color: "#fff" } : { borderColor: "#cbd5e1", color: "#94a3b8" }}
      >
        {picked ? <Check size={22} /> : <Plus size={22} />}
      </button>
    </motion.div>
  );
}
