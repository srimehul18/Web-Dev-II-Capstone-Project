import { useApp } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const emptyAppointmentForm = {
    patientName: "",
    complaint: "",
    date: "",
    time: "",
};

export default function Appointments() {
    const { appointments, deleteAppointment, addAppointment, updateAppointment } = useApp();
    const location = useLocation();
    const selectedDoctor = location.state?.doctor;
    const selectedSpecialization = location.state?.specialization;

    const [form, setForm] = useState(emptyAppointmentForm);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);
    const [editForm, setEditForm] = useState(emptyAppointmentForm);
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

        setForm(emptyAppointmentForm);
        window.history.replaceState({}, document.title);
    };

    const resetEditForm = () => {
        setEditingAppointmentId(null);
        setEditForm(emptyAppointmentForm);
    };

    const startEditingAppointment = (appt) => {
        const [date = "", time = ""] = (appt.date || "").split(" ");

        setEditingAppointmentId(appt.id);
        setEditForm({
            patientName: appt.patientName || "",
            complaint: appt.complaint || "",
            date,
            time,
        });
    };

    const handleUpdateAppointment = (appt) => {
        if (!editForm.patientName || !editForm.date || !editForm.time) return;

        updateAppointment(appt.id, {
            ...appt,
            patientName: editForm.patientName,
            complaint: editForm.complaint,
            date: editForm.date + " " + editForm.time,
        });

        resetEditForm();
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
                                value={form.date}
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value })
                                }
                            />

                            <input
                                type="time"
                                className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                value={form.time}
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
                        <p className="text-lg">No appointments yet</p>
                        <p className="text-sm mt-2">
                            Book an appointment from the Doctors page
                        </p>
                    </div>
                )}

                <div className="space-y-5">
                    {currentAppointments.map((appt) => (
                        <div
                            key={appt.id}
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl shadow-lg shadow-slate-200/70 hover:shadow-xl hover:-translate-y-1 transition duration-300 dark:shadow-black/20"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start">
                                <div className="flex-1">
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
                                            Primary Complaint: {appt.complaint}
                                        </p>
                                    )}

                                    <div className="text-xs text-gray-400 mt-2 flex gap-4">
                                        <span>Date: {appt.date?.split(" ")[0]}</span>
                                        <span>Time: {appt.date?.split(" ")[1]}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEditingAppointment(appt)}
                                        className="text-emerald-600 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900 px-3 py-1 rounded transition"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => deleteAppointment(appt.id)}
                                        className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 px-3 py-1 rounded transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {editingAppointmentId === appt.id && (
                                <div className="mt-5 border-t border-slate-100 dark:border-gray-800 pt-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            placeholder="Patient Name"
                                            className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                            value={editForm.patientName}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, patientName: e.target.value })
                                            }
                                        />

                                        <input
                                            placeholder="Primary Complaint"
                                            className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                            value={editForm.complaint}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, complaint: e.target.value })
                                            }
                                        />

                                        <input
                                            type="date"
                                            className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                            value={editForm.date}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, date: e.target.value })
                                            }
                                        />

                                        <input
                                            type="time"
                                            className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
                                            value={editForm.time}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, time: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <button
                                            onClick={() => handleUpdateAppointment(appt)}
                                            className="bg-emerald-600 text-white px-5 py-2 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition dark:shadow-black/20"
                                        >
                                            Save Update
                                        </button>

                                        <button
                                            onClick={resetEditForm}
                                            className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                            onClick={() => setCurrentPage((p) => p - 1)}
                            disabled={safeCurrentPage === 1}
                            className="px-3 py-1 rounded border text-gray-700 disabled:text-gray-400 disabled:opacity-60 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-600 dark:disabled:text-gray-300 dark:hover:bg-gray-700"
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
                                        : "border text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            disabled={safeCurrentPage === totalPages}
                            className="px-3 py-1 rounded border text-gray-700 disabled:text-gray-400 disabled:opacity-60 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-600 dark:disabled:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
