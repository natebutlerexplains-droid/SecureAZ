'use client';

import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const scans = [
  {
    id: 1,
    date: 'Recently completed',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 2,
    date: 'Scheduled today',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 3,
    date: 'Scheduled today',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 4,
    date: 'Scheduled today',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 5,
    date: 'Scheduled today',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 6,
    date: 'Scheduled today',
    status: 'Complete',
    icon: CheckCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
];

export default function RecentScans() {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-400" />
        Recent Automated Scans
      </h3>

      {/* Scan Items */}
      <div className="space-y-2">
        {scans.map((scan) => {
          const Icon = scan.icon;
          return (
            <div
              key={scan.id}
              className={`${scan.bgColor} border border-green-500/20 rounded-lg p-3 flex items-center justify-between hover:border-green-500/40 transition`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${scan.color}`} />
                <div>
                  <p className="text-white text-sm font-medium">Security Scan</p>
                  <p className="text-slate-400 text-xs">{scan.date}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold ${scan.color}`}>
                {scan.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* View More */}
      <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium border-t border-blue-500/20 pt-4 transition">
        View Scan History →
      </button>
    </div>
  );
}
