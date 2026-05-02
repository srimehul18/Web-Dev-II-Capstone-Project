import { Activity, Bell, CalendarCheck, Clock3, Stethoscope, Users } from "lucide-react"
import InsightsPanel from "../components/InsightsPanel"
import QuickActions from "../components/QuickActions"
import RecentAppointments from "../components/RecentAppointments"
import StatsCard from "../components/StatsCard"
import UpcomingAppointment from "../components/UpcomingAppointment"
import { useApp } from "../context/AppContext"
import {
  formatAppointmentDate,
  parseAppointmentDate,
} from "../utils/appointmentDate"

export default function Dashboard() {
  const { appointments, user } = useApp()

  const now = new Date()
  const greetingHour = now.getHours()
  const greeting =
    greetingHour < 12
      ? "Good morning"
      : greetingHour < 17
        ? "Good afternoon"
        : "Good evening"

  const userName = user?.name || "Mehul"
  const totalAppointments = appointments.length
  const today = now.toLocaleDateString()

  const todayAppointments = appointments.filter(
    (appt) => parseAppointmentDate(appt.date).toLocaleDateString() === today
  )

  const todayCount = todayAppointments.length

  const uniqueDoctors = new Set(
    appointments.map((appt) => appt.doctor).filter(Boolean)
  ).size

  const lastAppointment =
    appointments.length > 0
      ? appointments[appointments.length - 1]
      : null

  const upcomingAppointments = appointments
    .filter((appt) => parseAppointmentDate(appt.date) >= now)
    .sort((a, b) => parseAppointmentDate(a.date) - parseAppointmentDate(b.date))

  const nextAppointment = upcomingAppointments[0] || null
  const recentAppointments = appointments.slice(-4).reverse()

  const nextAppointmentDate = nextAppointment
    ? parseAppointmentDate(nextAppointment.date)
    : null
  const hoursUntilNextAppointment = nextAppointmentDate
    ? Math.max(0, Math.ceil((nextAppointmentDate - now) / (1000 * 60 * 60)))
    : null

  const notifications = [
    todayCount > 0
      ? `You have ${todayCount} appointment${todayCount === 1 ? "" : "s"} today`
      : "No appointments scheduled for today",
    nextAppointment && hoursUntilNextAppointment !== null
      ? hoursUntilNextAppointment === 0
        ? "Your next appointment starts soon"
        : `Next appointment in ${hoursUntilNextAppointment} hour${
            hoursUntilNextAppointment === 1 ? "" : "s"
          }`
      : "No upcoming appointments yet",
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 transition dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
              {greeting}, {userName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              A clear overview of appointments, doctors, and recent healthcare activity.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm shadow-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-gray-900 dark:text-gray-300 dark:shadow-black/20">
            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Live overview
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <UpcomingAppointment nextAppointment={nextAppointment} />

          <section className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 dark:bg-gray-900 dark:shadow-black/20">
            <div className="mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                Alerts
              </h2>
            </div>
            <div className="space-y-3">
              {notifications.map((message) => (
                <div
                  key={message}
                  className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-gray-600 transition duration-200 hover:-translate-y-1 hover:shadow-md dark:bg-gray-800/70 dark:text-gray-200"
                >
                  {message}
                </div>
              ))}
            </div>
          </section>
        </div>

        <QuickActions />

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Total Appointments"
            value={
              <h2 className="text-4xl font-bold text-gray-950 dark:text-white">
                {totalAppointments}
              </h2>
            }
            description="All consultations tracked in the system."
            icon={CalendarCheck}
            iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
          />

          <StatsCard
            label="Today's Appointments"
            value={todayCount}
            description="Primary focus for today's schedule."
            icon={Clock3}
            variant="highlight"
          />

          <StatsCard
            label="Doctors Consulted"
            value={
              <h2 className="text-4xl font-bold text-gray-950 dark:text-white">
                {uniqueDoctors}
              </h2>
            }
            description="Unique providers across your visits."
            icon={Stethoscope}
            iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
          />

          <StatsCard
            label="Last Appointment"
            value={
              lastAppointment ? (
                <div>
                  <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                    {lastAppointment.doctor}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formatAppointmentDate(lastAppointment.date)}
                  </p>
                </div>
              ) : (
                <h2 className="text-3xl font-bold text-gray-950 dark:text-white">
                  No data
                </h2>
              )
            }
            icon={Users}
            iconClassName="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
          />
        </div>

        <InsightsPanel
          appointments={appointments}
          now={now}
          todayAppointments={todayAppointments}
        />

        <RecentAppointments
          now={now}
          recentAppointments={recentAppointments}
        />
      </div>
    </div>
  )
}
