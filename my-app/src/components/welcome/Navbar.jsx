import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "../../data/welcomeData";

/** Top navigation: logo, links, language switch, search and CTA. */
export default function Navbar({ onGetInTouch }) {
  const [active, setActive] = useState("Home");
  const [lang, setLang] = useState("EN");

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-20">
      {/* Logo: replace with your real asset in /public/images */}
      <img src="src\assets\Topmed_logo.svg" className="h-12 lg:h-14" />

      <button
          onClick={() => window.location.href = "https://topmed.org/"}
          className="flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark"
        >
          Get in Touch <ArrowRight size={18} />
        </button>

    
    </header>
  );
}