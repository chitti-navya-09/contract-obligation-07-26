import { Sparkles } from "lucide-react";

const predictions = [
  {
    id: "CTR-2024-005",
    title: "Renew at -15% cost",
    confidence: 94,
    color: "bg-emerald-500",
    badge: "High Confidence",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "CTR-2024-001",
    title: "Renegotiate SLA Terms",
    confidence: 87,
    color: "bg-blue-500",
    badge: "Recommended",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "CTR-2024-007",
    title: "Extend 6 Months",
    confidence: 76,
    color: "bg-amber-500",
    badge: "Moderate",
    badgeColor: "bg-amber-100 text-amber-700",
  },
];

function RenewalPrediction() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            AI Renewal Prediction
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Machine learning recommendations
          </p>

        </div>

        <div className="rounded-xl bg-violet-100 p-3">
          <Sparkles className="text-violet-600" size={22} />
        </div>

      </div>

      <div className="space-y-5">

        {predictions.map((item) => (

          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 p-5 hover:shadow-md transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-xs text-slate-500">
                  {item.id}
                </p>

                <h3 className="mt-1 font-bold text-slate-900">
                  {item.title}
                </h3>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${item.badgeColor}`}
              >
                {item.badge}
              </span>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm font-medium text-slate-500">
                Confidence
              </span>

              <span className="text-lg font-bold text-slate-900">
                {item.confidence}%
              </span>

            </div>

            <div className="mt-3 h-3 rounded-full bg-slate-200 overflow-hidden">

              <div
                className={`${item.color} h-full rounded-full`}
                style={{ width: `${item.confidence}%` }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RenewalPrediction;