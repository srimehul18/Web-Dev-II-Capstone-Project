export const parseAppointmentDate = (date) => new Date((date || "").replace(" ", "T"))

export const formatAppointmentDate = (date) => {
  const parsedDate = parseAppointmentDate(date)

  if (Number.isNaN(parsedDate.getTime())) return date || "Not scheduled"

  return parsedDate.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
