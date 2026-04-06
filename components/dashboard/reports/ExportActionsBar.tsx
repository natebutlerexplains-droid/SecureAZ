'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Download, FileSpreadsheet, CalendarClock, X } from 'lucide-react'
import { CenteredEmptyState } from '@/components/ui/CenteredEmptyState'

export type ExportActionsBarVariant = 'demo' | 'new'

export function ExportActionsBar({
  variant = 'demo',
}: {
  variant?: ExportActionsBarVariant
}) {
  if (variant === 'new') {
    return (
      <GlassCard className="min-h-56 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Report Details</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Export options and generation status
            </p>
          </div>
        </div>
        <CenteredEmptyState
          title="No report generated yet"
          description="Configure your environment and run scans to generate your first SOC 2 readiness report."
          ctaLabel="Go to Configs"
          ctaHref="/?tab=settings"
        />
      </GlassCard>
    )
  }

  const reportDate = 'April 6, 2026'
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [exporting, setExporting] = useState<'pdf' | 'csv' | null>(null)

  const handleExport = async (format: 'pdf' | 'csv') => {
    setExporting(format)
    // Simulate export delay
    setTimeout(() => {
      const data = format === 'pdf' ? 'Mock PDF Report' : 'Mock CSV Data'
      const link = document.createElement('a')
      link.href = `data:text/${format === 'pdf' ? 'plain' : 'csv'};charset=utf-8,${encodeURIComponent(data)}`
      link.download = `soc2-report-${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setExporting(null)
    }, 600)
  }

  return (
    <>
      <GlassCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Report metadata */}
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
              Report Details
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-semibold text-white">
                SOC 2 Type II Readiness
              </span>
              <span className="text-[11px] text-slate-400 font-mono border border-white/10 bg-white/6 px-2 py-0.5 rounded-lg">
                Framework: SOC 2
              </span>
              <span className="text-[11px] text-slate-400 font-mono border border-white/10 bg-white/6 px-2 py-0.5 rounded-lg">
                Generated: {reportDate}
              </span>
              <span className="text-[11px] text-slate-400 font-mono border border-white/10 bg-white/6 px-2 py-0.5 rounded-lg">
                Scope: Azure Production
              </span>
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExport('pdf')}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <Download className={`w-4 h-4 ${exporting === 'pdf' ? 'animate-pulse' : ''}`} />
              {exporting === 'pdf' ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              onClick={() => handleExport('csv')}
              disabled={exporting !== null}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-white/10 bg-white/6 text-white hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <FileSpreadsheet className={`w-4 h-4 ${exporting === 'csv' ? 'animate-pulse' : ''}`} />
              {exporting === 'csv' ? 'Exporting...' : 'Export CSV'}
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-white/10 bg-white/6 text-white hover:bg-white/10 transition-colors"
            >
              <CalendarClock className="w-4 h-4" />
              Schedule
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Schedule modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/90 backdrop-blur-xl p-6 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Schedule Report</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-1 hover:bg-white/8 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Frequency</label>
                <select className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-400/50">
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email recipients</label>
                <input
                  type="email"
                  placeholder="team@example.com"
                  className="w-full rounded-lg border border-white/10 bg-white/6 px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="include-findings" className="rounded" defaultChecked />
                <label htmlFor="include-findings" className="text-sm text-slate-300">Include findings summary</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="include-metrics" className="rounded" defaultChecked />
                <label htmlFor="include-metrics" className="text-sm text-slate-300">Include compliance metrics</label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border border-white/10 bg-white/6 text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScheduleModal(false)
                  }}
                  className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
