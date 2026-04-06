import { ControlStatus } from '@/lib/mock-data'

interface StatusIndicatorProps {
  status: ControlStatus
}

const config: Record<
  ControlStatus,
  { dot: string; label: string; text: string }
> = {
  pass: {
    dot: 'bg-green-500',
    label: 'Pass',
    text: 'text-green-400',
  },
  fail: {
    dot: 'bg-red-500',
    label: 'Fail',
    text: 'text-red-400',
  },
  partial: {
    dot: 'bg-yellow-500',
    label: 'Partial',
    text: 'text-yellow-400',
  },
  'not-tested': {
    dot: 'bg-zinc-500',
    label: 'Not Tested',
    text: 'text-zinc-400',
  },
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const c = config[status]
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${c.dot}`} />
      <span className={`text-sm font-medium ${c.text}`}>{c.label}</span>
    </div>
  )
}
