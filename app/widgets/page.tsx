import { Header } from '@/components/layout/Header'
import { SOC2ReadinessWidget } from '@/components/dashboard/SOC2ReadinessWidget'

export default function WidgetShowcase() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header activeTab="dashboard" />

      <main className="flex-1 overflow-auto flex flex-col items-center justify-center p-12 relative">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white tracking-tight">SOC 2 Readiness</h1>
          <p className="text-sm text-slate-400 mt-1">Overall compliance score — 4D depth render</p>
        </div>

        <div className="w-full max-w-lg">
          <SOC2ReadinessWidget />
        </div>
      </main>
    </div>
  )
}
