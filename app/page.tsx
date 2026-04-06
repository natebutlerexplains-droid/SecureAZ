'use client'

import { useState, useRef, useEffect } from 'react'
import { Header, type AppTab } from '@/components/layout/Header'
import { useRouter } from 'next/navigation'
import { SOC2ReadinessWidget } from '@/components/dashboard/SOC2ReadinessWidget'
import { AIFindingsWidget } from '@/components/dashboard/AIFindingsWidget'
import { RecentScans } from '@/components/dashboard/RecentScans'
import { ComplianceMatrixVisual } from '@/components/dashboard/ComplianceMatrixVisual'
import { AzureResourceMap } from '@/components/dashboard/AzureResourceMap'
import { ReportsPanel } from '@/components/dashboard/reports/ReportsPanel'

const TAB_ORDER: AppTab[] = ['dashboard', 'reports', 'settings']

export default function App() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard')
  const tabIndex = TAB_ORDER.indexOf(activeTab)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab === 'dashboard' || tab === 'reports' || tab === 'settings') {
      setActiveTab(tab)
    }
  }, [])

  // Swipe gesture tracking
  const touchStartX = useRef(0)

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 60 && tabIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[tabIndex + 1])
    } else if (delta < -60 && tabIndex > 0) {
      setActiveTab(TAB_ORDER[tabIndex - 1])
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab)
        router.replace(`/?tab=${tab}`)
      }} />

      {/* Swipeable panel container */}
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Single panel with pop-in */}
        {activeTab === 'dashboard' && (
          <div className="h-full overflow-auto p-3 relative pop-in">
            <div className="flex flex-col gap-4 max-w-400 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)_minmax(0,1fr)] gap-3">
                <SOC2ReadinessWidget variant="new" />
                <AIFindingsWidget variant="new" />
                <RecentScans variant="new" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <ComplianceMatrixVisual variant="new" />
                <AzureResourceMap variant="new" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="h-full overflow-auto p-3 relative pop-in">
            <ReportsPanel />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="h-full overflow-auto p-3 relative pop-in">
            <div className="flex flex-col gap-4 max-w-400 mx-auto">
              <h1 className="text-2xl font-black text-white tracking-tight">Configs</h1>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 text-center text-slate-400 text-sm">
                Configs coming soon
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
