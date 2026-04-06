'use client'

import { complianceControls, azureResources, type ComplianceControl, type AzureResource } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { CenteredEmptyState } from '@/components/ui/CenteredEmptyState'
import { Check, X, AlertCircle, HelpCircle, MoreHorizontal } from 'lucide-react'

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig = {
  pass: {
    label: 'Pass',
    icon: <Check className="w-4 h-4" />,
    fillClassName: 'bg-emerald-500/22 text-emerald-100',
  },
  fail: {
    label: 'Fail',
    icon: <X className="w-4 h-4" />,
    fillClassName: 'bg-red-500/22 text-red-100',
  },
  partial: {
    label: 'Partial',
    icon: <AlertCircle className="w-4 h-4" />,
    fillClassName: 'bg-amber-500/22 text-amber-100',
  },
  'not-tested': {
    label: 'Not Tested',
    icon: <HelpCircle className="w-4 h-4" />,
    fillClassName: 'bg-slate-500/18 text-slate-100',
  },
} as const

// ─── Resource applicability per control ──────────────────────────────────────
// true = this resource type is materially covered by the control

const resourceApplicability: Record<string, { rbac: boolean; storage: boolean; keyvault: boolean }> = {
  'CC6.1': { rbac: true,  storage: false, keyvault: false },
  'CC6.2': { rbac: true,  storage: false, keyvault: false },
  'CC6.3': { rbac: true,  storage: true,  keyvault: true  },
  'CC7.2': { rbac: false, storage: true,  keyvault: true  },
  'CC8.1': { rbac: false, storage: false, keyvault: false },
  'A1.1':  { rbac: false, storage: true,  keyvault: false },
  'A1.2':  { rbac: false, storage: false, keyvault: false },
  'C1.1':  { rbac: false, storage: true,  keyvault: true  },
  'C1.2':  { rbac: false, storage: false, keyvault: false },
  'I1.1':  { rbac: false, storage: true,  keyvault: false },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function evidenceBarGrad(rate: number) {
  if (rate >= 80) return 'from-emerald-400/80 via-cyan-300/70 to-sky-300/70'
  if (rate >= 55) return 'from-amber-400/80 via-yellow-300/70 to-amber-300/70'
  return 'from-red-400/80 via-rose-300/70 to-red-300/70'
}

function evidenceTextColor(rate: number) {
  if (rate >= 80) return 'text-emerald-300'
  if (rate >= 55) return 'text-amber-300'
  return 'text-red-300'
}

function resourceBarColor(status: string) {
  if (status === 'compliant')    return 'bg-emerald-400/70'
  if (status === 'at-risk')      return 'bg-amber-300/70'
  return 'bg-red-400/70'
}

// Progress series: simulated 7-week evidence collection trend (%)
const progressSeries = [48, 54, 59, 62, 67, 71, 74]

export type ComplianceMatrixVisualVariant = 'demo' | 'new'

export function ComplianceMatrixVisual({
  variant = 'demo',
  controls,
  resources,
}: {
  variant?: ComplianceMatrixVisualVariant
  controls?: ComplianceControl[]
  resources?: AzureResource[]
}) {
  const isNewAccount = variant === 'new'
  const resolvedControls = controls ?? complianceControls
  const resolvedResources = resources ?? azureResources

  const totalControls = resolvedControls.length
  const verifiedControls = resolvedControls.filter((c) => c.evidenceRate >= 80).length
  const openRequests = resolvedControls.filter((c) => c.evidenceRate < 80).length

  // Top 4 resource types for the chart (sorted by compliance score asc — most interesting first)
  const chartResources = [...resolvedResources]
    .sort((a, b) => a.complianceScore - b.complianceScore)
    .slice(0, 4)

  return (
    <GlassCard className="min-h-80 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Compliance Control Matrix</h2>
        {!isNewAccount && (
          <button
            type="button"
            className="p-1.5 hover:bg-white/8 rounded-lg transition-colors"
            aria-label="Compliance matrix menu"
          >
            <MoreHorizontal className="w-5 h-5 text-slate-300" />
          </button>
        )}
      </div>

      {isNewAccount ? (
        <CenteredEmptyState
          title="No controls yet"
          description="Configure your environment to generate SOC 2 control coverage and evidence tracking."
          ctaLabel="Go to Configs"
          ctaHref="/?tab=settings"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-3 flex-1 min-h-0">

        {/* ── Main table ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl overflow-hidden flex flex-col min-h-0">
          {/* Header */}
          <div>
            {/* Group band — slim category labels, clearly subordinate */}
            <div className="grid grid-cols-[1fr_88px_60px_60px_60px_72px] gap-px bg-black/40">
              <div className="px-3 py-1 bg-black/40 text-[9px] uppercase tracking-widest text-slate-500 font-semibold">
                Control Domain
              </div>
              <div className="px-3 py-1 bg-black/40 text-[9px] uppercase tracking-widest text-slate-500 font-semibold text-center">
                Status
              </div>
              <div className="px-3 py-1 bg-black/40 text-[9px] uppercase tracking-widest text-slate-500 font-semibold text-center col-span-3">
                Azure Resources
              </div>
              <div className="px-3 py-1 bg-black/40 text-[9px] uppercase tracking-widest text-slate-500 font-semibold text-right">
                Evidence
              </div>
            </div>

            {/* Column header row — owns the visual weight */}
            <div className="grid grid-cols-[1fr_88px_60px_60px_60px_72px] gap-px">
              {[
                { label: 'Control',  grad: 'from-cyan-300/60 to-blue-400/60',    align: '' },
                { label: 'Status',   grad: 'from-emerald-300/50 to-cyan-300/55', align: 'text-center' },
                { label: 'RBAC',     grad: 'from-sky-300/45 to-cyan-300/55',     align: 'text-center' },
                { label: 'Storage',  grad: 'from-amber-300/45 to-cyan-300/55',   align: 'text-center' },
                { label: 'KV',       grad: 'from-violet-300/45 to-cyan-300/55',  align: 'text-center' },
                { label: 'Evidence', grad: 'from-rose-300/45 to-cyan-300/55',    align: 'text-right' },
              ].map(({ label, grad, align }) => (
                <div key={label} className="bg-black/25">
                  <div className={`h-0.75 bg-linear-to-r ${grad}`} />
                  <div className={`px-3 py-2.5 text-[11px] uppercase tracking-wider text-slate-200 font-bold ${align}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-white/10">
            <div className="grid grid-cols-[1fr_88px_60px_60px_60px_72px] gap-px">
              {resolvedControls.map((control) => {
                const cfg = statusConfig[control.status]
                const res = resourceApplicability[control.id]

                return (
                  <div key={control.id} className="contents">
                    {/* Control domain */}
                    <div className="px-3 py-2.5 bg-black/20 hover:bg-white/6 transition-colors min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        {control.category}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 min-w-0">
                        <span className="text-xs font-black text-white shrink-0">{control.id}</span>
                        <span className="text-xs text-slate-300 truncate">{control.name}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="px-0 py-0 bg-black/20 hover:bg-white/6 transition-colors">
                      <div className={`w-full h-full flex items-center justify-center gap-1.5 px-2 ${cfg.fillClassName}`}>
                        <span className="inline-flex items-center justify-center">{cfg.icon}</span>
                        <span className="text-[11px] font-black uppercase tracking-wide">{cfg.label}</span>
                      </div>
                    </div>

                    {/* RBAC */}
                    <div className="bg-black/20 hover:bg-white/6 transition-colors flex items-center justify-center py-2.5">
                      {res?.rbac
                        ? <Check className="w-4 h-4 text-emerald-300" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />}
                    </div>

                    {/* Storage */}
                    <div className="bg-black/20 hover:bg-white/6 transition-colors flex items-center justify-center py-2.5">
                      {res?.storage
                        ? <Check className="w-4 h-4 text-emerald-300" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />}
                    </div>

                    {/* Key Vault */}
                    <div className="bg-black/20 hover:bg-white/6 transition-colors flex items-center justify-center py-2.5">
                      {res?.keyvault
                        ? <Check className="w-4 h-4 text-emerald-300" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />}
                    </div>

                    {/* Evidence rate */}
                    <div className="px-3 py-2.5 bg-black/20 hover:bg-white/6 transition-colors flex items-center justify-end gap-2">
                      <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-linear-to-r ${evidenceBarGrad(control.evidenceRate)} rounded-full`}
                          style={{ width: `${control.evidenceRate}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold w-8 text-right ${evidenceTextColor(control.evidenceRate)}`}>
                        {control.evidenceRate}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Right panels ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl p-3 flex flex-col gap-3 min-h-0">

          {/* Compliance by resource type */}
          <div className="rounded-xl border border-white/10 bg-white/6 p-3">
            <p className="text-xs font-bold text-white">Compliance by Resource</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Score per Azure category</p>

            <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-300 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Compliant
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-300" /> At risk
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" /> Non-compliant
              </div>
            </div>

            <div className="mt-2 grid grid-cols-[28px_minmax(0,1fr)] gap-2">
              <div className="flex flex-col justify-between py-1 text-[10px] font-bold text-slate-300/70 tabular-nums">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg border border-white/10 bg-black/20"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 14px)',
                  }}
                />
                <div className="relative h-24 px-2 py-2">
                  <div className="h-full flex items-end justify-between gap-2">
                    {chartResources.map((r) => (
                      <div key={r.id} className="flex-1 flex flex-col items-center gap-0.5 min-w-0">
                        <div className="w-full flex items-end justify-center">
                          <div
                            className={`w-5 rounded-sm ${resourceBarColor(r.status)}`}
                            style={{ height: `${(r.complianceScore / 100) * 80}%` }}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-[9px] font-bold text-slate-300/80 truncate w-full text-center leading-tight">
                          {r.label}
                        </div>
                        <div className="text-[9px] font-black text-slate-200 tabular-nums">
                          {r.complianceScore}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence progress */}
          <div className="rounded-xl border border-white/10 bg-white/6 p-3 flex-1 min-h-0 flex flex-col">
            <p className="text-xs font-bold text-white">Evidence Progress</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Artifacts collected (7-week trend)</p>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Controls ≥ 80% evidenced</span>
                <span className="font-bold text-white">{verifiedControls} / {totalControls}</span>
              </div>
              <div className="mt-2 rounded-lg border border-white/10 bg-black/20 px-2 py-2">
                <svg viewBox="0 0 240 80" className="w-full h-16">
                  <defs>
                    <linearGradient id="progressBarGrad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(16,185,129,0.55)" />
                      <stop offset="1" stopColor="rgba(34,211,238,0.55)" />
                    </linearGradient>
                    <linearGradient id="progressLineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(16,185,129,0.85)" />
                      <stop offset="1" stopColor="rgba(34,211,238,0.85)" />
                    </linearGradient>
                  </defs>
                  <line x1="10" y1="68" x2="230" y2="68" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
                  {progressSeries.map((v, idx) => {
                    const h = Math.max(6, (v / 100) * 56)
                    const x = 12 + idx * 32
                    const y = 68 - h
                    return (
                      <g key={idx}>
                        <rect x={x} y={y} width="18" height={h} rx="4" fill="url(#progressBarGrad)" />
                        <rect x={x} y={y} width="18" height={h} rx="4" fill="rgba(255,255,255,0.06)" />
                      </g>
                    )
                  })}
                  <polyline
                    points={progressSeries
                      .map((v, idx) => {
                        const h = Math.max(6, (v / 100) * 56)
                        return `${12 + idx * 32 + 9},${68 - h}`
                      })
                      .join(' ')}
                    fill="none"
                    stroke="url(#progressLineGrad)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  {progressSeries.map((v, idx) => {
                    const h = Math.max(6, (v / 100) * 56)
                    const cx = 12 + idx * 32 + 9
                    const cy = 68 - h
                    return (
                      <g key={`dot-${idx}`}>
                        <circle cx={cx} cy={cy} r="4.5" fill="rgba(0,0,0,0.35)" />
                        <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.85)" />
                      </g>
                    )
                  })}
                </svg>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Open evidence requests</span>
                <span className="font-semibold text-slate-200">{openRequests}</span>
              </div>
            </div>

            <div className="mt-auto pt-3">
              <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-slate-300">
                Next review window: <span className="font-semibold text-white">48h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </GlassCard>
  )
}
