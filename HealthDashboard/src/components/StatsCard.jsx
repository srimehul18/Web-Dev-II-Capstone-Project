export default function StatsCard({
  description,
  icon: Icon,
  iconClassName,
  label,
  value,
  variant = "default",
}) {
  if (variant === "highlight") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-cyan-600 p-6 text-white shadow-xl shadow-cyan-200 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:bg-cyan-700 dark:shadow-black/30">
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">
              {label}
            </p>
            <h2 className="mt-3 text-5xl font-bold">{value}</h2>
          </div>
          <div className="rounded-xl bg-white/15 p-3 text-white">
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <p className="relative mt-5 text-sm text-cyan-50">{description}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:shadow-black/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {label}
          </p>
          <div className="mt-3">{value}</div>
        </div>
        <div className={`rounded-xl p-3 ${iconClassName}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      {description && (
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}
