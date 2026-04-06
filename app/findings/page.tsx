import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'
import { AIFindingsContent } from '@/components/dashboard/AIFindingsContent'

export default function FindingsPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header activeTab="dashboard" onTabChange={() => {}} />

      <main className="flex-1 overflow-auto p-3 relative bg-transparent">
        <div className="relative flex flex-col gap-5 max-w-[1600px] mx-auto">
          <GlassCard className="flex flex-col gap-3 min-h-0">
            <h1 className="text-2xl font-black text-white tracking-tight">
              AI Findings & Recommendations
            </h1>
            <AIFindingsContent maxHeightClassName="max-h-[calc(100vh-20rem)]" />
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
