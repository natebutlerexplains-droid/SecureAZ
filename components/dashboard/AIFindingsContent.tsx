import { aiFindings, type AIFinding } from '@/lib/mock-data'
import { ExternalLink } from 'lucide-react'
import { CenteredEmptyState } from '@/components/ui/CenteredEmptyState'

const severityBar: Record<string, string> = {
  critical: 'bg-red-500',
  high:     'bg-orange-500',
  medium:   'bg-yellow-500',
  low:      'bg-green-500',
  info:     'bg-blue-500',
}

const severityBadge: Record<string, string> = {
  critical: 'text-red-300 bg-red-500/15 border-red-400/25',
  high:     'text-orange-300 bg-orange-500/15 border-orange-400/25',
  medium:   'text-yellow-300 bg-yellow-500/15 border-yellow-400/25',
  low:      'text-green-300 bg-green-500/15 border-green-400/25',
  info:     'text-blue-300 bg-blue-500/15 border-blue-400/25',
}

export function AIFindingsContent({
  maxHeightClassName = 'max-h-80',
  findings,
}: {
  maxHeightClassName?: string
  findings?: AIFinding[]
}) {
  const resolvedFindings = findings ?? aiFindings

  if (resolvedFindings.length === 0) {
    return (
      <CenteredEmptyState
        title="No findings yet"
        description="Connect your environment and run a scan to generate AI recommendations."
        ctaLabel="Go to Configs"
        ctaHref="/?tab=settings"
      />
    )
  }

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col">
      <ul className={`space-y-2.5 ${maxHeightClassName} overflow-y-auto pr-1 -mr-1`}>
        {resolvedFindings.map((finding) => (
          <li key={finding.id} className="group relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/35 border border-white/10 shadow-lg shadow-black/40 transition-colors group-hover:bg-black/45 group-hover:border-white/15" />

            <div className="relative flex flex-col gap-2 py-3 px-3">
              {/* Title row */}
              <div className="flex items-start gap-2">
                <span
                  className={`mt-1 inline-block w-1 h-4 shrink-0 rounded-full ${severityBar[finding.severity] ?? 'bg-slate-400'}`}
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold text-white leading-snug">
                  <span className="font-black capitalize">{finding.severity}</span>:{' '}
                  {finding.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed pl-3">
                {finding.description}
              </p>

              {/* Meta row + Remediate */}
              <div className="flex items-center justify-between gap-3 pl-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* SOC 2 control badge */}
                  <span
                    className={`text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded border ${severityBadge[finding.severity] ?? ''}`}
                  >
                    {finding.soc2Control}
                  </span>
                  {/* Affected resource */}
                  <span className="text-[10px] text-slate-400 font-mono">
                    {finding.affectedResource}
                  </span>
                </div>

                <a
                  href={finding.remediationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-blue-500/50 bg-blue-600/80 text-white hover:bg-blue-500 transition-colors"
                >
                  Remediate
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
