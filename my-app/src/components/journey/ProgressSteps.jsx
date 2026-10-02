import { motion } from "framer-motion";

/** Numbered circles connected by lines. Done + current = red, upcoming = grey. */
export default function ProgressSteps({ total, current }) {
  return (
    <ol className="flex items-center justify-center">
      {Array.from({ length: total }, (_, i) => (
        <li key={i} className="flex items-center">
          <motion.div
            className="relative grid size-11 place-items-center rounded-full border-2 text-lg font-bold"
            animate={{
              backgroundColor: i <= current ? "#e3132c" : "#ffffff",
              borderColor: i <= current ? "#e3132c" : "#cbd5e1",
              color: i <= current ? "#ffffff" : "#94a3b8",
              scale: i === current ? 1.18 : 1,
            }}
          >
            {i === current && <span className="absolute inset-0 animate-ping rounded-full bg-brand/30" />}
            <span className="relative">{i + 1}</span>
          </motion.div>
          {i < total - 1 && (
            <div className="mx-1 h-1 w-7 overflow-hidden rounded bg-slate-200 sm:w-14">
              <motion.div className="h-full bg-brand" animate={{ width: i < current ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
