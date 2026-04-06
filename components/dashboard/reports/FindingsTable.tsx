'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { aiFindings } from '@/lib/mock-data'
import { MoreHorizontal, ExternalLink, ChevronDown } from 'lucide-react'

const severityBar: Record<string, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
  info: 'bg-blue-500',
}

const severityBadge: Record<string, string> = {
  critical: 'text-red-300 bg-red-500/15 border-red-400/25',
  high: 'text-orange-300 bg-orange-500/15 border-orange-400/25',
  medium: 'text-yellow-300 bg-yellow-500/15 border-yellow-400/25',
  low: 'text-green-300 bg-green-500/15 border-green-400/25',
  info: 'text-blue-300 bg-blue-500/15 border-blue-400/25',
}

export function FindingsTable() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Security Findings</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{aiFindings.length} active findings</p>
        </div>
        <button type="button" className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[20px_minmax(0,2fr)_80px_minmax(0,1fr)_90px_90px] gap-px bg-black/40">
          {['', 'Finding', 'SOC 2', 'Affected Resource', 'Detected', ''].map((h, i) => (
            <div key={i} className="px-3 py-2 bg-black/30 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {aiFindings.map((finding) => (
            <div key={finding.id}>
              <button
                onClick={() => setExpandedId(expandedId === finding.id ? null : finding.id)}
                className="w-full grid grid-cols-[20px_minmax(0,2fr)_80px_minmax(0,1fr)_90px_90px] gap-px group hover:bg-white/4 transition-colors text-left"
              >
                {/* Severity bar */}
                <div className="flex items-center justify-center py-3 px-2 bg-black/20 group-hover:bg-transparent transition-colors">
                  <span
                    className={`w-1 h-8 rounded-full ${severityBar[finding.severity]}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <div className="py-3 px-3 bg-black/20 group-hover:bg-transparent transition-colors min-w-0">
                  <p className="text-sm font-semibold text-white leading-snug truncate">{finding.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{finding.source}</p>
                </div>

                {/* SOC 2 control badge */}
                <div className="py-3 px-2 bg-black/20 group-hover:bg-transparent transition-colors flex items-center">
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border ${severityBadge[finding.severity]}`}>
                    {finding.soc2Control}
                  </span>
                </div>

                {/* Affected resource */}
                <div className="py-3 px-3 bg-black/20 group-hover:bg-transparent transition-colors flex items-center min-w-0">
                  <span className="text-xs font-mono text-slate-300 truncate">{finding.affectedResource}</span>
                </div>

                {/* Timestamp */}
                <div className="py-3 px-3 bg-black/20 group-hover:bg-transparent transition-colors flex items-center">
                  <span className="text-xs text-slate-400 whitespace-nowrap">{finding.timestamp}</span>
                </div>

                {/* Expand chevron */}
                <div className="py-3 px-2 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${expandedId === finding.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Expanded detail row */}
              {expandedId === finding.id && (
                <div className="grid grid-cols-[20px_minmax(0,2fr)_80px_minmax(0,1fr)_90px_90px] gap-px bg-white/3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-start-2 col-end-6 py-3 px-3">
                    <div className="rounded-xl border border-white/10 bg-white/6 p-3 space-y-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Description</p>
                        <p className="text-sm text-slate-200">{finding.description || 'No description available.'}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                        <a
                          href={finding.remediationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                        >
                          View Remediation <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-[10px] text-slate-500">Status: {finding.status || 'Open'}</span>
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
