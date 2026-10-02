// ------------------------------------------------------------------
// Static content for the Welcome screen.
// Keeping it here means the UI components stay purely presentational,
// and later we can swap it for i18n (EN/AR) or an API without touching JSX.
// ------------------------------------------------------------------
import {
  CalendarDays, UserRound, Clock, Stethoscope, BedDouble,
  BarChart3, Activity, Brain, Settings,
  AlertTriangle, Copy, Package, FileX, RotateCcw,
} from "lucide-react";

export const NAV_LINKS = [
  "Home", "Services", "Products", "Partners", "Insights", "About", "Contact",
];

// Stations along the patient path. x / y are % positions inside the path box.
export const JOURNEY_STEPS = [
  { id: "appointment", label: "Appointment", icon: CalendarDays, x: 14, y: 88 },
  { id: "triage",      label: "Triage",      icon: UserRound,    x: 58, y: 68 },
  { id: "waiting",     label: "Waiting",     icon: Clock,        x: 30, y: 50 },
  { id: "diagnostics", label: "Diagnostics", icon: Stethoscope,  x: 50, y: 30 },
  { id: "discharge",   label: "Discharge",   icon: BedDouble,    x: 64, y: 11 },
];

// Hidden cost lines (SAR). The card total is COMPUTED from this list,
// so the headline number can never disagree with the rows.
export const COST_ITEMS = [
  { id: "noshow",    label: "No-show",          icon: AlertTriangle },
  { id: "triage",    label: "Triage",           icon: UserRound },
  { id: "waiting",   label: "Waiting Time",     icon: Clock },
  { id: "duplicate", label: "Duplicate Tests",  icon: Copy },
  { id: "stock",     label: "Stock Issues",     icon: Package },
  { id: "beds",      label: "Bed Inefficiency", icon: BedDouble },
  { id: "claims",    label: "Claim Rejection",  icon: FileX },
  { id: "readmit",   label: "Readmission",      icon: RotateCcw },
];

// Quick service shortcuts under the hero text
export const QUICK_SERVICES = [
  { label: "Data Analytics",       icon: BarChart3 },
  { label: "Data Visualization",   icon: Activity },
  { label: "Predictive Analytics", icon: Brain },
  { label: "Process Optimization", icon: Settings },
];