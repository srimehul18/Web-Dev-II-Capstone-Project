export default function DoctorFilters({
  availability,
  ratingFilter,
  onToggleAvailability,
  onToggleRating,
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <button
        onClick={onToggleAvailability}
        className={`rounded-full px-3 py-1 transition ${
          availability
            ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-black/20"
            : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
        }`}
      >
        Available Today
      </button>

      <button
        onClick={onToggleRating}
        className={`rounded-full px-3 py-1 transition ${
          ratingFilter
            ? "bg-amber-500 text-white shadow-md shadow-amber-200 dark:shadow-black/20"
            : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-amber-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
        }`}
      >
        Rating 4+
      </button>
    </div>
  )
}
