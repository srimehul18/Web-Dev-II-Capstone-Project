import { useState } from "react";

export default function AppointmentCard({ appt, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(appt.patientName);

  const handleSave = () => {
    onUpdate(appt.id, {
      ...appt,
      patientName: name,
    });

    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      <div>
        <p className="font-semibold">{appt.doctor}</p>

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-emerald-200 p-1 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        ) : (
          <p className="text-sm text-gray-600">
            Patient: {appt.patientName}
          </p>
        )}

        <p className="text-xs text-gray-400">
          {new Date(appt.date).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(appt.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
