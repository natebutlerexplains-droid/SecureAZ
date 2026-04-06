'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { soc2SecondaryMetrics, type SecondaryMetric } from '@/lib/mock-data'

function getTrafficColor(value: number) {
  if (value >= 80) return { hex: '#22c55e', className: 'text-green-400' }
  if (value >= 60) return { hex: '#eab308', className: 'text-yellow-400' }
  return { hex: '#ef4444', className: 'text-red-400' }
}

const EMPTY_CATEGORY_LABELS = ['Security', 'Availability', 'Confidentiality'] as const

export function SOC2DonutChart({
  metrics,
}: {
  metrics?: SecondaryMetric[]
}) {
  const isEmpty = metrics !== undefined && metrics.length === 0
  const resolvedMetrics = metrics ?? soc2SecondaryMetrics

  const score = isEmpty
    ? null
    : Math.round(
        resolvedMetrics.reduce((sum, m) => sum + m.value, 0) /
          Math.max(1, resolvedMetrics.length)
      )

  const scoreColor = score === null
    ? { hex: '#94a3b8', className: 'text-slate-400' }
    : getTrafficColor(score)

  // 60° gap at the bottom; arcs span 300°
  const gapDegrees = 60
  const startAngle = -90 - gapDegrees / 2
  const endAngle = startAngle - (360 - gapDegrees)

  const rings = isEmpty
    ? [
        {
          key: 'placeholder',
          innerRadius: 92,
          outerRadius: 112,
          traffic: { hex: 'rgba(148,163,184,0.28)' },
          data: [
            { name: 'filled', value: 0 },
            { name: 'track', value: 100 },
          ],
        },
      ]
    : resolvedMetrics.map((metric, index) => {
        const outerRadius = 112 - index * 14
        const innerRadius = outerRadius - 10
        const traffic = getTrafficColor(metric.value)
        return {
          key: metric.label,
          innerRadius,
          outerRadius,
          traffic,
          // Two cells: filled portion + faint track for the remainder
          data: [
            { name: 'filled', value: metric.value },
            { name: 'track', value: 100 - metric.value },
          ],
        }
      })

  return (
    <div className="flex flex-col gap-6">
      {/* Donut chart */}
      <div className="relative h-60 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            {rings.map((ring) => (
              <Pie
                key={ring.key}
                data={ring.data}
                cx="50%"
                cy="50%"
                innerRadius={ring.innerRadius}
                outerRadius={ring.outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                dataKey="value"
                strokeWidth={0}
                isAnimationActive={false}
              >
                {/* Filled arc — proportional to metric.value */}
                <Cell fill={ring.traffic.hex} fillOpacity={0.82} />
                {/* Track arc — remainder of the 300° sweep */}
                <Cell fill="rgba(255,255,255,0.08)" />
              </Pie>
            ))}
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-full -m-8"
              style={{ background: `${scoreColor.hex}33` }}
            />
            <div className="relative text-center">
              <p className="text-5xl font-semibold leading-none text-foreground">
                {score === null ? '—' : `${score}%`}
              </p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-tight">
                <span className="block">SOC 2</span>
                <span className="block">Score</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Per-category scores */}
      <div className="grid grid-cols-3 gap-4">
        {isEmpty
          ? EMPTY_CATEGORY_LABELS.map((label) => (
              <div key={label} className="flex flex-col items-center leading-tight gap-0.5">
                <span className="text-xs font-bold text-foreground">{label}</span>
                <span className="text-lg font-black text-slate-400">—</span>
              </div>
            ))
          : resolvedMetrics.map((metric) => {
              const tc = getTrafficColor(metric.value)
              return (
                <div key={metric.label} className="flex flex-col items-center leading-tight gap-0.5">
                  <span className="text-xs font-bold text-foreground">{metric.label}</span>
                  <span className={`text-lg font-black ${tc.className}`}>
                    {metric.value}%
                  </span>
                </div>
              )
            })}
      </div>
    </div>
  )
}
