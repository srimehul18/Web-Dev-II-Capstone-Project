import { useState } from "react"
import { useLocation } from "react-router-dom"
import AppointmentForm from "../components/AppointmentForm"
import AppointmentList from "../components/AppointmentList"
import { useApp } from "../context/AppContext"

export default function Appointments() {
  const { appointments, deleteAppointment, addAppointment, updateAppointment } = useApp()
  const location = useLocation()
  const selectedDoctor = location.state?.doctor
  const selectedSpecialization = location.state?.specialization

  const [currentPage, setCurrentPage] = useState(1)
  const [editingAppointmentId, setEditingAppointmentId] = useState(null)
  const itemsPerPage = 5

  const formatDoctorName = (name) => {
    if (!name) return "Dr."
    return name.startsWith("Dr.") ? name : `Dr. ${name}`
  }

  const totalPages = Math.ceil(appointments.length / itemsPerPage)
  const safeCurrentPage = Math.min(currentPage, totalPages || 1)
  const startIndex = (safeCurrentPage - 1) * itemsPerPage

  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleSubmit = (form) => {
    addAppointment({
      doctor: selectedDoctor,
      specialization: selectedSpecialization,
      patientName: form.patientName,
      complaint: form.complaint,
      date: form.date + " " + form.time,
    })

    window.history.replaceState({}, document.title)
  }

  const handleUpdateAppointment = (appointment, form) => {
    updateAppointment(appointment.id, {
      ...appointment,
      patientName: form.patientName,
      complaint: form.complaint,
      date: form.date + " " + form.time,
    })

    setEditingAppointmentId(null)
  }

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
          <AppointmentForm
            selectedDoctor={selectedDoctor}
            selectedSpecialization={selectedSpecialization}
            formatDoctorName={formatDoctorName}
            onSubmit={handleSubmit}
          />
        )}

        <AppointmentList
          appointments={appointments}
          currentAppointments={currentAppointments}
          currentPage={safeCurrentPage}
          editingAppointmentId={editingAppointmentId}
          formatDoctorName={formatDoctorName}
          onCancelEdit={() => setEditingAppointmentId(null)}
          onDelete={deleteAppointment}
          onPageChange={setCurrentPage}
          onSaveEdit={handleUpdateAppointment}
          onStartEdit={setEditingAppointmentId}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
