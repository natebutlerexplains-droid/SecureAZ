'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { soc2SecondaryMetrics } from '@/lib/mock-data'

function getTrafficColor(value: number) {
  if (value >= 80) return { hex: '#22c55e', className: 'text-green-400' }
  if (value >= 60) return { hex: '#eab308', className: 'text-yellow-400' }
  return { hex: '#ef4444', className: 'text-red-400' }
}

export function SOC2DonutChart() {
  const score = Math.round(
    soc2SecondaryMetrics.reduce((sum, m) => sum + m.value, 0) /
      Math.max(1, soc2SecondaryMetrics.length)
  )
  const scoreColor = getTrafficColor(score)

  // 60° gap at the bottom; arcs span 300°
  const gapDegrees = 60
  const startAngle = -90 - gapDegrees / 2
  const endAngle = startAngle - (360 - gapDegrees)

  const rings = soc2SecondaryMetrics.map((metric, index) => {
    const outerRadius = 112 - index * 14
    const innerRadius = outerRadius - 10
    const traffic = getTrafficColor(metric.value)
    return {
      metric,
      innerRadius,
      outerRadius,
      traffic,
      // Two cells: filled portion + faint track for the remainder
      data: [
        { name: 'filled', value: metric.value },
        { name: 'track',  value: 100 - metric.value },
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
                key={ring.metric.label}
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
                {score}%
              </p>
              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                SOC 2 Score
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Per-category scores */}
      <div className="grid grid-cols-3 gap-4">
        {soc2SecondaryMetrics.map((metric) => {
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
