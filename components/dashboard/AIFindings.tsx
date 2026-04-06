import { aiFindings } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { ChevronRight, Sparkles } from 'lucide-react'

export function AIFindings() {
  return (
    <GlassCard className="col-span-1 flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-azure-400" />
          <h2 className="text-lg font-semibold text-white">AI Compliance Gaps</h2>
        </div>
        <span className="text-xs font-medium text-zinc-500 bg-white/5 px-2.5 py-1 rounded-full border border-white/8">
          {aiFindings.length} findings
        </span>
      </div>

      {/* Findings list */}
      <ul className="space-y-1 max-h-96 overflow-y-auto -mx-1 px-1">
        {aiFindings.map((finding, idx) => (
          <li
            key={finding.id}
            className={`group flex items-start gap-4 py-3.5 px-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer ${
              idx !== aiFindings.length - 1 ? 'border-b border-white/5' : ''
            }`}
          >
            <div className="shrink-0 pt-0.5">
              <SeverityBadge level={finding.severity} />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-medium text-white leading-snug">
                {finding.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-mono text-azure-400/80 bg-azure-500/10 px-1.5 py-0.5 rounded">
                  {finding.soc2Control}
                </span>
                <span>{finding.soc2Name}</span>
                <span>•</span>
                <span>{finding.source}</span>
                <span>•</span>
                <span>{finding.timestamp}</span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 mt-1 transition-colors" />
          </li>
        ))}
      </ul>

      <button className="mt-5 w-full py-2.5 px-3 rounded-xl border border-azure-500/20 text-azure-400 text-sm font-medium hover:bg-azure-500/10 transition-colors">
        View All Compliance Gaps
      </button>
    </GlassCard>
  )
}
