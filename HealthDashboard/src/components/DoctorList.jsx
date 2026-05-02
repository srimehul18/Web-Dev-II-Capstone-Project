import DoctorCard from "./DoctorCard"

export default function DoctorList({ doctors, onBook, query }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doc) => (
        <DoctorCard
          key={`${doc.name}-${doc.specialization}-${doc.image}`}
          doc={doc}
          onBook={onBook}
          query={query}
        />
      ))}
    </div>
  )
}
