import AppointmentCard from "./AppointmentCard"
import Pagination from "./Pagination"

export default function AppointmentList({
  appointments,
  currentAppointments,
  currentPage,
  editingAppointmentId,
  formatDoctorName,
  onCancelEdit,
  onDelete,
  onPageChange,
  onSaveEdit,
  onStartEdit,
  totalPages,
}) {
  return (
    <>
      {appointments.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
          <p className="text-lg">No appointments yet</p>
          <p className="text-sm mt-2">
            Book an appointment from the Doctors page
          </p>
        </div>
      )}

      <div className="space-y-5">
        {currentAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            formatDoctorName={formatDoctorName}
            isEditing={editingAppointmentId === appointment.id}
            onCancelEdit={onCancelEdit}
            onDelete={() => onDelete(appointment.id)}
            onSaveEdit={(form) => onSaveEdit(appointment, form)}
            onStartEdit={() => onStartEdit(appointment.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        variant="appointments"
      />
    </>
  )
}
