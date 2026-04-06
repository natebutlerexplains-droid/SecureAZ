import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'
import { RecentScansContent } from '@/components/dashboard/RecentScans'

export default function ScansPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header activeTab="dashboard" onTabChange={() => {}} />

      <main className="flex-1 overflow-auto p-3 relative bg-transparent">
        <div className="relative flex flex-col gap-5 max-w-[1600px] mx-auto">
          <GlassCard className="flex flex-col gap-3 min-h-0">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Recent Automated Scans
            </h1>
            <RecentScansContent className="max-h-[calc(100vh-20rem)]" />
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
