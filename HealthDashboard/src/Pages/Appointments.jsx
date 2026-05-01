import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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

    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState("");
    const itemsPerPage = 5;

    const totalPages = Math.ceil(appointments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentAppointments = appointments.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [appointments]);

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
        <div className="bg-gradient-to-br from-emerald-50 via-white to-green-100 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-900 min-h-screen px-6 py-10 transition">
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
                    <div className="mb-10 p-6 rounded-xl bg-emerald-50 dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900 shadow-sm">
                        <h2 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                            Book Appointment with Dr. {selectedDoctor}
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
                            className="mt-5 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 hover:scale-105 transition"
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
                            className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-5 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900 hover:shadow-md hover:-translate-y-1 transition flex justify-between items-start"
                        >
                            <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    {appt.doctor}
                                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">
                                        Upcoming
                                    </span>
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
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded border disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded transition ${
                                    currentPage === i + 1
                                        ? "bg-emerald-600 text-white"
                                        : "border hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={currentPage === totalPages}
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
