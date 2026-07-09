
import {
  CalendarDays,
  Building2,
  DollarSign,
  Clock3,
  ArrowRight,
  Eye,
} from "lucide-react";

const contracts = [
  {
    id: 1,
    name: "HR Analytics Platform",
    vendor: "Darwinbox Inc.",
    expiry: "Jul 30, 2024",
    amount: "$48,000",
    days: 25,
    status: "Critical",
    color: "bg-red-100 text-red-700",
  },
  {
    id: 2,
    name: "Microsoft 365 Enterprise",
    vendor: "Microsoft",
    expiry: "Aug 15, 2024",
    amount: "$120,000",
    days: 41,
    status: "Upcoming",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 3,
    name: "AWS Cloud Hosting",
    vendor: "Amazon AWS",
    expiry: "Sep 10, 2024",
    amount: "$92,000",
    days: 68,
    status: "Upcoming",
    color: "bg-blue-100 text-blue-700",
  },
];

function ExpiringContracts() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Contracts Expiring Soon
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review contracts that need attention
          </p>

        </div>

        <button className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold hover:bg-slate-100">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {contracts.map((contract) => (

          <div
            key={contract.id}
            className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-md"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <h3 className="text-xl font-bold text-slate-900">
                    {contract.name}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${contract.color}`}
                  >
                    {contract.status}
                  </span>

                </div>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <Building2 size={18} />
                    {contract.vendor}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {contract.expiry}
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign size={18} />
                    {contract.amount}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={18} />
                    {contract.days} Days Left
                  </div>

                </div>

              </div>

              <div className="flex gap-3">

                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold hover:bg-slate-100">

                  <Eye size={18} />

                  View

                </button>

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">

                  Initiate Renewal

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ExpiringContracts;