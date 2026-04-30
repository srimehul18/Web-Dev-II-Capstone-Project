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
    <div className="flex items-center justify-between border p-3 rounded-lg">
      
      <div>
        <p className="font-semibold">{appt.doctor}</p>

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-1 mt-1 rounded"
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
            className="bg-green-500 text-white px-3 py-1 rounded"
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