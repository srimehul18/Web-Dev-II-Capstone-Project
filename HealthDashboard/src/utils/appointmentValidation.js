export const emptyAppointmentForm = {
  patientName: "",
  complaint: "",
  date: "",
  time: "",
}

export const emptyAppointmentErrors = {
  patientName: "",
  date: "",
  time: "",
}

export const validateAppointmentForm = (appointmentForm) => {
  const errors = { ...emptyAppointmentErrors }

  if (!appointmentForm.patientName.trim()) {
    errors.patientName = "Patient name is required."
  }

  if (!appointmentForm.date) {
    errors.date = "Date is required."
  }

  if (!appointmentForm.time) {
    errors.time = "Time is required."
  }

  return errors
}

export const hasAppointmentErrors = (errors) =>
  Object.values(errors).some(Boolean)
