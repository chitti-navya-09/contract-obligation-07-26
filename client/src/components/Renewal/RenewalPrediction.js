import { RefreshCcw, Sparkles } from "lucide-react";
import { useState } from "react";

const defaultPredictions = [
  {
    id: "AUTO-001",
    title: "No recommendations yet",
    confidence: 0,
    badge: "Pending",
  },
];

function RenewalPrediction({ data, defaultVisibleCount = 6, onRefresh, isRefreshing = false }) {
  const [showAll, setShowAll] = useState(true);
  const predictions = Array.isArray(data) && data.length ? data : defaultPredictions;
  const visiblePredictions = showAll ? predictions : predictions.slice(0, defaultVisibleCount);

  return (
    <section className="renewal-card renewal-card--prediction">
      <div className="section-heading renewal-prediction-heading">
        <div className="renewal-prediction-title">
          <Sparkles className="text-violet-600 mr-2" size={22} />
          <div>
            <h2>AI Renewal Prediction</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">Suggested actions based on contract signals</p>
          </div>
        </div>
        <div className="renewal-prediction-controls">
          <button
            type="button"
            className="prediction-refresh-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh predictions"
          >
            <RefreshCcw size={18} />
          </button>
          <button
            type="button"
            className="prediction-toggle-btn"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      </div>

      <div className="prediction-list">
        {visiblePredictions.map((item) => {
          const badgeColor = item.badge === "High Confidence"
            ? "prediction-badge prediction-badge--emerald"
            : item.badge === "Recommended"
              ? "prediction-badge prediction-badge--blue"
              : item.badge === "Moderate"
                ? "prediction-badge prediction-badge--amber"
                : "prediction-badge bg-slate-100 text-slate-700";

          const barColor = item.confidence >= 85
            ? "progress-bar progress-bar--emerald"
            : item.confidence >= 70
              ? "progress-bar progress-bar--blue"
              : item.confidence >= 50
                ? "progress-bar progress-bar--amber"
                : "progress-bar bg-slate-300";

          return (
            <article key={item.id || item.title} className="prediction-item">
              <div className="prediction-item__header">
                <div>
                  <p className="prediction-item__meta">{item.id}</p>
                  <h3 className="prediction-item__label">{item.title || item.recommendation}</h3>
                </div>
                <span className={badgeColor}>{item.badge || "Pending"}</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Confidence</span>
                <span className="text-lg font-bold text-slate-900">{item.confidence ?? 0}%</span>
              </div>

              <div className="progress-track mt-3">
                <div className={barColor} style={{ width: `${item.confidence ?? 0}%` }} />
              </div>

              <div className="prediction-actions">
                <button className="btn btn-secondary btn-sm">Review</button>
                <button className="btn btn-primary btn-sm">Take Action</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RenewalPrediction;