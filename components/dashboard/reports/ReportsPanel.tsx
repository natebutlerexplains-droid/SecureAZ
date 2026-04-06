import { GlassCard } from '@/components/ui/GlassCard'
import { RecentScansContent } from '@/components/dashboard/RecentScans'
import { ComplianceMatrixVisual } from '@/components/dashboard/ComplianceMatrixVisual'
import { MoreHorizontal } from 'lucide-react'
import { ReportKPIBar } from './ReportKPIBar'
import { SOC2TrendChart } from './SOC2TrendChart'
import { FindingsTable } from './FindingsTable'
import { ResourceCoverageChart } from './ResourceCoverageChart'
import { ExportActionsBar } from './ExportActionsBar'

export function ReportsPanel() {
  return (
    <div className="flex flex-col gap-4 max-w-400 mx-auto">
      {/* Page title */}
      <h1 className="text-2xl font-black text-white tracking-tight">
        Security Reports
      </h1>

      {/* Section 1 — KPI Summary Bar */}
      <ReportKPIBar />

      {/* Section 2 — SOC 2 Trend + Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
        <SOC2TrendChart />
        <GlassCard className="flex flex-col gap-3 min-h-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Automated Scans</h2>
            <button type="button" className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          <RecentScansContent maxHeightClassName="max-h-72" />
        </GlassCard>
      </div>

      {/* Section 3 — Findings Table */}
      <FindingsTable />

      {/* Section 4 — Compliance Matrix + Resource Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ComplianceMatrixVisual />
        <ResourceCoverageChart />
      </div>

      {/* Section 5 — Export / Actions bar */}
      <ExportActionsBar />
    </div>
  )
}
