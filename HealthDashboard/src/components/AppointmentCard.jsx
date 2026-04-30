export default function AppointmentCard({ appt, onDelete }) {
  if (!appt) return null;

  return (
    <div className="border p-4 rounded shadow flex justify-between">
      <div>
        <h3 className="font-bold">{appt.doctor}</h3>
        <p>Patient: {appt.patientName}</p>
        <p>{new Date(appt.date).toLocaleString()}</p>
      </div>

      <button
        onClick={() => onDelete(appt.id)}
        className="bg-red-500 text-white px-3 py-1"
      >
        Delete
      </button>
    </div>
  );
}