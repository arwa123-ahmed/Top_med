// Content for the "Explore the Solutions" page. `id` matches the scene ids in journeyData.js.
// severity = flask level (1-7) shown in the "before" state; the "after" state always drains it.
// impact is qualitative on purpose; add a `metric` field later when real results are available.
export const SOLUTIONS = [
  {
    id: "noshow", label: "No-Show", title: "Missed Appointment", severity: 5,
    before: "Patients miss appointments without warning, leaving empty slots and idle clinicians.",
    after: "Topmed predicts who is likely to miss, sends targeted reminders and fills the gap with smart overbooking.",
    services: ["Predictive Analytics"], impact: "Fuller clinics, fewer wasted slots",
  },
  {
    id: "triage", label: "Triage", title: "Wrong Triage", severity: 6,
    before: "Critical cases are sometimes classified as low priority, delaying urgent care.",
    after: "Risk models support the triage decision in real time and flag critical cases instantly.",
    services: ["Predictive Analytics"], impact: "Faster, safer escalation of critical cases",
  },
  {
    id: "waiting", label: "Waiting", title: "Long Waiting Times", severity: 5,
    before: "Long waits and a jammed reception frustrate patients and staff.",
    after: "We map every step from arrival to consultation, find the bottlenecks and redesign the flow.",
    services: ["Process Optimization"], impact: "Shorter waits, calmer reception",
  },
  {
    id: "beds", label: "Beds", title: "Beds Full, Discharge Delayed", severity: 6,
    before: "Beds stay occupied by patients ready to leave, while new patients wait for a bed.",
    after: "Live bed and discharge tracking lets teams plan discharges early and free beds sooner.",
    services: ["Data Visualization"], impact: "Better bed use, faster patient flow",
  },
  {
    id: "blind", label: "Visibility", title: "No Clear Picture", severity: 7,
    before: "Data is scattered across systems, so management cannot see the real picture.",
    after: "Connected data and live dashboards give leaders one clear view of operations.",
    services: ["Data Visualization", "Big Data Analytics"], impact: "Decisions in minutes, not weeks",
  },
  {
    id: "claims", label: "Claims", title: "Claim Rejected", severity: 7,
    before: "Insurance rejects claims over small coding and billing errors, and revenue is lost.",
    after: "We analyse rejection patterns and catch errors before claims are submitted.",
    services: ["Big Data Analytics"], impact: "Fewer rejections, faster revenue",
  },
  {
    id: "cost", label: "Costing", title: "Unknown Cost of Care", severity: 7,
    before: "Nobody knows what each service really costs, so nothing can be optimised.",
    after: "Activity-based costing reveals the true cost and profitability of every service.",
    services: ["ABC Costing & Profitability"], impact: "Every service costed, every decision informed",
  },
];
