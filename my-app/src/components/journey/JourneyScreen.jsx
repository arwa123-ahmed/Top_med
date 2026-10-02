import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { JOURNEY_STEPS } from "../../data/journeyData";
import SCENES from "./scenes";
import CostFlask from "./CostFlask";
import ProgressSteps from "./ProgressSteps";

const slide = {
  enter: (d) => ({ x: d * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d * -80, opacity: 0 }),
};

/**
 * The patient-journey page: animated scene + cost flask + caption + progress.
 * Props: onFinish (after last step), onExit (back to welcome).
 */
export default function JourneyScreen({ onFinish, onExit }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const current = JOURNEY_STEPS[step];
  const Scene = SCENES[current.id];
  const isLast = step === JOURNEY_STEPS.length - 1;

  const move = (d) => {
    if (d > 0 && isLast) return onFinish();
    setDir(d);
    setStep((p) => p + d);
  };

  // Kiosk mode: return to the welcome screen after 60s without touches
  useEffect(() => {
    let t;
    const reset = () => { clearTimeout(t); t = setTimeout(onExit, 60000); };
    reset();
    window.addEventListener("pointerdown", reset);
    return () => { clearTimeout(t); window.removeEventListener("pointerdown", reset); };
  }, [onExit]);

  return (
    <section className="flex h-dvh flex-col overflow-hidden bg-gradient-to-br from-white to-slate-100 font-sans">
      <header className="flex shrink-0 items-center justify-between px-6 py-3 lg:px-12">
        <img src="src\assets\Topmed_logo.svg" alt="Topmed" className="h-11" />
        <button onClick={onExit} className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-brand hover:text-brand">
          <X size={16} /> Exit
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-[1500px] min-h-0 flex-1 flex-col gap-4 px-6 lg:px-12">
        {/* Scene + flask */}
        <div className="flex min-h-0 flex-1 gap-5">
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={current.id} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35 }} className="relative size-full">
                <Scene />
                <span className="absolute start-4 top-4 rounded-full bg-navy px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  {current.station}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <aside className="w-32 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:w-40">
            <CostFlask level={step + 1} total={JOURNEY_STEPS.length} />
          </aside>
        </div>

        {/* Caption + navigation */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
          <motion.div key={current.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-navy lg:text-4xl">{current.title}</h2>
            <p className="mt-2 text-lg text-slate-soft lg:text-xl">{current.text}</p>
          </motion.div>
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button onClick={() => move(-1)} aria-label="Back" className="grid size-16 place-items-center rounded-full border-2 border-slate-300 bg-white text-navy active:scale-95">
                <ArrowLeft size={24} />
              </button>
            )}
            <button onClick={() => move(1)} className="flex items-center gap-3 rounded-full bg-brand px-10 py-5 text-xl font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark active:scale-95">
              {isLast ? "Explore the Solutions" : "Next"} <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <footer className="shrink-0 px-6 py-4"><ProgressSteps total={JOURNEY_STEPS.length} current={step} /></footer>
    </section>
  );
}