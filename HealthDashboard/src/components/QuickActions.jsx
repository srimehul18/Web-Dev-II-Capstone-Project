import { Link } from "react-router-dom"
import { CalendarCheck, Clock3, Search } from "lucide-react"

const quickActions = [
  {
    label: "Book Appointment",
    to: "/doctors",
    icon: CalendarCheck,
  },
  {
    label: "Find Doctor",
    to: "/doctors",
    icon: Search,
  },
  {
    label: "View Appointments",
    to: "/appointments",
    icon: Clock3,
  },
]

export default function QuickActions() {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-3">
      {quickActions.map((action) => {
        const Icon = action.icon

        return (
          <Link
            key={action.label}
            to={action.to}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 font-semibold text-gray-900 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/20"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
              <Icon className="h-5 w-5" />
            </span>
            {action.label}
          </Link>
        )
      })}
    </section>
  )
}
