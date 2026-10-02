import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { saveLead } from "../../services/leads";
import { SERVICES } from "../../data/servicesData";

const FACILITIES = ["Large Hospital", "Medical Center", "Hospital Network", "Other"];

/** Big touch-friendly input with an inline error message. */
function Field({ label, error, required, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-navy">{label}{required && <span className="text-brand"> *</span>}</span>
      <input {...props} autoComplete="off" className={`mt-1 h-14 w-full rounded-2xl border-2 bg-white px-4 text-lg text-navy outline-none focus:border-brand ${error ? "border-brand" : "border-slate-200"}`} />
      {error && <span className="text-sm font-semibold text-brand">{error}</span>}
    </label>
  );
}

/**
 * "Send me the details" form. Saves the lead (name, email, org, interests, explored problems)
 * and shows a thank-you screen, then returns to the start after a few seconds.
 */
export default function LeadForm({ interests, explored, onClose, onDone }) {
  const [f, setF] = useState({ name: "", email: "", organization: "", title: "", phone: "", facilityType: "", consent: false });
  const [err, setErr] = useState({});
  const [state, setState] = useState("form"); // form | saving | done
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => {
    if (state !== "done") return;
    const t = setTimeout(onDone, 7000);
    return () => clearTimeout(t);
  }, [state, onDone]);

  const submit = async () => {
    const e = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Please enter a valid email";
    if (!f.organization.trim()) e.organization = "Please enter your organization";
    if (!f.consent) e.consent = "Please confirm to continue";
    setErr(e);
    if (Object.keys(e).length) return;
    setState("saving");
    await saveLead({ ...f, name: f.name.trim(), email: f.email.trim(), interests, exploredProblems: explored });
    setState("done");
  };

  const names = interests.map((id) => SERVICES.find((s) => s.id === id)?.name).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-navy/50 p-4">
      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl lg:p-8">
        {state === "done" ? (
          <div className="py-10 text-center">
            <CheckCircle2 size={72} className="mx-auto text-emerald-500" />
            <h2 className="mt-4 text-3xl font-extrabold text-navy">Thank you, {f.name.split(" ")[0]}!</h2>
            <p className="mt-2 text-lg text-slate-soft">We will send the details to {f.email} soon.</p>
            <button onClick={onDone} className="mt-8 rounded-full bg-brand px-10 py-4 text-lg font-bold text-white">Done</button>
          </div>
        ) : (
          <>
            <button onClick={onClose} aria-label="Close" className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-slate-100 text-navy"><X size={22} /></button>
            <h2 className="text-2xl font-extrabold text-navy lg:text-3xl">Where should we send the details?</h2>
            <p className="mt-1 text-base text-slate-soft">We will email you our services overview{names.length ? " and the services you picked" : ""}.</p>
            {names.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">{names.map((n) => <span key={n} className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">{n}</span>)}</div>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={f.name} onChange={set("name")} error={err.name} />
              <Field label="Work email" required type="email" inputMode="email" value={f.email} onChange={set("email")} error={err.email} />
              <Field label="Organization" required value={f.organization} onChange={set("organization")} error={err.organization} />
              <Field label="Job title" value={f.title} onChange={set("title")} />
              <Field label="Phone / WhatsApp (optional)" type="tel" inputMode="tel" value={f.phone} onChange={set("phone")} />
              <div>
                <span className="text-sm font-bold text-navy">Type of organization</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {FACILITIES.map((o) => (
                    <button key={o} type="button" onClick={() => setF((p) => ({ ...p, facilityType: p.facilityType === o ? "" : o }))}
                      className={`rounded-full border-2 px-4 py-2.5 text-sm font-bold ${f.facilityType === o ? "border-brand bg-brand text-white" : "border-slate-200 text-navy"}`}>{o}</button>
                  ))}
                </div>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={f.consent} onChange={(e) => setF((p) => ({ ...p, consent: e.target.checked }))} className="mt-1 size-6 accent-[#e3132c]" />
              <span className="text-sm leading-snug text-slate-soft">
                I agree that Topmed may contact me by email about its services, using my details and the topics I explored on this screen. I can opt out at any time.
                {err.consent && <span className="block font-semibold text-brand">{err.consent}</span>}
              </span>
            </label>

            <button onClick={submit} disabled={state === "saving"} className="mt-6 w-full rounded-full bg-brand py-4 text-xl font-bold text-white shadow-lg shadow-brand/30 active:scale-95 disabled:opacity-60">
              {state === "saving" ? "Saving…" : "Send Me the Details"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
