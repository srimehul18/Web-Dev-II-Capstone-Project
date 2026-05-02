import { useEffect } from "react"
import useDebounce from "../hooks/useDebounce"

export default function DoctorSearchBar({
  query,
  onClear,
  onDebouncedQueryChange,
  onQueryChange,
}) {
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    onDebouncedQueryChange(debouncedQuery)
  }, [debouncedQuery, onDebouncedQueryChange])

  return (
    <div className="relative">
      <input
        placeholder="Search specialization like Cardiologist..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full rounded-xl border border-emerald-200 bg-white p-3 pl-4 pr-10 text-gray-900 shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-emerald-900 dark:bg-gray-900 dark:text-white"
      />

      {query && (
        <button
          onClick={onClear}
          className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
        >
          X
        </button>
      )}
    </div>
  )
}
