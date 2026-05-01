import { useApp } from "../context/AppContext";
import {
  Activity,
  CalendarCheck,
  Clock3,
  Stethoscope,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const { appointments } = useApp();

  const totalAppointments = appointments.length;

  const today = new Date().toLocaleDateString();

  const todayCount = appointments.filter(
    (appt) => new Date(appt.date).toLocaleDateString() === today
  ).length;

  const uniqueDoctors = new Set(
    appointments.map((appt) => appt.doctor)
  ).size;

  const lastAppointment =
    appointments.length > 0
      ? appointments[appointments.length - 1]
      : null;

  const recentAppointments = appointments.slice(-4).reverse();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 transition dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
              Good morning, Mehul 👋
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              A clear overview of appointments, doctors, and recent healthcare activity.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm shadow-slate-200 dark:bg-gray-900 dark:text-gray-300 dark:shadow-black/20">
            <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Live overview
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:shadow-black/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Total Appointments
                </p>
                <h2 className="mt-3 text-4xl font-bold text-gray-950 dark:text-white">
                  {totalAppointments}
                </h2>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <CalendarCheck className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              All consultations tracked in the system.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-emerald-600 p-6 text-white shadow-xl shadow-emerald-200 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:bg-emerald-700 dark:shadow-black/30">
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-100">
                  Today's Appointments
                </p>
                <h2 className="mt-3 text-5xl font-bold">
                  {todayCount}
                </h2>
              </div>
              <div className="rounded-xl bg-white/15 p-3 text-white">
                <Clock3 className="h-6 w-6" />
              </div>
            </div>
            <p className="relative mt-5 text-sm text-emerald-50">
              Primary focus for today's schedule.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:shadow-black/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Doctors Consulted
                </p>
                <h2 className="mt-3 text-4xl font-bold text-gray-950 dark:text-white">
                  {uniqueDoctors}
                </h2>
              </div>
              <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-300">
                <Stethoscope className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              Unique providers across your visits.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:shadow-black/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                  Last Appointment
                </p>
                {lastAppointment ? (
                  <div className="mt-3">
                    <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                      {lastAppointment.doctor}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {lastAppointment.date}
                    </p>
                  </div>
                ) : (
                  <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">
                    No data
                  </h2>
                )}
              </div>
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

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
            <div className="divide-y divide-slate-100 dark:divide-gray-800">
              {recentAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex flex-col gap-3 py-4 transition duration-200 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-gray-800/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {appt.doctor}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Patient: {appt.patientName}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-right">
                    {appt.date}
                  </div>
                </div>
              ))}
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
      </div>
    </div>
  );
}
