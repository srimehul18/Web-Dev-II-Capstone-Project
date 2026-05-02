import { CalendarCheck, Clock3, Stethoscope } from "lucide-react"
import { parseAppointmentDate } from "../utils/appointmentDate"

export default function InsightsPanel({ appointments, now, todayAppointments }) {
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)

  const appointmentsThisWeek = appointments.filter((appt) => {
    const apptDate = parseAppointmentDate(appt.date)
    return apptDate >= weekStart && apptDate < weekEnd
  }).length

  const doctorVisitCounts = appointments.reduce((counts, appt) => {
    if (!appt.doctor) return counts
    counts[appt.doctor] = (counts[appt.doctor] || 0) + 1
    return counts
  }, {})

  const mostVisitedDoctor =
    Object.entries(doctorVisitCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No visits yet"

  const insights = [
    {
      label: "Most visited doctor",
      value: mostVisitedDoctor,
      icon: Stethoscope,
    },
    {
      label: "Appointments this week",
      value: appointmentsThisWeek,
      icon: CalendarCheck,
    },
    {
      label: "Upcoming today",
      value: todayAppointments.filter((appt) => parseAppointmentDate(appt.date) >= now).length,
      icon: Clock3,
    },
  ]

  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      {insights.map((insight) => {
        const Icon = insight.icon

        return (
          <div
            key={insight.label}
            className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900 dark:shadow-black/20"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {insight.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-gray-950 dark:text-white">
              {insight.value}
            </p>
          </div>
        )
      })}
    </section>
  )
}
