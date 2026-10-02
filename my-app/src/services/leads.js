// ------------------------------------------------------------------
// Lead storage for the kiosk.
// 1) Every lead is saved on the device first (works offline).
// 2) If VITE_LEADS_ENDPOINT is set, pending leads are POSTed to it and retried later.
// 3) downloadExcel() exports a formatted .xlsx table (downloadCsv() is a plain backup).
// ------------------------------------------------------------------
import { SERVICES } from "../data/servicesData";
import { SOLUTIONS } from "../data/solutionsData";

const KEY = "topmed_leads_v1";
const ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT || "";

export const getLeads = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
};
const setLeads = (list) => localStorage.setItem(KEY, JSON.stringify(list));

/** Sends every not-yet-synced lead to the endpoint. Returns how many were sent. */
export async function syncLeads() {
  if (!ENDPOINT) return 0;
  const pending = getLeads().filter((l) => !l.synced);
  const sent = new Set();
  for (const lead of pending) {
    try {
      // text/plain avoids CORS pre-flight (works with Google Apps Script and most webhooks)
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
      if (res.ok) sent.add(lead.id);
    } catch { /* offline: it will be retried on the next sync */ }
  }
  setLeads(getLeads().map((l) => (sent.has(l.id) ? { ...l, synced: true } : l)));
  return sent.size;
}

export async function saveLead(data) {
  const lead = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), synced: false, ...data };
  setLeads([...getLeads(), lead]); // local copy first, never lose a visitor
  syncLeads();                     // fire-and-forget: the visitor never waits for the network
  return lead;
}

/* ------------------------------ Excel export ------------------------------ */

const COLS = [
  { header: "#", key: "n", width: 6 },
  { header: "Date", key: "date", width: 13 },
  { header: "Time", key: "time", width: 9 },
  { header: "Full Name", key: "name", width: 24 },
  { header: "Email", key: "email", width: 32 },
  { header: "Organization", key: "organization", width: 28 },
  { header: "Job Title", key: "title", width: 22 },
  { header: "Phone / WhatsApp", key: "phone", width: 20 },
  { header: "Organization Type", key: "facilityType", width: 20 },
  { header: "Services of Interest", key: "interests", width: 42 },
  { header: "Problems Explored", key: "explored", width: 38 },
  { header: "Consent to Email", key: "consent", width: 16 },
  { header: "Synced", key: "synced", width: 10 },
];

const NAVY = "FF12305A";
const nameList = (ids, list, field) =>
  (ids || []).map((id) => list.find((x) => x.id === id)?.[field] ?? id).join(", ");
const count = (items) => items.reduce((m, k) => (k ? m.set(k, (m.get(k) || 0) + 1) : m), new Map());

/** Builds the workbook: a formatted "Leads" table + a "Summary" sheet. */
export async function buildWorkbook(leads = getLeads()) {
  const mod = await import("exceljs/dist/exceljs.min.js"); // loaded only when the export is used
  const ExcelJS = mod.default ?? mod;
  const wb = new ExcelJS.Workbook();
  wb.creator = "Topmed Kiosk";
  wb.created = new Date();

  // ---- Leads table ----
  const ws = wb.addWorksheet("Leads", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = COLS;
  leads.forEach((l, i) => {
    const d = new Date(l.createdAt);
    ws.addRow({
      n: i + 1,
      // UTC date built from local parts so Excel shows the same day the visitor registered
      date: new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())),
      time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      name: l.name,
      email: { text: l.email, hyperlink: `mailto:${l.email}` },
      organization: l.organization,
      title: l.title || "",
      phone: l.phone || "",
      facilityType: l.facilityType || "",
      interests: nameList(l.interests, SERVICES, "name"),
      explored: nameList(l.exploredProblems, SOLUTIONS, "title"),
      consent: l.consent ? "Yes" : "No",
      synced: l.synced ? "Yes" : "No",
    });
  });

  const line = { style: "thin", color: { argb: "FFD9E1EA" } };
  ws.eachRow((row, r) => {
    if (r === 1) row.height = 30;
    row.eachCell((cell) => {
      cell.border = { top: line, left: line, bottom: line, right: line };
      cell.alignment = { vertical: "middle", wrapText: true, horizontal: cell.col === 1 ? "center" : "left" };
      if (r === 1) {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
      } else if (r % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F6FA" } }; // zebra rows
      }
    });
    if (r > 1) {
      row.getCell("date").numFmt = "dd/mm/yyyy";
      row.getCell("phone").numFmt = "@"; // keep leading zeros and "+"
      row.getCell("email").font = { color: { argb: "FF0563C1" }, underline: true };
    }
  });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: COLS.length } };

  // ---- Summary sheet ----
  const s = wb.addWorksheet("Summary");
  s.columns = [{ width: 38 }, { width: 14 }];
  const title = (text) => { const r = s.addRow([text]); r.font = { bold: true, size: 13, color: { argb: NAVY } }; };
  s.addRow(["Topmed: expo leads summary"]).font = { bold: true, size: 16, color: { argb: "FFE3132C" } };
  s.addRow([]);
  s.addRow(["Total leads", leads.length]);
  s.addRow(["Agreed to be contacted", leads.filter((l) => l.consent).length]);
  s.addRow(["Exported on", new Date().toLocaleString("en-GB")]);
  const block = (heading, map) => {
    s.addRow([]);
    title(heading);
    [...map.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => s.addRow([k, v]));
  };
  block("Services of interest (most requested first)", count(leads.flatMap((l) => (l.interests || []).map((id) => SERVICES.find((x) => x.id === id)?.name ?? id))));
  block("Problems explored", count(leads.flatMap((l) => (l.exploredProblems || []).map((id) => SOLUTIONS.find((x) => x.id === id)?.title ?? id))));
  block("Organization type", count(leads.map((l) => l.facilityType)));
  return wb;
}

function saveFile(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
const today = () => new Date().toISOString().slice(0, 10);

/** Downloads leads as a formatted Excel file. */
export async function downloadExcel() {
  const wb = await buildWorkbook();
  const buffer = await wb.xlsx.writeBuffer();
  saveFile(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `topmed-leads-${today()}.xlsx`);
}

/* ------------------------------ CSV backup ------------------------------ */

const CSV_COLUMNS = ["createdAt", "name", "email", "organization", "title", "phone", "facilityType", "interests", "exploredProblems", "consent", "synced"];

export function leadsToCsv() {
  const cell = (v) => `"${(Array.isArray(v) ? v.join("; ") : v ?? "").toString().replace(/"/g, '""')}"`;
  const rows = getLeads().map((l) => CSV_COLUMNS.map((c) => cell(l[c])).join(","));
  return [CSV_COLUMNS.join(","), ...rows].join("\n");
}

export function downloadCsv() {
  saveFile(new Blob(["\ufeff" + leadsToCsv()], { type: "text/csv;charset=utf-8" }), `topmed-leads-${today()}.csv`); // BOM keeps Excel happy with Arabic
}