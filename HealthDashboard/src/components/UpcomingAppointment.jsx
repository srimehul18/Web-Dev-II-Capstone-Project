import { Link } from "react-router-dom"
import { Clock3 } from "lucide-react"
import { formatAppointmentDate } from "../utils/appointmentDate"

export default function UpcomingAppointment({ nextAppointment }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-emerald-600 p-7 text-white shadow-xl shadow-emerald-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-emerald-700 dark:shadow-emerald-500/30">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
            Upcoming Appointment
          </p>
          {nextAppointment ? (
            <>
              <h2 className="mt-3 text-3xl font-bold">
                {nextAppointment.doctor}
              </h2>
              <p className="mt-2 text-sm text-emerald-50">
                {nextAppointment.specialization || "General consultation"}
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white">
                <Clock3 className="h-4 w-4" />
                {formatAppointmentDate(nextAppointment.date)}
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-3 text-3xl font-bold">
                No upcoming appointment
              </h2>
              <p className="mt-2 text-sm text-emerald-50">
                Schedule a consultation when you are ready.
              </p>
            </>
          )}
        </div>

        <Link
          to={nextAppointment ? "/appointments" : "/doctors"}
          className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-lg shadow-emerald-900/10 transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          {nextAppointment ? "View Details" : "Find Doctor"}
        </Link>
      </div>
    </section>
  )
}
