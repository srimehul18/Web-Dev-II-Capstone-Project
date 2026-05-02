const paginationStyles = {
  doctors: {
    wrapper: "mt-8 flex items-center justify-center gap-2",
    prevNext:
      "rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm shadow-slate-200 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20",
    page: "h-9 w-9 rounded-full text-sm font-semibold transition",
    active: "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-black/20",
    inactive:
      "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
  appointments: {
    wrapper: "flex justify-center items-center mt-8 gap-2",
    prevNext:
      "px-3 py-1 rounded border text-gray-700 disabled:text-gray-400 disabled:opacity-60 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-600 dark:disabled:text-gray-300 dark:hover:bg-gray-700",
    page: "px-3 py-1 rounded transition",
    active: "bg-emerald-600 text-white",
    inactive:
      "border text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
    previousLabel: "Prev",
    nextLabel: "Next",
  },
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "doctors",
}) {
  if (totalPages <= 1) return null

  const styles = paginationStyles[variant]

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.prevNext}
      >
        {styles.previousLabel}
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`${styles.page} ${
            currentPage === index + 1 ? styles.active : styles.inactive
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.prevNext}
      >
        {styles.nextLabel}
      </button>
    </div>
  )
}
