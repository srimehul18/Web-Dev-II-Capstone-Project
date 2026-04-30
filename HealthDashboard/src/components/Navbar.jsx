import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center transition">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        HealthDash
      </h1>

      {/* LINKS */}
      <div className="flex gap-6 items-center">
        
        <Link
          to="/"
          className={`transition hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive("/") ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Home
        </Link>

        <Link
          to="/doctors"
          className={`transition hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive("/doctors") ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Doctors
        </Link>

        <Link
          to="/appointments"
          className={`transition hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive("/appointments") ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Appointments
        </Link>

        <Link
          to="/dashboard"
          className={`transition hover:text-blue-600 dark:hover:text-blue-400 ${
            isActive("/dashboard") ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          Dashboard
        </Link>

        {/* 🌙 DARK MODE TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {/* PROFILE */}
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>

      </div>
    </nav>
  );
}