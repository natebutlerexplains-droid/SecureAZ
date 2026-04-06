'use client'

import { Bell, MessageCircle } from 'lucide-react'

export type AppTab = 'dashboard' | 'reports' | 'settings'

const tabs: { id: AppTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports',   label: 'Reports'   },
  { id: 'settings',  label: 'Settings'  },
]

function SecurazLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="SECURAZ"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="securaz-grad" x1="2" y1="2" x2="30" y2="30">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.55" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5c4.5 3.1 8.6 3.1 11 3.3v9.8c0 7.4-5.2 11.1-11 12.9C10.2 27.7 5 24 5 16.6V6.8c2.4-.2 6.5-.2 11-3.3Z"
        stroke="url(#securaz-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 16.2l3.1 3.2 6.8-7.2"
        stroke="white"
        strokeOpacity="0.92"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface HeaderProps {
  activeTab: AppTab
  onTabChange: (tab: AppTab) => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="relative h-12 bg-linear-to-r from-[#071b2d] via-[#06263f] to-[#0a1120] border-b border-white/10 flex items-center pl-5 pr-5 gap-8 shrink-0 shadow-lg shadow-black/40">
      {/* Logo */}
      <div className="z-10 flex items-center gap-3 min-w-fit">
        <SecurazLogo className="w-8 h-8 drop-shadow-sm" />
        <span className="text-sm font-black text-white tracking-tight">SECURAZ</span>
      </div>

      {/* Center tab nav */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-0.5 bg-white/10 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-5 py-1 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/55 hover:text-white/85 hover:bg-white/8'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right actions */}
      <div className="z-10 flex items-center gap-2 ml-auto">
        <button className="relative p-1.5 hover:bg-white/15 rounded-lg transition-colors group">
          <Bell className="w-4 h-4 text-cyan-50 group-hover:text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-500/50" />
        </button>

        <button
          type="button"
          className="p-1.5 hover:bg-white/15 rounded-lg transition-colors group"
          aria-label="Live help"
          title="Live help"
        >
          <MessageCircle className="w-4 h-4 text-cyan-50 group-hover:text-white" />
        </button>

        <div className="ml-1 w-px h-5 bg-white/15" aria-hidden="true" />

        <button
          type="button"
          className="flex items-center justify-center w-7 h-7 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-white text-[11px] font-black hover:opacity-90 transition-opacity shrink-0"
          aria-label="Account"
          title="Account"
        >
          NB
        </button>
      </div>
    </header>
  )
}
