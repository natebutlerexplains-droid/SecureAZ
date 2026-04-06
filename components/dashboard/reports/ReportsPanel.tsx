import { SOC2TrendChart } from './SOC2TrendChart'
import { ResourceCoverageChart } from './ResourceCoverageChart'
import { ExportActionsBar } from './ExportActionsBar'

export function ReportsPanel() {
  return (
    <div className="flex flex-col gap-4 max-w-400 mx-auto">
      {/* SOC 2 Score Trend (full width) */}
      <SOC2TrendChart variant="new" />

      {/* Report Details */}
      <ExportActionsBar variant="new" />

      {/* Resource Coverage (full width) */}
      <ResourceCoverageChart variant="new" />
    </div>
  )
}
