'use client'

import { useState, useRef } from 'react'
import { Header, type AppTab } from '@/components/layout/Header'
import { SOC2ReadinessWidget } from '@/components/dashboard/SOC2ReadinessWidget'
import { AIFindingsWidget } from '@/components/dashboard/AIFindingsWidget'
import { RecentScans } from '@/components/dashboard/RecentScans'
import { ComplianceMatrixVisual } from '@/components/dashboard/ComplianceMatrixVisual'
import { AzureResourceMap } from '@/components/dashboard/AzureResourceMap'
import { ReportsPanel } from '@/components/dashboard/reports/ReportsPanel'

const TAB_ORDER: AppTab[] = ['dashboard', 'reports', 'settings']

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard')
  const tabIndex = TAB_ORDER.indexOf(activeTab)

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
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Swipeable panel container */}
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider — 3× wide, slides left/right by 33.333% per tab */}
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{
            width: '300%',
            transform: `translateX(-${tabIndex * 33.333}%)`,
          }}
        >
          {/* ── Dashboard ── */}
          <div className="h-full overflow-auto p-3 relative" style={{ width: '33.333%' }}>
            <div className="flex flex-col gap-4 max-w-400 mx-auto">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Azure Environment Audit — SOC 2 Readiness
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)_minmax(0,1fr)] gap-3">
                <SOC2ReadinessWidget />
                <AIFindingsWidget />
                <RecentScans />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <ComplianceMatrixVisual />
                <AzureResourceMap />
              </div>
            </div>
          </div>

          {/* ── Reports ── */}
          <div className="h-full overflow-auto p-3 relative" style={{ width: '33.333%' }}>
            <ReportsPanel />
          </div>

          {/* ── Settings ── */}
          <div className="h-full overflow-auto p-3 relative" style={{ width: '33.333%' }}>
            <div className="flex flex-col gap-4 max-w-400 mx-auto">
              <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
              <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl p-8 text-center text-slate-400 text-sm">
                Settings coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
