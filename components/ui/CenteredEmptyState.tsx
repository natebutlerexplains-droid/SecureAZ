interface CenteredEmptyStateProps {
  title: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CenteredEmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: CenteredEmptyStateProps) {
  return (
    <div className="text-center max-w-[32rem] w-full mx-auto flex-1 min-h-0 flex flex-col items-center justify-center">
      <p className="text-sm font-semibold text-white">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="mt-4 inline-flex items-center justify-center mx-auto w-fit px-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 text-white text-sm font-semibold py-2 transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  )
}
