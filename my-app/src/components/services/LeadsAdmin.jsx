import { useState } from "react";
import { downloadCsv, downloadExcel, getLeads, syncLeads } from "../../services/leads";

/** Hidden staff panel (tap the logo 5 times): lead count, Excel export, manual sync. */
export default function LeadsAdmin({ onClose }) {
  const [leads, setLeads] = useState(getLeads());
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const pending = leads.filter((l) => !l.synced).length;

  const sync = async () => {
    const n = await syncLeads();
    setLeads(getLeads());
    setMsg(n ? `${n} lead(s) sent` : "Nothing sent (offline or no endpoint set)");
  };

  const exportExcel = async () => {
    setBusy(true);
    setMsg("");
    try {
      await downloadExcel();
      setMsg("Excel file downloaded");
    } catch (e) {
      console.error(e);
      setMsg("Excel export failed, use the CSV backup below");
    }
    setBusy(false);
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-navy/60 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl">
        <h2 className="text-xl font-extrabold text-navy">Leads (staff only)</h2>
        <p className="mt-3 text-4xl font-extrabold text-brand">{leads.length}</p>
        <p className="text-sm text-slate-soft">{pending} not synced</p>
        {msg && <p className="mt-2 text-sm font-semibold text-navy">{msg}</p>}
        <div className="mt-5 flex flex-col gap-2">
          <button onClick={exportExcel} disabled={!leads.length || busy} className="rounded-full bg-brand py-3 font-bold text-white disabled:opacity-50">
            {busy ? "Preparing…" : "Download Excel (.xlsx)"}
          </button>
          <button onClick={sync} className="rounded-full border-2 border-navy py-3 font-bold text-navy">Sync now</button>
          <button onClick={downloadCsv} disabled={!leads.length} className="py-1 text-sm font-semibold text-slate-soft underline disabled:opacity-50">CSV backup</button>
          <button onClick={onClose} className="py-2 font-semibold text-slate-soft">Close</button>
        </div>
      </div>
    </div>
  );
}