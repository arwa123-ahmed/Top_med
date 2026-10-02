


import { ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import HeroText from "./HeroText";
import JourneyPath from "./JourneyPath";
import CostCard from "./CostCard";
 
/**
 * Welcome / Home screen.
 * Layout: full-bleed hospital photo + white fade on the left for readability,
 * then a 12-col grid: text (5) | journey path (4) | cost card (3).
 *
 * Props (all optional, wire them to your router / state later):
 *  - onExplore:    "Explore Our Services" click
 *  - onGetInTouch: navbar CTA click
 */
export default function WelcomeScreen({ onStart, onExploreServices, onGetInTouch }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Background photo: put your image at /public/images/hospital-hero.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('src/assets/welcomeScreeen2.png')" }}
      />
      {/* White gradient so the left text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
 
      <Navbar onGetInTouch={onGetInTouch} />
 
      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-10 px-6 pb-24 pt-10 lg:grid-cols-12 lg:px-20 lg:pt-16">
        <div className="lg:col-span-5">
          <HeroText onStart={onStart} onExploreServices={onExploreServices} />
        </div>
 
        {/* The path needs width, so it is hidden on small screens */}
        <div className="hidden lg:col-span-4 lg:block">
          <JourneyPath />
        </div>
{/*  
        <div className="flex justify-center lg:col-span-3 lg:justify-end">
          <CostCard />
        </div> */}
      </div>
 
      {/* Scroll hint */}
      {/* <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center text-xs text-slate-soft">
        Scroll to explore
        <ChevronDown size={18} className="mt-1 animate-bounce" />
      </div> */}
    </section>
  );
}
 
