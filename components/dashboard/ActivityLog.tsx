import { activityEvents } from '@/lib/mock-data'
import { GlassCard } from '@/components/ui/GlassCard'
import { AlertCircle, CheckCircle2, LogIn, Settings, Radar } from 'lucide-react'

const typeIconMap = {
  alert: <AlertCircle className="w-4 h-4" />,
  resolution: <CheckCircle2 className="w-4 h-4" />,
  login: <LogIn className="w-4 h-4" />,
  policy: <Settings className="w-4 h-4" />,
  scan: <Radar className="w-4 h-4" />,
}

const typeColorMap = {
  alert: 'text-red-400 bg-red-500/15 border-red-500/20',
  resolution: 'text-teal-400 bg-teal-500/15 border-teal-500/20',
  login: 'text-cyan-400 bg-cyan-500/15 border-cyan-500/20',
  policy: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
  scan: 'text-amber-400 bg-amber-500/15 border-amber-500/20',
}

interface ActivityLogProps {
  className?: string
}

export function ActivityLog({ className = '' }: ActivityLogProps) {
  return (
    <GlassCard className={`${className} flex flex-col gap-6`}>
      <h2 className="text-lg font-bold text-white">Audit Activity</h2>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {activityEvents.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            {/* Icon badge */}
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${typeColorMap[event.type]}`}
            >
              {typeIconMap[event.type]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-slate-100 font-medium leading-snug">
                {event.message}
              </p>
              <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-500">
                <span className="font-medium">{event.source}</span>
                <span className="text-slate-600">·</span>
                <span>{event.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 px-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/10 transition-all">
        View Full Activity Log
      </button>
    </GlassCard>
  )
}
