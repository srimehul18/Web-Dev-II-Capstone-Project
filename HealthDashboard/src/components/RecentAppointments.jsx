import { CalendarCheck, Clock3, User } from "lucide-react"
import {
  formatAppointmentDate,
  parseAppointmentDate,
} from "../utils/appointmentDate"

export default function RecentAppointments({ now, recentAppointments }) {
  return (
    <section className="mt-10 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 dark:bg-gray-900 dark:shadow-black/20">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-950 dark:text-white">
            Recent Appointments
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest activity from your appointment history.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {recentAppointments.length} recent
        </span>
      </div>

      {recentAppointments.length > 0 ? (
        <div className="space-y-3">
          {recentAppointments.map((appt) => {
            const isUpcoming = parseAppointmentDate(appt.date) >= now

            return (
              <div
                key={appt.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 transition duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:hover:bg-gray-800/60"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {appt.doctor}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <User className="h-4 w-4" />
                      {appt.patientName}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      isUpcoming
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-slate-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {isUpcoming ? "Upcoming" : "Completed"}
                  </span>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Clock3 className="h-4 w-4" />
                    {formatAppointmentDate(appt.date)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-50 px-6 py-10 text-center dark:bg-gray-800/60">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            No appointments yet
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Recent bookings will appear here once appointments are added.
          </p>
        </div>
      )}
    </section>
  )
}
