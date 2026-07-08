import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { RefreshCcw, Sparkles } from "lucide-react";
import {
  expiringContracts,
  pipelineData,
  predictions,
  summaryCards,
} from "../data/renewalData";

function DashboardHeader() {
  return (
    <section className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-[26px] font-extrabold leading-tight text-slate-950">
          Renewal Dashboard
        </h1>
        <p className="mt-1 text-[22px] font-medium leading-7 text-[#61708A]">
          Track and manage upcoming contract renewals
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[22px] border border-violet-200 bg-violet-50 px-5 text-sm font-extrabold uppercase tracking-wide text-violet-600 transition hover:bg-violet-100"
        >
          <Sparkles size={17} />
          AI Renewal Prediction
        </button>
        <button
          type="button"
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[22px] bg-[#255EEA] px-6 text-xl font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <RefreshCcw size={20} />
          Auto-Remind All
        </button>
      </div>
    </section>
  );
}

function SummaryCards() {
  return (
    <section className="grid grid-cols-1 gap-[22px] md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="min-h-[232px] rounded-[22px] border border-[#DAE3EF] bg-white px-7 py-7 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="max-w-[160px] text-[16px] font-extrabold uppercase leading-[26px] tracking-wide text-[#91A0BE]">
                  {card.title}
                </p>
                <p className="mt-4 text-[36px] font-extrabold leading-none text-slate-950">
                  {card.value}
                </p>
                {card.subtitle && (
                  <p className="mt-6 max-w-[100px] text-lg font-medium leading-6 text-[#8492B0]">
                    {card.subtitle}
                  </p>
                )}
              </div>

              <div className={`flex h-[56px] w-[56px] items-center justify-center rounded-[22px] ${card.iconClass}`}>
                <Icon size={26} strokeWidth={2.4} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function RenewalPipeline() {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#DAE3EF] bg-white shadow-sm">
      <div className="border-b border-[#E8EEF6] px-7 py-6">
        <h2 className="text-[22px] font-extrabold text-slate-950">Renewal Pipeline</h2>
      </div>

      <div className="h-[300px] px-8 pb-7 pt-6 sm:h-[312px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pipelineData} margin={{ top: 0, right: 2, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#EAF0F7" strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#97A4BF", fontSize: 17, fontWeight: 500 }}
              dy={12}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#97A4BF", fontSize: 17, fontWeight: 500 }}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(37, 99, 235, 0.06)" }}
              formatter={(value) => [value, "Renewals"]}
              contentStyle={{
                border: "1px solid #DAE3EF",
                borderRadius: 14,
                boxShadow: "0 16px 34px rgba(15, 23, 42, 0.12)",
                fontWeight: 700,
              }}
            />
            <Bar dataKey="renewals" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={106} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function RenewalPrediction() {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#DAE3EF] bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-[#E8EEF6] px-7 py-6">
        <Sparkles size={21} className="text-violet-500" />
        <h2 className="text-[22px] font-extrabold text-slate-950">AI Renewal Prediction</h2>
      </div>

      <div className="space-y-4 px-6 py-6">
        {predictions.map((prediction) => (
          <article
            key={prediction.id}
            className="rounded-[20px] border border-[#EDF1F6] bg-[#F8FAFD] px-[18px] py-[18px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[16px] font-medium text-[#44618B]">{prediction.id}</p>
                <p className="mt-3 text-lg font-extrabold leading-6 text-slate-950">
                  {prediction.recommendation}
                </p>
              </div>
              <span className={`text-lg font-extrabold ${prediction.scoreClass}`}>
                {prediction.confidence}%
              </span>
            </div>

            <div className="mt-[10px] h-2 overflow-hidden rounded-full bg-[#EEF3FA]">
              <div
                className={`h-full rounded-full ${prediction.barClass}`}
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExpiringContracts() {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#DAE3EF] bg-white shadow-sm">
      <div className="border-b border-[#E8EEF6] px-7 py-6">
        <h2 className="text-[22px] font-extrabold text-slate-950">Contracts Expiring Soon</h2>
      </div>

      <div className="px-7 py-6">
        {expiringContracts.map((contract) => (
          <article
            key={contract.title}
            className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[20px] bg-red-50 text-red-500">
                <RefreshCcw size={24} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold leading-6 text-slate-950">{contract.title}</h3>
                <p className="mt-1 text-lg font-medium leading-6 text-[#8795B2]">
                  {contract.vendor} · Expires {contract.expiry}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="text-xl font-extrabold leading-6 text-red-600">{contract.daysLeft}</p>
                <p className="mt-1 text-lg font-medium leading-6 text-[#8795B2]">{contract.amount}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-[18px] bg-[#255EEA] px-5 text-lg font-extrabold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Initiate Renewal
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function RenewalDashboard() {
  return (
    <div className="space-y-7">
      <DashboardHeader />
      <SummaryCards />
      <RenewalPipeline />
      <RenewalPrediction />
      <ExpiringContracts />
    </div>
  );
}
