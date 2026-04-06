'use client'

import { azureResources, type AzureResource } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { CenteredEmptyState } from '@/components/ui/CenteredEmptyState'
import { MoreHorizontal, ArrowUpRight } from 'lucide-react'

// ─── Status → color mapping ───────────────────────────────────────────────────

const statusColor: Record<AzureResource['status'], string> = {
  compliant:     '#34d399', // emerald-400
  'at-risk':     '#fcd34d', // amber-300
  'non-compliant': '#f87171', // red-400
}

// ─── Fixed positions for each resource node on the 600×520 viewBox ───────────

const nodePositions: Record<string, { x: number; y: number }> = {
  identity:  { x: 460, y: 120 },
  storage:   { x: 140, y: 340 },
  keyvault:  { x: 420, y: 450 },
  network:   { x: 490, y: 340 },
  compute:   { x: 120, y: 120 },
  logging:   { x: 220, y: 450 },
}

export type AzureResourceMapVariant = 'demo' | 'new'

export function AzureResourceMap({
  variant = 'demo',
}: {
  variant?: AzureResourceMapVariant
}) {
  const isNewAccount = variant === 'new'

  if (isNewAccount) {
    return (
      <GlassCard className="min-h-80 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Azure Resource Map</h2>
        </div>

        <div className="flex-1 min-h-0 rounded-2xl p-2 overflow-hidden flex">
          <CenteredEmptyState
            title="No resources mapped yet"
            description="Configure your environment to discover Azure resources and build your map."
            ctaLabel="Go to Configs"
            ctaHref="/?tab=settings"
          />
        </div>
      </GlassCard>
    )
  }

  const center = { x: 300, y: 250, r: 46 }

  // Merge azureResources with their positions
  const nodes = azureResources.map((r) => ({
    ...r,
    ...(nodePositions[r.id] ?? { x: 300, y: 250 }),
    color: statusColor[r.status],
  }))

  return (
    <GlassCard className="min-h-80 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Azure Resource Map</h2>
        <button
          type="button"
          className="p-1.5 hover:bg-white/8 rounded-lg transition-colors"
          aria-label="Resource map menu"
        >
          <MoreHorizontal className="w-5 h-5 text-slate-300" />
        </button>
      </div>

      <div className="flex-1 min-h-0 rounded-2xl bg-black/15 backdrop-blur-xl p-2 overflow-hidden">
        <div className="relative w-full aspect-600/520">
          {/* Background glows */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(52,211,153,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(252,211,77,0.12), transparent 45%), radial-gradient(circle at 60% 30%, rgba(248,113,113,0.10), transparent 45%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 520"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Per-node arrow markers */}
              {nodes.map((n) => (
                <marker
                  key={`marker-${n.id}`}
                  id={`arrow-${n.id}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={n.color} />
                </marker>
              ))}
            </defs>

            {/* Hub → node connection lines */}
            {nodes.map((n) => {
              const dx = n.x - center.x
              const dy = n.y - center.y
              const dist = Math.max(1, Math.hypot(dx, dy))
              const ux = dx / dist
              const uy = dy / dist
              const startX = center.x + ux * center.r
              const startY = center.y + uy * center.r
              // Quadratic bezier: single control point offset perpendicular to
              // the connection direction — eliminates S-curves regardless of angle
              const midX = (startX + n.x) / 2
              const midY = (startY + n.y) / 2
              const cpX = Math.round(midX + (-uy) * 35)
              const cpY = Math.round(midY + ux * 35)
              return (
                <path
                  key={`line-${n.id}`}
                  d={`M${startX} ${startY} Q ${cpX} ${cpY}, ${n.x} ${n.y}`}
                  stroke={n.color}
                  strokeWidth="2"
                  fill="none"
                  opacity="0.55"
                  markerEnd={`url(#arrow-${n.id})`}
                />
              )
            })}

            {/* Central hub */}
            <circle
              cx={center.x}
              cy={center.y}
              r={center.r}
              fill="rgba(7,27,45,0.92)"
              filter="url(#nodeGlow)"
            />
            <circle
              cx={center.x}
              cy={center.y}
              r={center.r}
              fill="none"
              stroke="rgba(0,120,212,0.55)"
              strokeWidth="2.25"
            />
            {/* Inline Azure hub label — no external image required */}
            <text
              x={center.x}
              y={center.y - 6}
              textAnchor="middle"
              fontSize="15"
              fontWeight="900"
              fill="#0078D4"
              fontFamily="system-ui, sans-serif"
            >
              AZ
            </text>
            <text
              x={center.x}
              y={center.y + 11}
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fill="rgba(255,255,255,0.50)"
              fontFamily="system-ui, sans-serif"
              letterSpacing="2"
            >
              AZURE
            </text>

            {/* Resource nodes */}
            {nodes.map((n) => (
              <g key={n.id}>
                {/* Node circle */}
                <circle cx={n.x} cy={n.y} r="13" fill={n.color} fillOpacity="0.85" filter="url(#nodeGlow)" />
                <circle cx={n.x} cy={n.y} r="13" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1" />

                {/* Open-findings badge */}
                {n.openFindings > 0 && (
                  <g>
                    <circle cx={n.x + 10} cy={n.y - 10} r="7" fill="#ef4444" fillOpacity="0.92" />
                    <text
                      x={n.x + 10}
                      y={n.y - 6}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="900"
                      fill="white"
                      fontFamily="system-ui, sans-serif"
                    >
                      {n.openFindings}
                    </text>
                  </g>
                )}

                {/* Label */}
                <text
                  x={n.x}
                  y={n.y + 30}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="rgba(226,232,240,0.92)"
                  stroke="rgba(0,0,0,0.55)"
                  strokeWidth="3"
                  paintOrder="stroke"
                  fontFamily="system-ui, sans-serif"
                >
                  {n.label}
                </text>

                {/* Compliance score */}
                <text
                  x={n.x}
                  y={n.y + 44}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill={n.color}
                  stroke="rgba(0,0,0,0.55)"
                  strokeWidth="2"
                  paintOrder="stroke"
                  fontFamily="system-ui, sans-serif"
                  opacity="0.9"
                >
                  {n.complianceScore}%
                </text>
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-5 px-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Compliant
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-300" /> At risk
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" /> Non-compliant
            </div>
          </div>

          {/* Open map button */}
          <div className="absolute right-3 bottom-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/6 text-[11px] font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Open map <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
