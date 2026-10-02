import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { SOLUTIONS } from "../../data/solutionsData";
import SCENES from "../journey/scenes";
import CostFlask from "../journey/CostFlask";
import Logo from "../../assets/Topmed_logo.svg";
import ProblemTabs from "./ProblemTabs";

/**
 * "Explore the Solutions" page.
 * Pick any problem (circles) → see it BEFORE, then switch to WITH TOPMED:
 * the same scene lights up, the flask drains, and the panel shows service + impact.
 * Layout is compact so the main button is always visible (no page scroll).
 */
export default function ExploreScreen({ onFinish, onExit }) {
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState("problem"); // "problem" | "solution"
  const [visited, setVisited] = useState(() => new Set());

  const item = SOLUTIONS[idx];
  const Scene = SCENES[item.id];
  const solved = mode === "solution";
  const last = idx === SOLUTIONS.length - 1;

  const select = (i) => { setIdx(i); setMode("problem"); };
  const show = (m) => {
    setMode(m);
    if (m === "solution") setVisited((v) => new Set(v).add(idx));
  };
  const primary = () => {
    if (!solved) return show("solution");
    if (!last) return select(idx + 1);
    finish();
  };
  const finish = () => onFinish([...visited].map((i) => SOLUTIONS[i].id)); // ids of problems the visitor explored
  const primaryLabel = !solved ? "See how Topmed solves it" : last ? "Discover Our Services" : "Next problem";

  // Kiosk mode: back to the welcome screen after 90s without touches
  useEffect(() => {
    let t;
    const reset = () => { clearTimeout(t); t = setTimeout(onExit, 90000); };
    reset();
    window.addEventListener("pointerdown", reset);
    return () => { clearTimeout(t); window.removeEventListener("pointerdown", reset); };
  }, [onExit]);

  return (
    <section className="flex h-dvh flex-col overflow-hidden bg-gradient-to-br from-white to-slate-100 font-sans">
      {/* One compact top bar: logo | title | exit */}
      <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3 lg:px-12">
        <img src={Logo} alt="Topmed" className="h-11" />
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-navy lg:text-3xl">From Problems to <span className="text-brand">Solutions</span></h1>
          <p className="hidden text-sm text-slate-soft md:block">Tap a problem to see how Topmed solves it</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onExit} className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-brand hover:text-brand">
            <X size={16} /> Exit
          </button>
        </div>
      </header>

      <div className="shrink-0 px-4 pb-2">
        <ProblemTabs items={SOLUTIONS} active={idx} visited={visited} onSelect={select} />
      </div>

      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col gap-4 px-6 pb-4 lg:flex-row lg:px-12">
        {/* Scene + flask */}
        <div className="flex min-h-0 flex-1 gap-4">
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div key={`${item.id}-${mode}`} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }} className="relative size-full">
                <Scene mode={mode} />
              </motion.div>
            </AnimatePresence>
            <span className={`absolute start-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ${solved ? "bg-sky-500" : "bg-navy"}`}>
              {solved ? "With Topmed" : "Before"}
            </span>
          </div>
          <aside className="w-24 shrink-0 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl sm:w-32">
            <CostFlask level={solved ? 1 : item.severity} total={7} status={solved ? "Optimised" : undefined} />
          </aside>
        </div>

        {/* Info panel: toggle (fixed) + content (scrolls if needed) + button (fixed) */}
        <aside className="flex min-h-0 shrink-0 flex-col rounded-3xl border border-slate-200 bg-white shadow-xl lg:w-[24rem]">
          <div className="shrink-0 p-4 pb-0">
            <div className="flex rounded-full bg-slate-100 p-1">
              {[["problem", "Before"], ["solution", "With Topmed"]].map(([m, label]) => (
                <button key={m} onClick={() => show(m)} className={`relative flex-1 rounded-full py-2.5 text-base font-bold ${mode === m ? "text-white" : "text-navy"}`}>
                  {mode === m && <motion.span layoutId="toggle-pill" className="absolute inset-0 rounded-full bg-brand" />}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div key={`${item.id}-${mode}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <p className={`text-xs font-bold uppercase tracking-widest ${solved ? "text-sky-600" : "text-brand"}`}>
                  {solved ? "How Topmed solves it" : "The problem"}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-navy lg:text-2xl">{item.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-slate-soft lg:text-lg">{solved ? item.after : item.before}</p>

                {solved && (
                  <>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">Topmed service</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.services.map((s) => (
                        <span key={s} className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
                          <Sparkles size={16} /> {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Impact</p>
                      <p className="mt-1 text-lg font-extrabold text-emerald-800 lg:text-xl">{item.impact}</p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="shrink-0 border-t border-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-soft">
              <span>Explored {visited.size} of {SOLUTIONS.length}</span>
              <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-200">
                <motion.div className="h-full bg-brand" animate={{ width: `${(visited.size / SOLUTIONS.length) * 100}%` }} />
              </div>
            </div>
            <button onClick={primary} className="flex w-full items-center justify-center gap-3 rounded-full bg-brand px-6 py-3.5 text-lg font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark active:scale-95">
              {primaryLabel} <ArrowRight size={22} />
            </button>
            {visited.size > 0 && !(last && solved) && (
              <button onClick={finish} className="mt-2 w-full rounded-full border-2 border-brand py-2.5 text-base font-bold text-brand">Discover Our Services</button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}