import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  Zap,
} from "lucide-react";

export const summaryCards = [
  {
    title: "Expiring in 30D",
    titleLines: ["Expiring in", "30D"],
    value: "1",
    icon: AlertTriangle,
    iconClass: "bg-red-50 text-red-500",
  },
  {
    title: "Expiring in 60D",
    titleLines: ["Expiring in", "60D"],
    value: "0",
    icon: Clock3,
    iconClass: "bg-orange-50 text-orange-500",
  },
  {
    title: "Expiring in 90D",
    titleLines: ["Expiring in", "90D"],
    value: "0",
    icon: CalendarDays,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Auto-Reminder On",
    titleLines: ["Auto-", "Reminder", "On"],
    value: "5",
    subtitle: "Out of 8 expiring",
    icon: Zap,
    iconClass: "bg-emerald-50 text-emerald-500",
  },
];

export const pipelineData = [
  { month: "Jul", renewals: 3 },
  { month: "Aug", renewals: 5 },
  { month: "Sep", renewals: 2 },
  { month: "Oct", renewals: 7 },
  { month: "Nov", renewals: 4 },
  { month: "Dec", renewals: 8 },
];

export const predictions = [
  {
    id: "CTR-2024-005",
    recommendation: "Renew at -15% cost",
    confidence: 94,
    barClass: "bg-emerald-500",
    scoreClass: "text-emerald-600",
  },
  {
    id: "CTR-2024-001",
    recommendation: "Renegotiate SLA terms",
    confidence: 87,
    barClass: "bg-blue-600",
    scoreClass: "text-blue-600",
  },
  {
    id: "CTR-2024-007",
    recommendation: "Extend 6 months auto",
    confidence: 76,
    barClass: "bg-orange-500",
    scoreClass: "text-orange-500",
  },
];

export const expiringContracts = [
  {
    title: "HR Analytics Platform - Darwinbox",
    vendor: "Darwinbox Inc",
    expiry: "Jul 30, 2024",
    amount: "$48,000",
    daysLeft: "25 days",
  },
];
