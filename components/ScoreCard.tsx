'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ScoreCard() {
  const data = [
    { name: 'Compliant', value: 82 },
    { name: 'Non-Compliant', value: 18 },
  ];

  const COLORS = ['#50e6ff', '#0f1419'];

  const metrics = [
    { label: 'Security', value: '82%', color: 'text-cyan-400' },
    { label: 'Availability', value: '87%', color: 'text-blue-400' },
    { label: 'Confidentiality', value: '76%', color: 'text-purple-400' },
  ];

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-6">Overall SOC 2 Readiness Score</h3>

      {/* Donut Chart */}
      <div className="flex justify-center mb-8">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-cyan-400">82%</div>
        <p className="text-slate-400 text-sm mt-1">Overall Compliance</p>
      </div>

      {/* Metrics */}
      <div className="space-y-3 border-t border-blue-500/20 pt-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">{metric.label}</span>
            <span className={`font-semibold ${metric.color}`}>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
