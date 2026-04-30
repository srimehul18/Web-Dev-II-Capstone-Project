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
    <div className="p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Total */}
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2>Total Appointments</h2>
          <p className="text-2xl font-bold">{totalAppointments}</p>
        </div>

        {/* Today */}
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2>Today’s Appointments</h2>
          <p className="text-2xl font-bold">{todayCount}</p>
        </div>

        {/* Doctors */}
        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h2>Doctors Consulted</h2>
          <p className="text-2xl font-bold">{uniqueDoctors}</p>
        </div>

        {/* Last Appointment */}
        <div className="bg-orange-500 text-white p-4 rounded shadow">
          <h2>Last Appointment</h2>
          {lastAppointment ? (
            <p className="text-sm">
              {lastAppointment.doctor}
            </p>
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
}