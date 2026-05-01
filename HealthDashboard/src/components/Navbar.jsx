import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/90 dark:bg-emerald-950 shadow-md shadow-emerald-100/70 dark:shadow-black/20 border-b border-emerald-100 dark:border-emerald-900 px-8 py-4 flex justify-between items-center transition">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
        HealthDash
      </h1>

      {/* LINKS */}
      <div className="flex gap-6 items-center">
        
        <Link
          to="/"
          className={`transition hover:text-emerald-700 dark:hover:text-emerald-300 ${
            isActive("/") ? "text-emerald-700 dark:text-emerald-300 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Home
        </Link>

        <Link
          to="/doctors"
          className={`transition hover:text-emerald-700 dark:hover:text-emerald-300 ${
            isActive("/doctors") ? "text-emerald-700 dark:text-emerald-300 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Doctors
        </Link>

        <Link
          to="/appointments"
          className={`transition hover:text-emerald-700 dark:hover:text-emerald-300 ${
            isActive("/appointments") ? "text-emerald-700 dark:text-emerald-300 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Appointments
        </Link>

        <Link
          to="/dashboard"
          className={`transition hover:text-emerald-700 dark:hover:text-emerald-300 ${
            isActive("/dashboard") ? "text-emerald-700 dark:text-emerald-300 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Dashboard
        </Link>

        {/* 🌙 DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 hover:scale-105 transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* PROFILE */}
        <div className="w-8 h-8 bg-emerald-500 rounded-full ring-2 ring-emerald-100 dark:ring-emerald-800"></div>

      </div>
    </nav>
  );
}
