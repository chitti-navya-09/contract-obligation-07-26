import {
  AlertTriangle,
  Clock3,
  CalendarDays,
  BellRing,
} from "lucide-react";

const defaultCards = [
  {
    title: "EXPIRING IN\n30D",
    value: "0",
    subtitle: "No urgent renewals",
    cardClass: "bg-red-50/80",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    icon: AlertTriangle,
  },
  {
    title: "EXPIRING IN\n60D",
    value: "0",
    subtitle: "Watchlist",
    cardClass: "bg-orange-50/80",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: Clock3,
  },
  {
    title: "EXPIRING IN\n90D",
    value: "0",
    subtitle: "Upcoming",
    cardClass: "bg-blue-50/80",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: CalendarDays,
  },
  {
    title: "AUTO REMINDER\nON",
    value: "0",
    subtitle: "No reminders scheduled",
    cardClass: "bg-emerald-50/80",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: BellRing,
  },
];

function SummaryCards({ data }) {
  const cards = [
    {
      ...defaultCards[0],
      value: data?.expiring30 ?? defaultCards[0].value,
      subtitle: data?.expiring30 ? "Critical" : defaultCards[0].subtitle,
    },
    {
      ...defaultCards[1],
      value: data?.expiring60 ?? defaultCards[1].value,
      subtitle: data?.expiring60 ? "Warning" : defaultCards[1].subtitle,
    },
    {
      ...defaultCards[2],
      value: data?.expiring90 ?? defaultCards[2].value,
      subtitle: data?.expiring90 ? "Upcoming" : defaultCards[2].subtitle,
    },
    {
      ...defaultCards[3],
      value: data?.autoReminder ?? defaultCards[3].value,
      subtitle: data?.autoReminder ? "Reminders active" : defaultCards[3].subtitle,
    },
  ];

  return (
    <section className="renewal-summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className={`summary-card rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.cardClass}`}
          >
            <div className="flex-1">
              <p className="summary-card__label whitespace-pre-line">{card.title}</p>
              <h2 className="summary-card__value mt-5">{card.value}</h2>
              <p className="summary-card__subtitle">{card.subtitle}</p>
            </div>

            <div className={`${card.iconBg} flex h-14 w-14 items-center justify-center rounded-2xl`}>
              <Icon className={`${card.iconColor}`} size={28} />
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default SummaryCards;