import { useState } from "react"
import {
  emptyAppointmentErrors,
  emptyAppointmentForm,
  hasAppointmentErrors,
  validateAppointmentForm,
} from "../utils/appointmentValidation"

export default function AppointmentForm({
  selectedDoctor,
  selectedSpecialization,
  formatDoctorName,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyAppointmentForm)
  const [errors, setErrors] = useState(emptyAppointmentErrors)

  const handleChange = (field, value) => {
    setForm((previousForm) => ({ ...previousForm, [field]: value }))

    if (field in errors && value.trim()) {
      setErrors((previousErrors) => ({ ...previousErrors, [field]: "" }))
    }
  }

  const handleSubmit = () => {
    const nextErrors = validateAppointmentForm(form)

    if (hasAppointmentErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    onSubmit({
      ...form,
      patientName: form.patientName.trim(),
    })
    setForm(emptyAppointmentForm)
    setErrors(emptyAppointmentErrors)
  }

  return (
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

      <button
        onClick={handleSubmit}
        className="mt-5 bg-emerald-600 text-white px-6 py-2 rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition duration-300 dark:shadow-black/20"
      >
        Confirm Appointment
      </button>
    </div>
  )
}
