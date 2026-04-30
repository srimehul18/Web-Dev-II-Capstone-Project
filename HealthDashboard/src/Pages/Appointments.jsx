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

        window.history.replaceState({}, document.title);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen px-6 py-10">

            {/* CONTAINER */}
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">My Appointments</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your upcoming consultations
                    </p>
                </div>

                {/* BOOKING FORM */}
                {selectedDoctor && (
                    <div className="mb-8 p-5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
                        <h2 className="font-semibold mb-4">
                            Book Appointment with Dr. {selectedDoctor}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-3">
                            <input
                                placeholder="Patient Name"
                                className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                value={form.patientName}
                                onChange={(e) =>
                                    setForm({ ...form, patientName: e.target.value })
                                }
                            />

                            <input
                                placeholder="Primary Complaint"
                                className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                value={form.complaint}
                                onChange={(e) =>
                                    setForm({ ...form, complaint: e.target.value })
                                }
                            />

                            <input
                                type="date"
                                className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                            />

                            <input
                                type="time"
                                className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, time: e.target.value })
                                }
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full hover:scale-105 hover:bg-blue-700 transition"
                        >
                            Confirm Appointment
                        </button>
                    </div>
                )}

                {/* EMPTY STATE */}
                {appointments.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-lg">📅 No appointments yet</p>
                        <p className="text-sm mt-2">
                            Book an appointment from the Doctors page
                        </p>
                    </div>
                )}

                {/* APPOINTMENTS LIST */}
                <div className="space-y-4">
                    {appointments.map((appt) => (
                        <div
                            key={appt.id}
                            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition flex justify-between items-start"
                        >
                            {/* LEFT */}
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {appt.doctor}
                                </h3>

                                <p className="text-sm text-gray-600 mt-1">
                                    Patient: {appt.patientName}
                                </p>

                                {/* PRIMARY COMPLAINT */}
                                {appt.complaint && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        🩺 {appt.complaint}
                                    </p>
                                )}

                                {/* DATE + TIME (separate nicely) */}
                                <div className="text-xs text-gray-400 mt-2 flex gap-4">
                                    <span>📅 {appt.date?.split(" ")[0]}</span>
                                    <span>⏰ {appt.date?.split(" ")[1]}</span>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <button
                                onClick={() => deleteAppointment(appt.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded transition"
                            >
                                🗑
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}