'use client'

import { SOC2DonutChart } from './SOC2DonutChart'
import { GlassCard } from '@/components/ui/GlassCard'

export function SOC2ReadinessWidget() {
  return (
    <GlassCard className="flex flex-col gap-3 select-none [-webkit-tap-highlight-color:transparent] outline-none focus-within:outline-none [&_*]:outline-none [&_*:focus]:outline-none [&_*:focus-visible]:outline-none">
      <button
        type="button"
        className="text-left text-lg font-bold text-white cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none"
      >
        Overall SOC 2 Readiness Score
      </button>
      <SOC2DonutChart />
    </GlassCard>
  )
}
