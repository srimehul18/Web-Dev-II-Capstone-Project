import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Appointments() {
  const { appointments, deleteAppointment, addAppointment } = useApp();

  const location = useLocation();
  const selectedDoctor = location.state?.doctor;

  const [form, setForm] = useState({
    patientName: "",
    complaint: "",
    date: "",
    time: "",
  });

  const handleSubmit = () => {
    if (!form.patientName || !form.date || !form.time) return;

    addAppointment({
      doctor: selectedDoctor,
      patientName: form.patientName,
      complaint: form.complaint,
      date: form.date + " " + form.time,
    });

    setForm({
      patientName: "",
      complaint: "",
      date: "",
      time: "",
    });

    // remove state so form doesn't persist
    window.history.replaceState({}, document.title);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-xl font-bold text-center">
          My Appointments
        </h1>

        {/* FORM ONLY WHEN COMING FROM DOCTOR PAGE */}
        {selectedDoctor && (
          <div className="mt-6 p-4 border rounded-lg bg-blue-50">
            <h2 className="font-semibold mb-3">
              Book Appointment with Dr. {selectedDoctor}
            </h2>

            <input
              placeholder="Patient Name"
              className="border p-2 w-full mb-2 rounded"
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />

            <input
              placeholder="Primary Complaint"
              className="border p-2 w-full mb-2 rounded"
              value={form.complaint}
              onChange={(e) =>
                setForm({ ...form, complaint: e.target.value })
              }
            />

            <div className="flex gap-2">
              <input
                type="date"
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <input
                type="time"
                className="border p-2 w-full rounded"
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:scale-105 transition"
            >
              Confirm Appointment
            </button>
          </div>
        )}

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border p-4 rounded-lg flex justify-between"
            >
              <div>
                <p className="font-semibold">{appt.doctor}</p>
                <p className="text-sm text-gray-600">
                  Patient: {appt.patientName}
                </p>
                <p className="text-xs text-gray-400">
                  {appt.date}
                </p>
              </div>

              <button
                onClick={() => deleteAppointment(appt.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}