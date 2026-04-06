'use client'

import { useState } from 'react'
import { Search, Bell } from 'lucide-react'

interface TopHeaderProps {
  title?: string
}

export function TopHeader({ title = 'Dashboard' }: TopHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="h-16 bg-surface-1/80 backdrop-blur-md border-b border-white/5 flex items-center px-6 gap-4 shrink-0">
      {/* Title */}
      <h2 className="text-lg font-semibold text-white">{title}</h2>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search findings, controls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-colors"
        />
      </div>

      {/* Notification bell */}
      <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
        <Bell className="w-5 h-5 text-zinc-400 hover:text-white" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* User avatar */}
      <button className="w-10 h-10 rounded-full bg-azure-500/20 flex items-center justify-center text-azure-400 font-bold text-sm hover:bg-azure-500/30 transition-colors">
        U
      </button>
    </header>
  )
}
