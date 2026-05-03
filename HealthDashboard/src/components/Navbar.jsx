import { NavLink } from "react-router-dom" 
import { useTheme } from "../context/ThemeContext" 

export default function Navbar() {
  const { dark, setDark } = useTheme() 

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
      isActive
        ? "bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-900 dark:text-emerald-100"
        : "text-gray-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-300"
    }` 

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 py-3 shadow-sm shadow-slate-200/70 backdrop-blur transition dark:border-gray-800 dark:bg-gray-950/90 dark:shadow-black/20 sm:flex-nowrap sm:px-8 sm:py-4">
      
      <h1 className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
        HealthDash
      </h1>

      <div className="order-2 flex w-full flex-wrap items-center justify-center gap-2 sm:order-none sm:w-auto sm:flex-nowrap sm:justify-end">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/doctors" className={linkClass}>
          Doctors
        </NavLink>

        <NavLink to="/appointments" className={linkClass}>
          Appointments
        </NavLink>

        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <button
          onClick={() => setDark(!dark)}
          className="rounded-full bg-slate-100 px-3 py-2 text-sm text-gray-700 transition duration-200 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-emerald-900 dark:hover:text-emerald-100 sm:ml-2"
        >
          {dark ? "Light" : "Dark"}
        </button>

        <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-md shadow-emerald-200 ring-2 ring-white dark:shadow-black/20 dark:ring-gray-900 sm:ml-2"></div>
      </div>
    </nav>
  ) 
}
