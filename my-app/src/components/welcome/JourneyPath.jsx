import { JOURNEY_STEPS } from "../../data/welcomeData";

// One shared path so the glow and the dashes always match
const PATH =
  "M14 88 C42 94 78 80 58 68 C38 56 12 62 30 50 C46 40 28 38 50 30 C68 24 56 18 64 11";

/**
 * The glowing path with station nodes.
 * - SVG draws the animated dashed curve (stretched to fill the box).
 * - Nodes are absolutely positioned using the x/y % from the data file.
 */
export default function JourneyPath() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-md">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        {/* Soft glow underneath */}
        <path d={PATH} fill="none" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="6" vectorEffect="non-scaling-stroke" />
        {/* Animated dashed line on top */}
        <path
          d={PATH} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 12"
          strokeLinecap="round" vectorEffect="non-scaling-stroke" className="animate-flow"
        />
      </svg>

      {JOURNEY_STEPS.map(({ id, label, icon: Icon, x, y }, i) => (
        <div
          key={id}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 animate-rise"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 150}ms` }}
        >
          <span className="grid size-14 place-items-center rounded-full bg-white text-navy shadow-xl shadow-sky-200 ring-4 ring-white/60 animate-float">
            <Icon size={24} />
          </span>
          <span className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-navy shadow-sm backdrop-blur">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}