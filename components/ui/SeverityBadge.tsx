import { Severity } from '@/lib/mock-data'

interface SeverityBadgeProps {
  level: Severity
}

const styles: Record<Severity, string> = {
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export function SeverityBadge({ level }: SeverityBadgeProps) {
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full border font-medium inline-block ${styles[level]}`}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  )
}
