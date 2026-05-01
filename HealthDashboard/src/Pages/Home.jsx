import { Link } from "react-router-dom";
import {
  CalendarCheck,
  ClipboardList,
  FileText,
  HeartPulse,
  Search,
  Stethoscope,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { appointments } = useApp();
  const recentAppointments = appointments.slice(-3).reverse();

  const stats = [
    {
      label: "Total Appointments",
      value: appointments.length,
      icon: CalendarCheck,
      highlight: true,
    },
    {
      label: "Doctors Available",
      value: 12,
      icon: Stethoscope,
    },
    {
      label: "Reports",
      value: 5,
      icon: FileText,
    },
  ];

  const features = [
    {
      title: "Book Appointments",
      text: "Schedule consultations quickly and keep every visit organized.",
      icon: ClipboardList,
    },
    {
      title: "Find Specialists",
      text: "Search by specialization and connect with the right doctor faster.",
      icon: Search,
    },
    {
      title: "Track Records",
      text: "Monitor appointment activity and healthcare data in one place.",
      icon: HeartPulse,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white transition dark:from-gray-950 dark:to-gray-900">
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-14 pt-16 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Healthcare dashboard
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 dark:text-white md:text-6xl">
            Smart Healthcare
            <span className="mt-2 block text-emerald-700 dark:text-emerald-300">
              Dashboard System
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
            Manage appointments, find specialists, and track healthcare activity
            through a clean, focused interface built for everyday care workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/doctors"
              className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition duration-300 hover:scale-105 hover:bg-emerald-700 hover:shadow-xl dark:shadow-black/20"
            >
              Find Doctors
            </Link>

            <Link
              to="/appointments"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-md shadow-slate-200 transition duration-300 hover:scale-105 hover:bg-emerald-50 hover:shadow-lg dark:bg-gray-900 dark:text-emerald-100 dark:shadow-black/20 dark:hover:bg-gray-800"
            >
              View Appointments
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-slate-200/80 dark:bg-gray-900 dark:shadow-black/30">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Doctor dashboard illustration"
              className="w-60 drop-shadow-xl md:w-64"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`rounded-2xl p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:shadow-black/20 ${
                stat.highlight
                  ? "bg-emerald-600 text-white shadow-emerald-200"
                  : "bg-white text-gray-900 shadow-slate-200/70 dark:bg-gray-900 dark:text-gray-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      stat.highlight
                        ? "text-emerald-100"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {stat.label}
                  </p>
                  <h2 className="mt-3 text-4xl font-bold">
                    {stat.value}
                  </h2>
                </div>
                <div
                  className={`rounded-xl p-3 ${
                    stat.highlight
                      ? "bg-white/15 text-white"
                      : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-7 text-gray-900 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/20"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {feature.text}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 dark:bg-gray-900 dark:shadow-black/20">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                Upcoming Appointments
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                A quick preview of your latest scheduled visits.
              </p>
            </div>
            <Link
              to="/appointments"
              className="text-sm font-semibold text-emerald-700 transition duration-200 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              View all
            </Link>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-right">
                    {appt.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 px-6 py-10 text-center dark:bg-gray-800/60">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                No upcoming appointments
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Scheduled visits will appear here once appointments are added.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
