import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Numbered circles with the problem name underneath.
 * Active = red + pulse, explored = light red with a check, others = grey.
 * Free navigation: any circle can be tapped at any time.
 */
export default function ProblemTabs({ items, active, visited, onSelect }) {
  return (
    <ol className="flex items-start justify-center">
      {items.map((p, i) => {
        const on = i === active;
        const done = visited.has(i);
        return (
          <li key={p.id} className="flex items-start">
            <button onClick={() => onSelect(i)} className="flex w-16 flex-col items-center gap-2 sm:w-24">
              <motion.span
                className="relative grid size-12 place-items-center rounded-full border-2 text-lg font-bold"
                animate={{
                  backgroundColor: on ? "#e3132c" : done ? "#fee2e2" : "#ffffff",
                  borderColor: on || done ? "#e3132c" : "#cbd5e1",
                  color: on ? "#ffffff" : done ? "#e3132c" : "#94a3b8",
                  scale: on ? 1.15 : 1,
                }}
              >
                {on && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />}
                <span className="relative">{done && !on ? <Check size={22} /> : i + 1}</span>
              </motion.span>
              <span className={`text-center text-xs font-bold leading-tight sm:text-sm ${on ? "text-brand" : "text-navy"}`}>{p.label}</span>
            </button>
            {i < items.length - 1 && <span className="mt-6 h-1 w-3 rounded bg-slate-200 sm:w-8" />}
          </li>
        );
      })}
    </ol>
  );
}
