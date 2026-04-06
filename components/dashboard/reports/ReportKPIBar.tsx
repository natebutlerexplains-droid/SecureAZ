'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { AlertOctagon, ShieldCheck, FolderCheck, ScanLine, TrendingUp, ArrowRight } from 'lucide-react'

const kpis = [
  {
    id: 'total-findings',
    label: 'Total Findings',
    value: '5',
    sub: '2 critical',
    icon: AlertOctagon,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/15 border-red-500/30',
    subColor: 'text-red-300',
    detail: 'Critical: 2 | High: 1 | Medium: 1 | Low: 1',
    trend: 'down',
  },
  {
    id: 'soc2-score',
    label: 'SOC 2 Score',
    value: '74%',
    sub: '↑ 4% this month',
    icon: ShieldCheck,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-500/15 border-teal-500/30',
    subColor: 'text-teal-300',
    detail: 'Security: 68% | Availability: 74% | Confidentiality: 81%',
    trend: 'up',
  },
  {
    id: 'evidence-rate',
    label: 'Evidence Rate',
    value: '83%',
    sub: '34 of 41 controls',
    icon: FolderCheck,
    iconColor: 'text-azure-400',
    iconBg: 'bg-azure-500/15 border-azure-500/30',
    subColor: 'text-slate-400',
    detail: 'Verified: 34 | In Progress: 5 | Not Started: 2',
    trend: 'up',
  },
  {
    id: 'scans-30d',
    label: 'Scans (30d)',
    value: '12',
    sub: '2 in progress',
    icon: ScanLine,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/15 border-cyan-500/30',
    subColor: 'text-slate-400',
    detail: 'Completed: 9 | Scheduled: 1 | In Progress: 2',
    trend: 'up',
  },
]

export function ReportKPIBar() {
  const [selectedKpi, setSelectedKpi] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const isSelected = selectedKpi === kpi.id
          return (
            <button
              key={kpi.id}
              onClick={() => setSelectedKpi(isSelected ? null : kpi.id)}
              className="text-left group transition-all hover:scale-105 active:scale-95"
            >
              <GlassCard className={`flex items-center gap-3 py-3 h-full border-2 transition-colors ${isSelected ? 'border-cyan-400/60 bg-slate-900/40' : 'border-transparent group-hover:border-white/20'}`}>
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${kpi.iconBg} ${kpi.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest truncate">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-black text-white leading-tight">
                    {kpi.value}
                  </p>
                  <p className={`text-[11px] font-semibold ${kpi.subColor}`}>
                    {kpi.sub}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true" />
                )}
              </GlassCard>
            </button>
          )
        })}
      </div>

      {/* Detail panel — appears when KPI is selected */}
      {selectedKpi && (
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/8 backdrop-blur-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {kpis.map((kpi) => {
                if (kpi.id !== selectedKpi) return null
                const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingUp
                return (
                  <div key={kpi.id}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{kpi.label} Breakdown</h3>
                      <TrendIcon className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-teal-300' : 'text-red-300'}`} />
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{kpi.detail}</p>
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors">
                      View Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
            </div>
            <button
              onClick={() => setSelectedKpi(null)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close detail panel"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
