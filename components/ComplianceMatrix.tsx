'use client';

import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const controlData = [
  {
    control: 'Standard Control Domain',
    status: 'Implemented',
    implementation: 'Automated',
    evidence: '3',
    lastAudited: '2 days ago',
  },
  {
    control: 'Standard Control Domain',
    status: 'Implemented',
    implementation: 'Automated',
    evidence: '2',
    lastAudited: '3 days ago',
  },
  {
    control: 'Standard Resource Domain',
    status: 'Partial',
    implementation: 'Manual',
    evidence: '1',
    lastAudited: '1 day ago',
  },
  {
    control: 'Standard Resource Domain',
    status: 'Implemented',
    implementation: 'Automated',
    evidence: '4',
    lastAudited: 'Today',
  },
  {
    control: 'Standard Encryption Domain',
    status: 'Not Implemented',
    implementation: 'Pending',
    evidence: '0',
    lastAudited: '5 days ago',
  },
  {
    control: 'Standard Application Map',
    status: 'Implemented',
    implementation: 'Automated',
    evidence: '3',
    lastAudited: 'Today',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Implemented':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'Partial':
      return <AlertCircle className="w-4 h-4 text-yellow-400" />;
    case 'Not Implemented':
      return <XCircle className="w-4 h-4 text-red-400" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Implemented':
      return 'text-green-400';
    case 'Partial':
      return 'text-yellow-400';
    case 'Not Implemented':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
};

export default function ComplianceMatrix() {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Compliance Control Matrix</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-slate-400">Implemented</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400">Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-slate-400">Not Implemented</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-blue-500/20">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Control Domain
              </th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Status
              </th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Implementation
              </th>
              <th className="text-center py-3 px-4 text-slate-400 font-medium">
                Evidence
              </th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Last Audited
              </th>
            </tr>
          </thead>
          <tbody>
            {controlData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800/30 transition"
              >
                <td className="py-4 px-4 text-white">{row.control}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(row.status)}
                    <span className={getStatusColor(row.status)}>
                      {row.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">
                  <span className="bg-slate-800/50 px-3 py-1 rounded-full text-xs">
                    {row.implementation}
                  </span>
                </td>
                <td className="py-4 px-4 text-center text-slate-300">
                  {row.evidence}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  {row.lastAudited}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium border-t border-blue-500/20 pt-4 transition">
        View Full Matrix →
      </button>
    </div>
  );
}
