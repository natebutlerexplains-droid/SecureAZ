'use client';

import { AlertCircle, AlertTriangle } from 'lucide-react';

const findings = [
  {
    id: 1,
    severity: 'Critical',
    title: 'Excessive User Permissions',
    description: 'Critical security risk with overly permissive access policies',
    action: 'Remediate Immediately',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  {
    id: 2,
    severity: 'High',
    title: 'Misconfigured Storage Accounts',
    description: 'High-risk storage accounts with public blob access enabled',
    action: 'Remediate Alerts',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 3,
    severity: 'Medium',
    title: 'Weak Encryption Policies',
    description: 'Recommended automated policy enforcement for encryption',
    action: 'Review Policy',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
];

export default function FindingsSection() {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          AI Findings & Recommendations
        </h3>
        <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
          3 Issues Found
        </span>
      </div>

      {/* Findings List */}
      <div className="space-y-3">
        {findings.map((finding) => (
          <div
            key={finding.id}
            className={`${finding.bgColor} border ${finding.borderColor} rounded-lg p-4 transition hover:border-opacity-100`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className={`w-4 h-4 ${finding.color}`} />
                  <span className={`text-sm font-semibold ${finding.color}`}>
                    {finding.severity}
                  </span>
                </div>
                <h4 className="text-white font-medium">{finding.title}</h4>
                <p className="text-slate-400 text-sm mt-1">{finding.description}</p>
              </div>
              <button className="ml-4 px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 rounded-md text-xs font-medium text-blue-300 transition whitespace-nowrap">
                {finding.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium border-t border-blue-500/20 pt-4 transition">
        View All Findings →
      </button>
    </div>
  );
}
