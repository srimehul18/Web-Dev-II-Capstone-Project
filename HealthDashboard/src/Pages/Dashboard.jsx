import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { appointments } = useApp();


  const totalAppointments = appointments.length;

 
  const today = new Date().toLocaleDateString();

  const todayCount = appointments.filter(
    (appt) =>
      new Date(appt.date).toLocaleDateString() === today
  ).length;


  const uniqueDoctors = new Set(
    appointments.map((appt) => appt.doctor)
  ).size;


  const lastAppointment =
    appointments.length > 0
      ? appointments[appointments.length - 1]
      : null;

return (
  <div className="bg-gradient-to-br from-emerald-50 via-white to-green-100 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-900 min-h-screen px-6 py-10 transition">

    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Overview of your healthcare activity
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* CARD */}
        <div className="bg-white/90 dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900 hover:shadow-md hover:-translate-y-1 transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Appointments
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {totalAppointments}
          </h2>
        </div>

        {/* CARD */}
        <div className="bg-white/90 dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900 hover:shadow-md hover:-translate-y-1 transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Today’s Appointments
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {todayCount}
          </h2>
        </div>

        {/* CARD */}
        <div className="bg-white/90 dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900 hover:shadow-md hover:-translate-y-1 transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Doctors Consulted
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {uniqueDoctors}
          </h2>
        </div>

        {/* CARD */}
        <div className="bg-white/90 dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900 hover:shadow-md hover:-translate-y-1 transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Appointment
          </p>

          {lastAppointment ? (
            <div className="mt-2">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {lastAppointment.doctor}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lastAppointment.date}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              No data
            </p>
          )}
        </div>

      </div>

    </div>
  </div>
);
}
