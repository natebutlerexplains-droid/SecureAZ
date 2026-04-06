import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`relative bg-slate-900/25 backdrop-blur-2xl border border-slate-800/60 rounded-2xl shadow-2xl shadow-black/60 p-4 overflow-hidden ${className}`}
    >
      {/* Glass rim beams (top + bottom) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(255,255,255,0.26),transparent_62%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[radial-gradient(ellipse_70%_70%_at_50%_100%,rgba(96,165,250,0.22),transparent_62%)] mix-blend-screen" />

      {/* Crisp rim lines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Subtle inner glow for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-white/8 via-sky-400/6 to-transparent" />

      <div className="relative flex-1 flex flex-col">{children}</div>
    </div>
  )
}
