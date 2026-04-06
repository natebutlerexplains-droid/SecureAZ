import { Header } from '@/components/layout/Header'
import { GlassCard } from '@/components/ui/GlassCard'

export default function ConfigsPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header activeTab="settings" />

      <main className="flex-1 overflow-auto p-3 relative bg-transparent">
        <div className="relative flex flex-col gap-5 max-w-[1600px] mx-auto">
          <GlassCard className="flex flex-col gap-3 min-h-0">
            <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 text-center text-slate-400 text-sm">
              Configs coming soon
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
