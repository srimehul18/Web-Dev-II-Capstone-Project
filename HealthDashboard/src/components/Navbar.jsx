import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
      isActive(path)
        ? "bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-900 dark:text-emerald-100"
        : "text-gray-600 hover:bg-slate-100 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-300"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/90 px-8 py-4 shadow-sm shadow-slate-200/70 backdrop-blur transition dark:border-gray-800 dark:bg-gray-950/90 dark:shadow-black/20">
      <h1 className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
        HealthDash
      </h1>

      <div className="flex items-center gap-2">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>

        <Link to="/doctors" className={linkClass("/doctors")}>
          Doctors
        </Link>

        <Link to="/appointments" className={linkClass("/appointments")}>
          Appointments
        </Link>

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <button
          onClick={() => setDark(!dark)}
          className="ml-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-gray-700 transition duration-200 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-emerald-900 dark:hover:text-emerald-100"
        >
          {dark ? "Light" : "Dark"}
        </button>

        <div className="ml-2 h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-md shadow-emerald-200 ring-2 ring-white dark:shadow-black/20 dark:ring-gray-900"></div>
      </div>
    </nav>
  );
}
