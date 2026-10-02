import { TrendingUp } from "lucide-react";
import { COST_ITEMS } from "../../data/welcomeData";
import useCountUp from "../../hooks/useCountUp";

const fmt = (n) => n.toLocaleString("en-US");

/** Right column: floating "Hidden Operational Cost" card. */
export default function CostCard() {
  // Total is derived from the rows so numbers always agree
  const total = COST_ITEMS.reduce((sum, item) => sum + item.amount, 0);
  const animated = useCountUp(total);

  return (
    <aside className="w-full max-w-sm rotate-2 rounded-3xl border border-white bg-white/80 p-6 shadow-2xl shadow-slate-300/50 backdrop-blur-md animate-rise">
      <p className="text-sm font-medium text-navy">Hidden Operational Cost</p>

      <div className="mt-1 flex items-center gap-2 text-4xl font-extrabold text-brand">
        SAR {fmt(animated)} <TrendingUp size={24} />
      </div>

      {/* Green → yellow → red severity bar */}
      <div className="mt-3 h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-brand" />

      <ul className="mt-5 space-y-3">
        {COST_ITEMS.map(({ id, label, icon: Icon, amount }, i) => (
          <li
            key={id}
            className="flex items-center justify-between text-sm animate-rise"
            style={{ animationDelay: `${300 + i * 120}ms` }}
          >
            <span className="flex items-center gap-3 text-navy">
              <Icon size={18} className="text-slate-soft" /> {label}
            </span>
            <span className="font-semibold text-brand">+ SAR {fmt(amount)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}