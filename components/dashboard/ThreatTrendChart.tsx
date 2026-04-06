'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { threatTrendData } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'

// Only show every other label to avoid crowding
const tickFormatter = (value: string, index: number) =>
  index % 2 === 0 ? value : ''

export function ThreatTrendChart() {
  return (
    <GlassCard className="col-span-1">
      <div className="flex flex-col gap-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Threat Trends</h2>
          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span className="text-slate-300 font-medium">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
              <span className="text-slate-300 font-medium">Resolved</span>
            </div>
          </div>
        </div>

        {/* Chart container */}
        <div className="flex-1 -mx-8 -mb-8 px-8 pb-8">
          <div className="h-64">
            <ResponsiveContainer width="100%" height={256}>
              <AreaChart
                data={threatTrendData}
                margin={{ top: 8, right: 16, left: -16, bottom: 8 }}
              >
                <defs>
                  {/* Premium gradient for threats */}
                  <linearGradient
                    id="gradThreats"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.02} />
                  </linearGradient>

                  {/* Premium gradient for resolved */}
                  <linearGradient
                    id="gradResolved"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Minimal, clean gridlines */}
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  stroke="rgba(255,255,255,0.05)"
                  strokeDasharray="0"
                />

                {/* Clean axis styling */}
                <XAxis
                  dataKey="date"
                  tickFormatter={tickFormatter}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                  dx={-8}
                />

                {/* Premium tooltip */}
	                <Tooltip
	                  cursor={{
	                    stroke: 'rgba(255,255,255,0.15)',
	                    strokeWidth: 2,
	                  }}
                  contentStyle={{
                    background: 'rgba(15,23,42,0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    fontWeight: 500,
	                    padding: '12px 16px',
	                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
	                  }}
	                  formatter={(value, name) => [value ?? '—', String(name)]}
	                />

                {/* Active threats - prominent */}
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="#60a5fa"
                  strokeWidth={2.5}
                  fill="url(#gradThreats)"
                  name="Active Threats"
                  dot={false}
                  activeDot={{ r: 5, fill: '#60a5fa', strokeWidth: 0 }}
                  isAnimationActive={true}
                />

                {/* Resolved - secondary */}
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#14b8a6"
                  strokeWidth={1.5}
                  fill="url(#gradResolved)"
                  name="Resolved"
                  dot={false}
                  activeDot={{ r: 5, fill: '#14b8a6', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
