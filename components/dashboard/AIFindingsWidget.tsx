 'use client'

import { GlassCard } from '@/components/ui/GlassCard'
import { AIFindingsContent } from './AIFindingsContent'
import { MoreHorizontal, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export type AIFindingsWidgetVariant = 'demo' | 'new'

export function AIFindingsWidget({
  variant = 'demo',
}: {
  variant?: AIFindingsWidgetVariant
}) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isNewAccount = variant === 'new'

  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!menuRef.current) return
      if (menuRef.current.contains(target)) return
      setMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <GlassCard className="flex flex-col gap-3 min-h-80 h-full bg-slate-900/25 backdrop-blur-3xl">
      <div className="flex items-center justify-between relative mb-0.5" ref={menuRef}>
        <h2 className="text-lg font-bold text-white">Findings</h2>
        {!isNewAccount && (
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="p-1.5 hover:bg-white/8 rounded-lg transition-colors"
            aria-label="View all findings"
            title="View all findings"
          >
            <MoreHorizontal className="w-5 h-5 text-slate-300" />
          </button>
        )}

        {menuOpen && !isNewAccount && (
          <div
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200/60 bg-slate-50/95 text-slate-900 shadow-2xl shadow-black/20 backdrop-blur-xl overflow-hidden z-20"
            role="menu"
            aria-label="AI findings menu"
          >
            <button
              type="button"
              className="w-full px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-slate-200/60 transition-colors"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                router.push('/findings')
              }}
            >
              View full list
              <ArrowUpRight className="w-4 h-4 text-slate-600" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <AIFindingsContent findings={isNewAccount ? [] : undefined} />
      </div>
    </GlassCard>
  )
}
