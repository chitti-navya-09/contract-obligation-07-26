import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Active', value: 98, color: '#5f27cd' },
  { name: 'Pending', value: 32, color: '#3498db' },
  { name: 'Expiring Soon', value: 12, color: '#f1c40f' },
  { name: 'Expired', value: 7, color: '#e74c3c' },
  { name: 'Terminated', value: 7, color: '#95a5a6' },
];

const ContractStatusChart = () => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractStatusChart;