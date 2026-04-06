'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { Tabs } from '@/components/ui/Tabs'
import { SOC2DonutChart } from './SOC2DonutChart'
import { AIFindingsContent } from './AIFindingsContent'

export function SOC2TabbedWidget() {
  return (
    <GlassCard className="col-span-1 lg:col-span-2">
      <Tabs
        tabs={[
          {
            id: 'readiness',
            label: 'SOC 2 Readiness Score',
            content: <SOC2DonutChart />,
          },
          {
            id: 'findings',
            label: 'AI Compliance Gaps',
            content: <AIFindingsContent />,
          },
        ]}
        defaultTab="readiness"
      />
    </GlassCard>
  )
}
