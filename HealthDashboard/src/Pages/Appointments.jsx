import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Appointments() {
    const { appointments, deleteAppointment, addAppointment } = useApp();
    const location = useLocation();
    const selectedDoctor = location.state?.doctor;
    const selectedSpecialization = location.state?.specialization;

    const [form, setForm] = useState({
        patientName: "",
        complaint: "",
        date: "",
        time: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const formatDoctorName = (name) => {
        if (!name) return "Dr.";
        return name.startsWith("Dr.") ? name : `Dr. ${name}`;
    };

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const safeCurrentPage = Math.min(currentPage, totalPages || 1);
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;

    const currentAppointments = appointments.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleSubmit = () => {
        if (!form.patientName || !form.date || !form.time) return;

        addAppointment({
            doctor: selectedDoctor,
            specialization: selectedSpecialization,
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
        <div className="min-h-screen bg-slate-50 px-6 py-10 transition dark:bg-gray-950">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        My Appointments
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Manage your upcoming consultations
                    </p>
                </div>

                {selectedDoctor && (
                    <div className="mb-10 rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/70 dark:bg-gray-900 dark:shadow-black/20">
                        <h2 className="font-semibold mb-4 text-gray-900 dark:text-gray-100 flex flex-wrap items-center gap-2">
                            Book Appointment with {formatDoctorName(selectedDoctor)}
                            {selectedSpecialization && (
                                <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                                    {selectedSpecialization}
                                </span>
                            )}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                placeholder="Patient Name"
                                className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                value={form.patientName}
                                onChange={(e) =>
                                    setForm({ ...form, patientName: e.target.value })
                                }
                            />

                            <input
                                placeholder="Primary Complaint"
                                className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                value={form.complaint}
                                onChange={(e) =>
                                    setForm({ ...form, complaint: e.target.value })
                                }
                            />

                            <input
                                type="date"
                                className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                            />

                            <input
                                type="time"
                                className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                onChange={(e) =>
                                    setForm({ ...form, time: e.target.value })
                                }
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="mt-5 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition duration-300 dark:shadow-black/20"
                        >
                            Confirm Appointment
                        </button>
                    </div>
                )}

                {appointments.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                        <p className="text-lg">📅 No appointments yet</p>
                        <p className="text-sm mt-2">
                            Book an appointment from the Doctors page
                        </p>
                    </div>
                )}

                <div className="space-y-5">
                    {currentAppointments.map((appt) => (
                        <div
                            key={appt.id}
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl shadow-lg shadow-slate-200/70 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex justify-between items-start dark:shadow-black/20"
                        >
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    {formatDoctorName(appt.doctor)}
                                    {appt.specialization && (
                                        <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                                            {appt.specialization}
                                        </span>
                                    )}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    Patient: {appt.patientName}
                                </p>

                                {appt.complaint && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        🩺 {appt.complaint}
                                    </p>
                                )}

                                <div className="text-xs text-gray-400 mt-2 flex gap-4">
                                    <span>📅 {appt.date?.split(" ")[0]}</span>
                                    <span>⏰ {appt.date?.split(" ")[1]}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteAppointment(appt.id)}
                                className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 px-3 py-1 rounded transition"
                            >
                                🗑
                            </button>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={safeCurrentPage === 1}
                            className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded transition ${
                                    safeCurrentPage === i + 1
                                        ? "bg-emerald-600 text-white"
                                        : "border hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={safeCurrentPage === totalPages}
                            className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
