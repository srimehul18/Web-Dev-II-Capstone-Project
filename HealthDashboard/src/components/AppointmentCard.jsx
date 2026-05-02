import EditAppointmentForm from "./EditAppointmentForm"

export default function AppointmentCard({
  appointment,
  formatDoctorName,
  isEditing,
  onCancelEdit,
  onDelete,
  onSaveEdit,
  onStartEdit,
}) {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5 rounded-2xl shadow-lg shadow-slate-200/70 hover:shadow-xl hover:-translate-y-1 transition duration-300 dark:shadow-black/20">
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            {formatDoctorName(appointment.doctor)}
            {appointment.specialization && (
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
                {appointment.specialization}
              </span>
            )}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Patient: {appointment.patientName}
          </p>

          {appointment.complaint && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Primary Complaint: {appointment.complaint}
            </p>
          )}

          <div className="text-xs text-gray-400 mt-2 flex gap-4">
            <span>Date: {appointment.date?.split(" ")[0]}</span>
            <span>Time: {appointment.date?.split(" ")[1]}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onStartEdit}
            className="text-emerald-600 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900 px-3 py-1 rounded transition"
          >
            Update
          </button>

          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 px-3 py-1 rounded transition"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing && (
        <EditAppointmentForm
          appointment={appointment}
          onCancel={onCancelEdit}
          onSave={onSaveEdit}
        />
      )}
    </div>
  )
}
