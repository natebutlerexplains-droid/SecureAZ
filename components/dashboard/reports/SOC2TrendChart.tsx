'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { MoreHorizontal, Download } from 'lucide-react'

const allTrendData = [
  { week: 'Jan 13', score: 42 },
  { week: 'Jan 20', score: 45 },
  { week: 'Jan 27', score: 48 },
  { week: 'Feb 03', score: 51 },
  { week: 'Feb 10', score: 58 },
  { week: 'Feb 17', score: 61 },
  { week: 'Feb 24', score: 63 },
  { week: 'Mar 03', score: 65 },
  { week: 'Mar 10', score: 67 },
  { week: 'Mar 17', score: 70 },
  { week: 'Mar 24', score: 72 },
  { week: 'Apr 06', score: 74 },
]

type TimeRange = '4w' | '8w' | '12w'

function getTrendData(range: TimeRange) {
  const weeks = range === '4w' ? 4 : range === '8w' ? 8 : 12
  return allTrendData.slice(-weeks)
}

function getChange(range: TimeRange) {
  const data = getTrendData(range)
  if (data.length < 2) return { change: 0, percent: '0%' }
  const start = data[0].score
  const end = data[data.length - 1].score
  const change = end - start
  const percent = ((change / start) * 100).toFixed(1)
  return { change, percent: `${change >= 0 ? '+' : ''}${percent}%` }
}

const W = 460, H = 120, PAD_X = 8, PAD_Y = 10
const MIN_SCORE = 50, MAX_SCORE = 100

export function SOC2TrendChart() {
  const [range, setRange] = useState<TimeRange>('8w')
  const trendData = getTrendData(range)
  const n = trendData.length

  function toX(i: number) {
    return PAD_X + (i / (n - 1)) * (W - PAD_X * 2)
  }
  function toY(v: number) {
    return PAD_Y + (1 - (v - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * (H - PAD_Y * 2)
  }
  const { percent: changePercent } = getChange(range)
  const currentScore = trendData[trendData.length - 1].score
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const linePoints = trendData.map((d, i) => `${toX(i)},${toY(d.score)}`).join(' ')
  const areaPath =
    `M${toX(0)},${toY(trendData[0].score)} ` +
    trendData.slice(1).map((d, i) => `L${toX(i + 1)},${toY(d.score)}`).join(' ') +
    ` L${toX(n - 1)},${H - PAD_Y} L${toX(0)},${H - PAD_Y} Z`

  // Safe index access for x-axis labels (first, middle, last)
  const labelIndices = [0, Math.floor((n - 1) / 2), n - 1].filter((i, idx, arr) => idx === 0 || i !== arr[idx - 1])

  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">SOC 2 Score Trend</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{range === '4w' ? '4-week' : range === '8w' ? '8-week' : '12-week'} readiness progression</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-teal-300">{currentScore}%</span>
            <span className={`text-[11px] font-semibold ${changePercent.startsWith('+') ? 'text-teal-300' : 'text-red-300'}`}>
              {changePercent}
            </span>
          </div>
          <button type="button" className="p-1.5 hover:bg-white/8 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Time range filter */}
      <div className="flex items-center gap-2 bg-white/8 rounded-lg p-1">
        {(['4w', '8w', '12w'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              range === r
                ? 'bg-white/15 text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/8'
            }`}
          >
            {r === '4w' ? '4W' : r === '8w' ? '8W' : '12W'}
          </button>
        ))}
        <button type="button" className="ml-auto p-1.5 hover:bg-white/8 rounded-lg transition-colors text-slate-400 hover:text-white">
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/15 backdrop-blur-xl p-3 relative">
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full absolute inset-0" style={{ height: 140 }}>
          <defs>
            <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(45,212,191,0.35)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0.02)" />
            </linearGradient>
            <linearGradient id="trendLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(45,212,191,0.70)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.90)" />
            </linearGradient>
          </defs>

          {[60, 70, 80].map((v) => (
            <line
              key={v}
              x1={PAD_X} y1={toY(v)}
              x2={W - PAD_X} y2={toY(v)}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          ))}

          <path d={areaPath} fill="url(#trendAreaGrad)" />

          <polyline
            points={linePoints}
            fill="none"
            stroke="url(#trendLineGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {trendData.map((d, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
              <circle cx={toX(i)} cy={toY(d.score)} r={hoveredIndex === i ? 6 : 4.5} fill={hoveredIndex === i ? 'rgba(34,211,238,0.6)' : 'rgba(0,0,0,0.4)'} />
              <circle cx={toX(i)} cy={toY(d.score)} r={hoveredIndex === i ? 4 : 3} fill="rgba(255,255,255,0.85)" />
            </g>
          ))}

          {labelIndices.map((i) => (
            <text
              key={i}
              x={toX(i)}
              y={H + 16}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="rgba(148,163,184,0.70)"
              fontFamily="system-ui, sans-serif"
            >
              {trendData[i].week}
            </text>
          ))}

          {[60, 74].map((v) => (
            <text
              key={v}
              x={PAD_X - 2}
              y={toY(v) + 4}
              textAnchor="end"
              fontSize="9"
              fontWeight="700"
              fill={v === 74 ? 'rgba(45,212,191,0.85)' : 'rgba(148,163,184,0.55)'}
              fontFamily="system-ui, sans-serif"
            >
              {v}%
            </text>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Security', value: '68%', color: 'text-teal-300' },
          { label: 'Availability', value: '74%', color: 'text-cyan-300' },
          { label: 'Confidentiality', value: '81%', color: 'text-azure-300' },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/10 bg-white/6 p-2.5 text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{m.label}</p>
            <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}
