import { ArrowRight } from "lucide-react";
import { QUICK_SERVICES } from "../../data/welcomeData";

/** Left column: tagline, headline, description, CTA and quick services. */
export default function HeroText({ onStart, onExploreServices }) {
    return (
        <div className="animate-rise">
            {/* Eyebrow tagline */}
            <p className="mb-6 max-w-md text-xs font-semibold uppercase leading-relaxed tracking-[0.25em] text-slate-soft">
                See the Journey. Discover the Data. Transform the Outcome.
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-navy sm:text-5xl xl:text-6xl">
                From Patient Journey <br />
                to <span className="text-brand">Healthcare Intelligence</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-soft">
                We turn healthcare data into actionable insights — helping hospitals
                operate smarter, improve outcomes and create sustainable value.
            </p>


            <button
                onClick={() => { console.log("clicked", onStart); onStart?.(); }}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark active:scale-95"
            >
                Let's Start Our Journey <ArrowRight size={20} />
            </button>

            {/* Quick service shortcuts */}
            <ul className="mt-14 flex flex-wrap items-center gap-6">
                {QUICK_SERVICES.map(({ label, icon: Icon }) => (
                    <li key={label} className="flex w-24 flex-col items-center gap-2 text-center">
                        <span className="grid size-12 place-items-center rounded-full bg-white text-navy shadow-sm">
                            <Icon size={22} />
                        </span>
                        <span className="text-xs font-medium leading-tight text-navy">{label}</span>
                    </li>
                ))}
                <li className="border-s border-slate-300 ps-6">
                    <button onClick={onExploreServices} className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-brand">
                        And more… <ArrowRight size={16} className="text-brand" />
                    </button>
                </li>
            </ul>
        </div>
    );
}