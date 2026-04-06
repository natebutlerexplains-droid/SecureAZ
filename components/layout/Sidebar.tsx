'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  ShieldCheck,
  AlertTriangle,
  Bot,
  Lock,
  Menu,
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'SOC 2 Compliance',
    href: '/compliance',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    label: 'Risk Assessments',
    href: '/risk',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    label: 'AI Auditor',
    href: '/auditor',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    label: 'Policy Enforcement',
    href: '/policies',
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Lock className="w-5 h-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-56'
      } h-full bg-slate-900/65 backdrop-blur-3xl border-r border-white/12 flex flex-col overflow-hidden transition-[width] duration-200 ease-out`}
    >
      {/* Collapse toggle */}
      <div className="px-3 pt-2 pb-1 flex items-center">
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Menu className="w-5 h-5 text-zinc-300" />
        </button>
      </div>

      {/* Nav Items */}
      <nav
        className={`flex-1 ${
          collapsed ? 'px-2' : 'px-4'
        } pt-1 pb-4 space-y-2 overflow-y-auto`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center ${
                collapsed ? 'justify-center px-3 -mx-2' : 'gap-3 px-4 -mx-4'
              } py-3 ${isActive ? 'rounded-none' : 'rounded-lg'} transition-colors duration-200 ${
                isActive
                  ? 'bg-azure-500/12 text-azure-300'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-azure-400 rounded-r"
                  aria-hidden="true"
                />
              )}
              {item.icon}
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
