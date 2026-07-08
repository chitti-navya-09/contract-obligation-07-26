// import {
//   AlertTriangle,
//   Clock3,
//   CalendarDays,
//   Sparkles,
// } from "lucide-react";

// const cards = [
//   {
//     title: "Expiring in 30D",
//     value: "1",
//     icon: AlertTriangle,
//     accent: "red",
//     subtitle: "High priority renewals",
//   },
//   {
//     title: "Expiring in 60D",
//     value: "0",
//     icon: Clock3,
//     accent: "amber",
//     subtitle: "Watch list",
//   },
//   {
//     title: "Expiring in 90D",
//     value: "0",
//     icon: CalendarDays,
//     accent: "blue",
//     subtitle: "Future renewals",
//   },
//   {
//     title: "Auto-Reminder On",
//     value: "5",
//     icon: Sparkles,
//     accent: "emerald",
//     subtitle: "Out of 8 expiring",
//   },
// ];

// export default function SummaryCards() {
//   return (
//     <section className="renewal-summary-grid">
//       {cards.map((card) => {
//         const Icon = card.icon;

//         return (
//           <article key={card.title} className="summary-card">
//             <div className={`summary-card__icon summary-card__icon--${card.accent}`}>
//               <Icon size={18} />
//             </div>

//             <div>
//               <p className="summary-card__label">{card.title}</p>
//               <p className="summary-card__value">{card.value}</p>
//               <p className="summary-card__subtitle">{card.subtitle}</p>
//             </div>
//           </article>
//         );
//       })}
//     </section>
//   );
// }
import {
  AlertTriangle,
  Clock3,
  CalendarDays,
  BellRing,
} from "lucide-react";

const cards = [
  {
    title: "EXPIRING IN\n30D",
    value: "1",
    subtitle: "Critical",
    color: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: AlertTriangle,
  },
  {
    title: "EXPIRING IN\n60D",
    value: "0",
    subtitle: "Warning",
    color: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: Clock3,
  },
  {
    title: "EXPIRING IN\n90D",
    value: "0",
    subtitle: "Upcoming",
    color: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: CalendarDays,
  },
  {
    title: "AUTO REMINDER\nON",
    value: "5",
    subtitle: "Out of 8 expiring",
    color: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: BellRing,
  },
];

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.color} rounded-3xl border border-slate-200 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="whitespace-pre-line text-sm font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`${card.iconBg} flex h-16 w-16 items-center justify-center rounded-2xl`}
              >
                <Icon className={`${card.iconColor}`} size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SummaryCards;