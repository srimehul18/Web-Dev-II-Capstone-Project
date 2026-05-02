import { useState } from "react"
import {
  emptyAppointmentErrors,
  hasAppointmentErrors,
  validateAppointmentForm,
} from "../utils/appointmentValidation"

const getAppointmentForm = (appointment) => {
  const [date = "", time = ""] = (appointment.date || "").split(" ")

  return {
    patientName: appointment.patientName || "",
    complaint: appointment.complaint || "",
    date,
    time,
  }
}

export default function EditAppointmentForm({ appointment, onCancel, onSave }) {
  const [form, setForm] = useState(() => getAppointmentForm(appointment))
  const [errors, setErrors] = useState(emptyAppointmentErrors)

  const handleChange = (field, value) => {
    setForm((previousForm) => ({ ...previousForm, [field]: value }))

    if (field in errors && value.trim()) {
      setErrors((previousErrors) => ({ ...previousErrors, [field]: "" }))
    }
  }

  const handleSave = () => {
    const nextErrors = validateAppointmentForm(form)

    if (hasAppointmentErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    onSave({
      ...form,
      patientName: form.patientName.trim(),
    })
  }

  return (
    <div className="mt-5 border-t border-slate-100 dark:border-gray-800 pt-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            placeholder="Patient Name"
            className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
            value={form.patientName}
            onChange={(e) => handleChange("patientName", e.target.value)}
            aria-invalid={Boolean(errors.patientName)}
          />
          {errors.patientName && (
            <p className="mt-1 text-sm text-red-500">{errors.patientName}</p>
          )}
        </div>

        <input
          placeholder="Primary Complaint"
          className="border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
          value={form.complaint}
          onChange={(e) => handleChange("complaint", e.target.value)}
        />

        <div>
          <input
            type="date"
            className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">{errors.date}</p>
          )}
        </div>

        <div>
          <input
            type="time"
            className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-400 outline-none"
            value={form.time}
            onChange={(e) => handleChange("time", e.target.value)}
            aria-invalid={Boolean(errors.time)}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">{errors.time}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleSave}
          className="bg-emerald-600 text-white px-5 py-2 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition dark:shadow-black/20"
        >
          Save Update
        </button>

        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
