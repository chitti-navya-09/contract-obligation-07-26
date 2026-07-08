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


//==========================================
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const data = [
//   { month: "Jul", renewals: 3 },
//   { month: "Aug", renewals: 5 },
//   { month: "Sep", renewals: 2 },
//   { month: "Oct", renewals: 7 },
//   { month: "Nov", renewals: 4 },
//   { month: "Dec", renewals: 8 },
// ];

// function RenewalPipeline() {
//   return (
//     <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

//       {/* Header */}

//       <div className="mb-8 flex items-center justify-between">

//         <div>

//           <h2 className="text-2xl font-bold text-slate-900">
//             Renewal Pipeline
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Contracts approaching renewal
//           </p>

//         </div>

//         <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none">

//           <option>Last 6 Months</option>

//         </select>

//       </div>

//       {/* Chart */}

//       <div className="h-[340px]">

//         <ResponsiveContainer width="100%" height="100%">

//           <BarChart data={data}>

//             <CartesianGrid
//               strokeDasharray="4 4"
//               vertical={false}
//               stroke="#E2E8F0"
//             />

//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//             />

//             <YAxis
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip />

//             <Bar
//               dataKey="renewals"
//               fill="#3B82F6"
//               radius={[10, 10, 0, 0]}
//               barSize={48}
//             />

//           </BarChart>

//         </ResponsiveContainer>

//       </div>

//     </div>
//   );
// }

// export default RenewalPipeline;
