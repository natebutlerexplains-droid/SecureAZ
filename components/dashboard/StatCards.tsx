import { statCards } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { AlertOctagon, ShieldCheck, FolderCheck, Bug } from 'lucide-react'

const iconConfig = {
  AlertOctagon: {
    icon: <AlertOctagon className="w-6 h-6" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-500/30',
  },
  ShieldCheck: {
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'text-teal-400',
    bg: 'bg-teal-500/15 border-teal-500/30',
  },
  FolderCheck: {
    icon: <FolderCheck className="w-6 h-6" />,
    color: 'text-azure-400',
    bg: 'bg-azure-500/15 border-azure-500/30',
  },
  Bug: {
    icon: <Bug className="w-6 h-6" />,
    color: 'text-red-400',
    bg: 'bg-red-500/15 border-red-500/30',
  },
}

export function StatCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 col-span-1 xl:col-span-4">
      {statCards.map((card) => {
        const cfg = iconConfig[card.icon as keyof typeof iconConfig]
        return (
          <GlassCard key={card.id} className="flex flex-col gap-6">
            {/* Icon badge with enhanced styling */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cfg.bg} ${cfg.color} transition-all hover:scale-110`}
            >
              {cfg.icon}
            </div>

            {/* Metric section with strong typography hierarchy */}
            <div className="space-y-3">
              {/* Label */}
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {card.label}
              </p>

              {/* Big metric number */}
              <p className="text-5xl font-black text-white leading-none tracking-tight">
                {card.value}
              </p>
            </div>

            {/* Delta indicator with refined color */}
            <p
              className={`text-xs font-semibold ${
                card.deltaPositive ? 'text-teal-300' : 'text-amber-300'
              }`}
            >
              {card.delta}
            </p>
          </GlassCard>
        )
      })}
    </div>
  )
}
