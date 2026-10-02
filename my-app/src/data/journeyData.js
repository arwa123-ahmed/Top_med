// Content for the 7 journey screens (English only for now).
// `id` maps to a scene component in components/journey/scenes/index.js
export const JOURNEY_STEPS = [
  { id: "noshow",  station: "Appointment", title: "Missed Appointment",           text: "A patient never shows up, and a valuable clinic slot goes to waste." },
  { id: "triage",  station: "Triage",      title: "Wrong Triage",                 text: "A critical case is classified as low priority, and care is delayed." },
  { id: "waiting", station: "Waiting",     title: "47 Minutes of Waiting",        text: "Reception is jammed, patients lose patience and satisfaction drops." },
  { id: "beds",    station: "Inpatient",   title: "Beds Full, Discharge Delayed", text: "Ready patients wait to leave while new patients wait for a bed." },
  { id: "blind",   station: "Operations",  title: "No Clear Picture",             text: "Management cannot see what is happening across the hospital in real time." },
  { id: "claims",  station: "Billing",     title: "Claim Rejected",               text: "Insurance denies a claim over a small billing error, and revenue is lost." },
  { id: "cost",    station: "Finance",     title: "Unknown Cost of Care",         text: "Nobody knows what each service really costs, so nothing can be optimised." },
];