import { motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";

/** Slide-in panel with the full description of one service. */
export default function ServiceDetail({ service, category, picked, onToggle, onClose }) {
  const Icon = service.icon;
  return (
    <>
      <motion.div className="fixed inset-0 z-30 bg-navy/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.aside
        className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col gap-5 overflow-y-auto bg-white p-7 shadow-2xl"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-slate-100 text-navy"><X size={22} /></button>
        <span className="grid size-20 place-items-center rounded-3xl text-white shadow-lg" style={{ background: category.color }}><Icon size={40} /></span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: category.color }}>{category.name}</p>
          <h2 className="mt-1 text-3xl font-extrabold leading-tight text-navy">{service.name}</h2>
        </div>
        <p className="text-lg leading-relaxed text-slate-soft">{service.about}</p>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">What you get</p>
          <ul className="mt-3 space-y-3">
            {service.gets.map((g) => (
              <li key={g} className="flex items-center gap-3 text-lg font-semibold text-navy">
                <span className="grid size-7 place-items-center rounded-full text-white" style={{ background: category.color }}><Check size={16} /></span> {g}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => onToggle(service.id)}
          className="mt-auto flex items-center justify-center gap-3 rounded-full px-6 py-4 text-lg font-bold transition-colors"
          style={picked ? { background: category.color, color: "#fff" } : { border: `2px solid ${category.color}`, color: category.color }}
        >
          {picked ? <><Check size={22} /> Added to my interests</> : <><Plus size={22} /> Add to my interests</>}
        </button>
      </motion.aside>
    </>
  );
}
