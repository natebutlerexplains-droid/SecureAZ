'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const resourceData = [
  { resource: 'Compute', compliant: 24, nonCompliant: 4, fill: '#0078d4' },
  { resource: 'Storage', compliant: 28, nonCompliant: 6, fill: '#50e6ff' },
  { resource: 'Database', compliant: 15, nonCompliant: 3, fill: '#0099ff' },
  { resource: 'Networking', compliant: 32, nonCompliant: 5, fill: '#00bcf2' },
  { resource: 'Security', compliant: 19, nonCompliant: 2, fill: '#7fdbca' },
];

export default function ResourceMap() {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-6">Azure Resource Distribution</h3>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={resourceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="resource" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #64748b',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Bar dataKey="compliant" fill="#50e6ff" name="Compliant" />
            <Bar dataKey="nonCompliant" fill="#ef4444" name="Non-Compliant" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mt-6 pt-6 border-t border-blue-500/20">
        {resourceData.map((item) => (
          <div key={item.resource} className="text-center">
            <p className="text-slate-400 text-xs mb-2">{item.resource}</p>
            <p className="text-cyan-400 text-lg font-semibold">{item.compliant}</p>
            <p className="text-red-400 text-xs">{item.nonCompliant}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
