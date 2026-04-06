import { complianceControls } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatusIndicator } from '@/components/ui/StatusIndicator'

export function ComplianceMatrix() {
  return (
    <GlassCard className="col-span-1 xl:col-span-4">
      <h2 className="text-lg font-semibold text-white mb-4">
        Compliance Control Matrix
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Control ID
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Control Name
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Category
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Last Reviewed
              </th>
              <th className="text-left px-4 py-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {complianceControls.map((control, idx) => (
              <tr
                key={control.id}
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  idx === complianceControls.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-mono text-azure-400">
                  {control.id}
                </td>
                <td className="px-4 py-3 text-sm text-white">{control.name}</td>
                <td className="px-4 py-3 text-sm text-zinc-400">
                  {control.category}
                </td>
                <td className="px-4 py-3">
                  <StatusIndicator status={control.status} />
                </td>
                <td className="px-4 py-3 text-sm text-zinc-400">
                  {control.lastReviewed}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-400">
                  {control.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 w-full py-2 px-3 rounded-lg border border-azure-500/30 text-azure-400 text-sm font-medium hover:bg-azure-500/10 transition-colors">
        Download Compliance Report
      </button>
    </GlassCard>
  )
}
