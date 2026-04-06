'use client'

import { Bell, MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export type AppTab = 'dashboard' | 'reports' | 'settings'

const tabs: { id: AppTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'reports',   label: 'Reports'   },
  { id: 'settings',  label: 'Configs'   },
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
  onTabChange?: (tab: AppTab) => void
}

type NotificationItem = {
  id: string
  title: string
  message: string
  timestamp: string
  ctaLabel?: string
  ctaHref?: string
}

const NOTIFS_KEY = 'securaz.notifications.v1'
const NOTIFS_READ_KEY = 'securaz.notificationsRead.v1'

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [unread, setUnread] = useState(true)
  const [supportOpen, setSupportOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(NOTIFS_KEY)
      const parsed: NotificationItem[] | null = raw ? JSON.parse(raw) : null

      const seeded: NotificationItem[] =
        parsed && Array.isArray(parsed) && parsed.length > 0
          ? parsed
          : [
              {
                id: 'welcome',
                title: 'Welcome to Securaz',
                message:
                  'Start by reviewing Configs and running your first scan to generate readiness and recommendations.',
                timestamp: 'Just now',
                ctaLabel: 'Go to Configs',
                ctaHref: '/?tab=settings',
              },
            ]

      setNotifications(seeded)
      window.localStorage.setItem(NOTIFS_KEY, JSON.stringify(seeded))

      const read = window.localStorage.getItem(NOTIFS_READ_KEY) === 'true'
      setUnread(!read)
    } catch {
      setNotifications([
        {
          id: 'welcome',
          title: 'Welcome to Securaz',
          message:
            'Start by reviewing Configs and running your first scan to generate readiness and recommendations.',
          timestamp: 'Just now',
          ctaLabel: 'Go to Configs',
          ctaHref: '/?tab=settings',
        },
      ])
      setUnread(true)
    }
  }, [])

  function persistNotifications(next: NotificationItem[]) {
    setNotifications(next)
    try {
      window.localStorage.setItem(NOTIFS_KEY, JSON.stringify(next))
    } catch {}
    if (next.length === 0) {
      setUnread(false)
      try {
        window.localStorage.setItem(NOTIFS_READ_KEY, 'true')
      } catch {}
    }
  }

  useEffect(() => {
    if (!notifOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!notifRef.current) return
      if (notifRef.current.contains(target)) return
      setNotifOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [notifOpen])

  useEffect(() => {
    if (!notifOpen && !supportOpen && !accountOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNotifOpen(false)
        setSupportOpen(false)
        setAccountOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [notifOpen, supportOpen, accountOpen])

  function handleTabClick(tab: AppTab) {
    if (onTabChange) {
      onTabChange(tab)
      return
    }
    router.push(`/?tab=${tab}`)
  }

  return (
    <header className="relative h-12 bg-linear-to-r from-[#071b2d] via-[#06263f] to-[#0a1120] border-b border-white/10 flex items-center pl-5 pr-5 gap-8 shrink-0 shadow-lg shadow-black/40">
      {/* Logo */}
      <button
        type="button"
        onClick={() => router.push('/')}
        className="z-10 flex items-center gap-3 min-w-fit"
        aria-label="Go to dashboard"
        title="Go to dashboard"
      >
        <SecurazLogo className="w-8 h-8 drop-shadow-sm" />
        <span className="text-base font-black text-white tracking-tight">SECURAZ</span>
        <span className="text-xs font-medium text-slate-300/80 tracking-tight whitespace-nowrap">
          Azure Environment Audit - SOC 2 Readiness
        </span>
      </button>

      {/* Center tab nav */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-0.5 bg-white/10 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
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
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v)
              if (unread) {
                setUnread(false)
                try {
                  window.localStorage.setItem(NOTIFS_READ_KEY, 'true')
                } catch {}
              }
            }}
            className="relative p-1.5 hover:bg-white/15 rounded-lg transition-colors group"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-cyan-50 group-hover:text-white" />
            {unread && (
              <span
                className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full shadow-lg shadow-red-500/50"
                aria-hidden="true"
              />
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-slate-900/92 text-white shadow-2xl shadow-black/30 backdrop-blur-xl overflow-hidden z-30"
              role="dialog"
              aria-label="Notifications"
            >
              <div className="px-3.5 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold">Notifications</span>
                <div className="flex items-center gap-3">
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={() => persistNotifications([])}
                      className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="px-3.5 py-3 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-white">{n.title}</p>
                          <button
                            type="button"
                            onClick={() => persistNotifications(notifications.filter((x) => x.id !== n.id))}
                            className="shrink-0 -mt-0.5 p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            aria-label={`Dismiss ${n.title}`}
                            title="Dismiss"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">{n.message}</p>
                        {n.ctaLabel && n.ctaHref && (
                          <button
                            type="button"
                            onClick={() => {
                              setNotifOpen(false)
                              router.push(n.ctaHref!)
                            }}
                            className="mt-2 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-3 py-1.5 transition-colors"
                          >
                            {n.ctaLabel}
                          </button>
                        )}
                      </div>
                      <span className="shrink-0 text-[10px] text-slate-400 whitespace-nowrap">
                        {n.timestamp}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="px-3.5 py-6 text-center text-sm text-slate-400">
                  No notifications yet
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSupportOpen(true)}
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
          onClick={() => setAccountOpen(true)}
        >
          NB
        </button>
      </div>

      {supportOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
          role="dialog"
          aria-label="Customer support"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSupportOpen(false)
          }}
          onTouchStart={(e) => {
            if (e.target === e.currentTarget) setSupportOpen(false)
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/40 backdrop-blur-xl p-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSupportOpen(false)}
                className="absolute right-0 top-0 p-2 rounded-lg hover:bg-white/8 transition-colors text-slate-300 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="text-center px-2 py-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Customer Support
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">Coming soon</h3>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                  Live chat support is not available yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {accountOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
          role="dialog"
          aria-label="Account"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setAccountOpen(false)
          }}
          onTouchStart={(e) => {
            if (e.target === e.currentTarget) setAccountOpen(false)
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/40 backdrop-blur-xl p-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen(false)}
                className="absolute right-0 top-0 p-2 rounded-lg hover:bg-white/8 transition-colors text-slate-300 hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="text-center px-2 py-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Account
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">Coming soon</h3>
                <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                  Account settings are not available yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
