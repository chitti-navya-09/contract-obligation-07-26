import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const pipelineData = [
  { month: "Jul", contracts: 3, color: "#2563EB" },
  { month: "Aug", contracts: 5, color: "#2563EB" },
  { month: "Sep", contracts: 2, color: "#2563EB" },
  { month: "Oct", contracts: 7, color: "#2563EB" },
  { month: "Nov", contracts: 4, color: "#2563EB" },
  { month: "Dec", contracts: 8, color: "#2563EB" },
];

export default function RenewalPipeline() {
  return (
    <section className="renewal-card renewal-card--pipeline">
      <div className="section-heading">
        <h2>Renewal Pipeline</h2>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={pipelineData} margin={{ top: 12, right: 0, left: -26, bottom: 0 }}>
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#94A3B8" />
            <YAxis axisLine={false} tickLine={false} stroke="#94A3B8" tickCount={5} />
            <Tooltip
              cursor={{ fill: "rgba(59, 130, 246, 0.08)" }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                boxShadow: "0 18px 36px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Legend verticalAlign="top" align="right" height={36} />
            <Bar dataKey="contracts" name="Renewals Due" fill="#2563EB" radius={[12, 12, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}


