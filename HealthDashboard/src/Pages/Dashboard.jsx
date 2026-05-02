import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Activity,
  Bell,
  CalendarCheck,
  Clock3,
  Search,
  Stethoscope,
  User,
  Users,
} from "lucide-react";

const parseAppointmentDate = (date) => new Date((date || "").replace(" ", "T"));

const formatAppointmentDate = (date) => {
  const parsedDate = parseAppointmentDate(date);

  if (Number.isNaN(parsedDate.getTime())) return date || "Not scheduled";

  return parsedDate.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function Dashboard() {
  const { appointments, user } = useApp();

  const now = new Date();
  const greetingHour = now.getHours();
  const greeting =
    greetingHour < 12
      ? "Good morning"
      : greetingHour < 17
        ? "Good afternoon"
        : "Good evening";

  const userName = user?.name || "Mehul";
  const totalAppointments = appointments.length;
  const today = now.toLocaleDateString();

  const todayAppointments = appointments.filter(
    (appt) => parseAppointmentDate(appt.date).toLocaleDateString() === today
  );

  const todayCount = todayAppointments.length;

  const uniqueDoctors = new Set(
    appointments.map((appt) => appt.doctor).filter(Boolean)
  ).size;

  const lastAppointment =
    appointments.length > 0
      ? appointments[appointments.length - 1]
      : null;

  const upcomingAppointments = appointments
    .filter((appt) => parseAppointmentDate(appt.date) >= now)
    .sort((a, b) => parseAppointmentDate(a.date) - parseAppointmentDate(b.date));

  const nextAppointment = upcomingAppointments[0] || null;
  const recentAppointments = appointments.slice(-4).reverse();

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const appointmentsThisWeek = appointments.filter((appt) => {
    const apptDate = parseAppointmentDate(appt.date);
    return apptDate >= weekStart && apptDate < weekEnd;
  }).length;

  const doctorVisitCounts = appointments.reduce((counts, appt) => {
    if (!appt.doctor) return counts;
    counts[appt.doctor] = (counts[appt.doctor] || 0) + 1;
    return counts;
  }, {});

  const mostVisitedDoctor =
    Object.entries(doctorVisitCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No visits yet";

  const nextAppointmentDate = nextAppointment
    ? parseAppointmentDate(nextAppointment.date)
    : null;
  const hoursUntilNextAppointment = nextAppointmentDate
    ? Math.max(0, Math.ceil((nextAppointmentDate - now) / (1000 * 60 * 60)))
    : null;

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
  ];

  const quickActions = [
    {
      label: "Book Appointment",
      to: "/doctors",
      icon: CalendarCheck,
    },
    {
      label: "Find Doctor",
      to: "/doctors",
      icon: Search,
    },
    {
      label: "View Appointments",
      to: "/appointments",
      icon: Clock3,
    },
  ];

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
  ];

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
          <section className="relative overflow-hidden rounded-2xl bg-emerald-600 p-7 text-white shadow-xl shadow-emerald-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-emerald-700 dark:shadow-black/30">
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

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.label}
                to={action.to}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 font-semibold text-gray-900 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/20"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </span>
                {action.label}
              </Link>
            );
          })}
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

          <div className="relative overflow-hidden rounded-2xl bg-cyan-600 p-6 text-white shadow-xl shadow-cyan-200 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:bg-cyan-700 dark:shadow-black/30">
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">
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
            <p className="relative mt-5 text-sm text-cyan-50">
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
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
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
                      {formatAppointmentDate(lastAppointment.date)}
                    </p>
                  </div>
                ) : (
                  <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">
                    No data
                  </h2>
                )}
              </div>
              <div className="rounded-xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {insights.map((insight) => {
            const Icon = insight.icon;

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
            );
          })}
        </section>

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
                const isUpcoming = parseAppointmentDate(appt.date) >= now;

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
                );
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
      </div>
    </div>
  );
}
