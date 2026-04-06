 'use client'

import { recentScans, type ScanEvent } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { CenteredEmptyState } from '@/components/ui/CenteredEmptyState'
import { CheckCircle2, Calendar, LoaderCircle, XCircle, MoreHorizontal, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const statusConfig = {
  completed: {
    badge: 'bg-teal-600 text-white border-teal-500/50',
    label: 'Completed',
    icon: CheckCircle2,
    iconWrap: 'text-teal-300',
  },
  scheduled: {
    badge: 'bg-amber-500 text-slate-950 border-amber-300/60',
    label: 'Scheduled',
    icon: Calendar,
    iconWrap: 'text-amber-300',
  },
  'in-progress': {
    badge: 'bg-blue-600 text-white border-blue-500/50',
    label: 'Running',
    icon: LoaderCircle,
    iconWrap: 'text-blue-300',
  },
  failed: {
    badge: 'bg-red-600 text-white border-red-500/50',
    label: 'Failed',
    icon: XCircle,
    iconWrap: 'text-red-300',
  },
}

export type RecentScansVariant = 'demo' | 'new'

export function RecentScans({
  variant = 'demo',
}: {
  variant?: RecentScansVariant
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
    <GlassCard className="flex flex-col gap-3 min-h-0 h-full">
      <div className="flex items-center justify-between relative mb-0.5" ref={menuRef}>
        <h2 className="text-lg font-bold text-white">Recent Automated Scans</h2>
        {!isNewAccount && (
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="p-1.5 hover:bg-white/8 rounded-lg transition-colors"
            aria-label="Scans menu"
            title="Scans menu"
          >
            <MoreHorizontal className="w-5 h-5 text-slate-300" />
          </button>
        )}

        {menuOpen && !isNewAccount && (
          <div
            className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200/60 bg-slate-50/95 text-slate-900 shadow-2xl shadow-black/20 backdrop-blur-xl overflow-hidden z-20"
            role="menu"
            aria-label="Recent scans menu"
          >
            <button
              type="button"
              className="w-full px-3.5 py-2.5 text-sm font-semibold flex items-center justify-between hover:bg-slate-200/60 transition-colors"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false)
                router.push('/scans')
              }}
            >
              View full list
              <ArrowUpRight className="w-4 h-4 text-slate-600" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 flex">
        <RecentScansContent scans={isNewAccount ? [] : undefined} />
      </div>
    </GlassCard>
  )
}

export function RecentScansContent({
  maxHeightClassName = 'max-h-80',
  className = '',
  scans,
}: {
  maxHeightClassName?: string
  className?: string
  scans?: ScanEvent[]
}) {
  const resolvedScans = scans ?? recentScans

  if (resolvedScans.length === 0) {
    return (
      <CenteredEmptyState
        title="No scans yet"
        description="Run your first scan to start tracking compliance changes over time."
        ctaLabel="Go to Configs"
        ctaHref="/?tab=settings"
      />
    )
  }

  return (
    <div className="flex-1 min-h-0 flex">
      <ul
        className={`flex-1 min-h-0 space-y-3 overflow-y-auto pr-1 -mr-1 ${maxHeightClassName} ${className}`}
      >
        {resolvedScans.map((scan) => {
          const cfg = statusConfig[scan.status]
          const Icon = cfg.icon

          return (
            <li key={scan.id} className="group relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/35 border border-white/10 shadow-lg shadow-black/40 transition-colors group-hover:bg-black/45 group-hover:border-white/15" />

              <div className="relative flex items-start gap-3 py-3 px-3">
                <div
                  className={`shrink-0 flex items-start justify-center pt-0.5 ${cfg.iconWrap}`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white leading-snug">{scan.title}</p>
                  {scan.resourceCount && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {scan.resourceCount} resources
                    </p>
                  )}
                </div>

                <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md border whitespace-nowrap ${cfg.badge}`}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {scan.timestamp}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
