import { useApp } from "../context/AppContext";

export default function Appointments() {
  const { appointments, deleteAppointment } = useApp();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">My Appointments</h1>

      <div className="mt-4 space-y-3">
        {appointments && appointments.length > 0 ? (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="border p-4 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{appt.doctor}</h3>
                <p>Patient: {appt.patientName}</p>
                <p>{new Date(appt.date).toLocaleString()}</p>
              </div>

              <button
                onClick={() => deleteAppointment(appt.id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No appointments yet</p>
        )}
      </div>
    </div>
  );
}