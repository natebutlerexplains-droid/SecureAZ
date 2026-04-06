'use client'

import { SOC2DonutChart } from './SOC2DonutChart'
import { GlassCard } from '@/components/ui/GlassCard'
import { useRouter } from 'next/navigation'

export type SOC2ReadinessWidgetVariant = 'demo' | 'new'

export function SOC2ReadinessWidget({
  variant = 'demo',
}: {
  variant?: SOC2ReadinessWidgetVariant
}) {
  const router = useRouter()
  const isNewAccount = variant === 'new'

  return (
    <GlassCard className="flex flex-col gap-3 select-none [-webkit-tap-highlight-color:transparent] outline-none focus-within:outline-none [&_*]:outline-none [&_*:focus]:outline-none [&_*:focus-visible]:outline-none">
      <button
        type="button"
        className="text-left text-lg font-bold text-white cursor-pointer select-none outline-none focus:outline-none focus-visible:outline-none"
      >
        Overall SOC 2 Readiness Score
      </button>
      <SOC2DonutChart metrics={isNewAccount ? [] : undefined} />

      {isNewAccount && (
        <div className="pt-1">
          <p className="text-xs text-slate-400 leading-relaxed">
            Run your first scan to calculate your readiness score.
          </p>
          <button
            type="button"
            onClick={() => router.push('/?tab=settings')}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-white text-sm font-semibold py-2 transition-colors"
          >
            Go to Configs
          </button>
        </div>
      )}
    </GlassCard>
  )
}
