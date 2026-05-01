export default function DoctorCard({ doc, onBook, query }) {
  return (
    <div className="rounded-2xl bg-white p-5 text-gray-900 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/20">
      <div className="flex items-center gap-4">
        <img
          src={doc.image}
          alt={`Dr. ${doc.name}`}
          className="h-14 w-14 rounded-full border border-emerald-100 dark:border-emerald-900"
        />

        <div>
          <h3 className="text-lg font-semibold">
            Dr. {doc.name.split(" ")[0]}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {doc.specialization || query || "General Physician"}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-500 dark:text-gray-400">
        <p>{doc.rating} Rating</p>
        <p>City Hospital</p>
        <p
          className={
            doc.available
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-gray-400"
          }
        >
          {doc.available ? "Available Today" : "Not Available"}
        </p>
      </div>

      <button
        onClick={() => onBook(doc)}
        className="mt-4 w-full rounded-full bg-emerald-600 py-2 text-white shadow-lg shadow-emerald-200 transition duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl dark:shadow-black/20"
      >
        Book Appointment
      </button>
    </div>
  );
}
