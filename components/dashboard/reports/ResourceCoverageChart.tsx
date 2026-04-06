'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { azureResources } from '@/lib/mock-data'
import { MoreHorizontal, ChevronDown } from 'lucide-react'

function barColor(status: string) {
  if (status === 'compliant') return 'bg-emerald-400/70'
  if (status === 'at-risk') return 'bg-amber-300/70'
  return 'bg-red-400/70'
}

function scoreTextColor(status: string) {
  if (status === 'compliant') return 'text-emerald-300'
  if (status === 'at-risk') return 'text-amber-300'
  return 'text-red-300'
}

export function ResourceCoverageChart() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sorted = [...azureResources].sort((a, b) => b.complianceScore - a.complianceScore)

  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Resource Coverage</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Compliance score per Azure resource type</p>
        </div>
        <button type="button" className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl p-3 flex flex-col gap-2 flex-1">
        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] text-slate-400 flex-wrap mb-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-300" />
            At risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            Non-compliant
          </span>
        </div>

        {/* Horizontal bar rows */}
        <div className="space-y-2">
          {sorted.map((resource) => (
            <div key={resource.id}>
              <button
                onClick={() => setExpandedId(expandedId === resource.id ? null : resource.id)}
                className="w-full rounded-xl border border-white/10 bg-white/6 p-3 hover:bg-white/8 transition-colors text-left group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm font-bold text-white">{resource.label}</span>
                    {resource.openFindings > 0 && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded border text-red-300 bg-red-500/15 border-red-400/25 whitespace-nowrap">
                        {resource.openFindings} open
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-sm font-black tabular-nums ${scoreTextColor(resource.status)}`}>
                      {resource.complianceScore}%
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${expandedId === resource.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                {/* Bar track */}
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor(resource.status)} shadow-sm transition-all`}
                    style={{ width: `${resource.complianceScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-500">{resource.controlCount} controls</span>
                  <span className="text-[10px] text-slate-500 capitalize">{resource.status.replace('-', ' ')}</span>
                </div>
              </button>

              {/* Expanded detail */}
              {expandedId === resource.id && (
                <div className="mt-2 ml-1 pl-2 border-l border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="rounded-lg border border-white/10 bg-white/3 p-3 space-y-2 text-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Resource Details</p>
                      <div className="space-y-1 text-slate-300">
                        <p><span className="text-slate-400">Type:</span> {resource.resourceType || resource.label}</p>
                        <p><span className="text-slate-400">Controls:</span> {resource.controlCount} total</p>
                        <p><span className="text-slate-400">Status:</span> <span className="capitalize text-slate-200 font-semibold">{resource.status.replace('-', ' ')}</span></p>
                        {resource.openFindings > 0 && (
                          <p><span className="text-slate-400">Open findings:</span> <span className="text-red-300 font-semibold">{resource.openFindings}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
