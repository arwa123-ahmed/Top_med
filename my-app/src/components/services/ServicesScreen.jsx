import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { CATEGORIES, SERVICES } from "../../data/servicesData";
import Logo from "../../assets/Topmed_logo.svg";
import ServiceCard from "./ServiceCard";
import ServiceDetail from "./ServiceDetail";
import LeadForm from "./LeadForm";
import LeadsAdmin from "./LeadsAdmin";

/**
 * "Our Services" page: all Topmed services in colour-coded cards, filterable by category.
 * Visitors tap "+" on what interests them, then "Send Me the Details" collects their contact data.
 * Props: explored (problem ids from the previous stage, saved silently with the lead), onExit.
 */
export default function ServicesScreen({ explored = [], onExit }) {
  const [filter, setFilter] = useState("all");
  const [picked, setPicked] = useState([]);
  const [open, setOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [admin, setAdmin] = useState(false);
  const taps = useRef({ n: 0, t: 0 });

  const catOf = (id) => CATEGORIES.find((c) => c.id === id);
  const list = SERVICES.filter((s) => filter === "all" || s.cat === filter);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  // 5 quick taps on the logo open the staff panel
  const logoTap = () => {
    const now = Date.now();
    taps.current = { n: now - taps.current.t < 1500 ? taps.current.n + 1 : 1, t: now };
    if (taps.current.n >= 5) { taps.current.n = 0; setAdmin(true); }
  };

  // Kiosk mode: back to the start after 2 min without touches
  useEffect(() => {
    let t;
    const reset = () => { clearTimeout(t); t = setTimeout(onExit, 120000); };
    reset();
    window.addEventListener("pointerdown", reset);
    return () => { clearTimeout(t); window.removeEventListener("pointerdown", reset); };
  }, [onExit]);

  return (
    <section className="flex h-dvh flex-col overflow-hidden bg-gradient-to-br from-white to-slate-100 font-sans">
      <header className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-3 lg:px-12">
        <button onClick={logoTap} className="w-fit" aria-label="Topmed">
  <img src={Logo} alt="Topmed" className="h-11" />
</button>
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-navy lg:text-3xl">Our <span className="text-brand">Services</span></h1>
          <p className="hidden text-sm text-slate-soft md:block">More than analytics. A complete ecosystem of healthcare solutions.</p>
        </div>
        <div className="flex justify-end">
          <button onClick={onExit} className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:border-brand hover:text-brand"><X size={16} /> Exit</button>
        </div>
      </header>

      {/* Category filter */}
      <div className="flex shrink-0 flex-wrap justify-center gap-2 px-6 pb-3">
        {[{ id: "all", name: "All Services", color: "#e3132c" }, ...CATEGORIES].map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id)} className="rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors"
            style={filter === c.id ? { background: c.color, borderColor: c.color, color: "#fff" } : { borderColor: "#cbd5e1", color: "#12305a", background: "#fff" }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mx-auto min-h-0 w-full max-w-[1500px] flex-1 overflow-y-auto px-6 pb-3 lg:px-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => (
              <ServiceCard key={s.id} service={s} category={catOf(s.cat)} picked={picked.includes(s.id)} index={i} onOpen={setOpen} onToggle={toggle} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-3 lg:px-12">
        <p className="text-sm font-semibold text-slate-soft">
          {picked.length ? `${picked.length} service${picked.length > 1 ? "s" : ""} in your interests` : "Tap + on the services that interest you"}
        </p>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-3 rounded-full bg-brand px-8 py-3.5 text-lg font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark active:scale-95">
          Send Me the Details <ArrowRight size={22} />
        </button>
      </footer>

      <AnimatePresence>
        {open && <ServiceDetail key={open.id} service={open} category={catOf(open.cat)} picked={picked.includes(open.id)} onToggle={toggle} onClose={() => setOpen(null)} />}
      </AnimatePresence>
      {showForm && <LeadForm interests={picked} explored={explored} onClose={() => setShowForm(false)} onDone={onExit} />}
      {admin && <LeadsAdmin onClose={() => setAdmin(false)} />}
    </section>
  );
}
