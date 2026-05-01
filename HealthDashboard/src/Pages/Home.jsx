import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-green-100 dark:from-gray-950 dark:via-emerald-950 dark:to-gray-900 min-h-screen transition">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            Smart Healthcare <br />
            <span className="text-emerald-700 dark:text-emerald-300">
              Dashboard System
            </span>
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Manage appointments, find specialists, and track healthcare data
            with a modern and intuitive interface.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              to="/doctors"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:bg-emerald-700 transition"
            >
              Find Doctors
            </Link>

            <Link
              to="/appointments"
              className="bg-white text-emerald-700 border border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800 px-6 py-2 rounded-lg hover:scale-105 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
            >
              View Appointments
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
            alt="doctor"
            className="w-72 drop-shadow-lg"
          />
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg hover:-translate-y-1 transition">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total Appointments
          </p>
          <h2 className="text-2xl font-bold mt-2">24</h2>
        </div>

        {/* Card 2 */}
        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg hover:-translate-y-1 transition">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Doctors Available
          </p>
          <h2 className="text-2xl font-bold mt-2">12</h2>
        </div>

        {/* Card 3 */}
        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg hover:-translate-y-1 transition">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Reports
          </p>
          <h2 className="text-2xl font-bold mt-2">5</h2>
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Book Appointments</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            Schedule appointments quickly with doctors.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Find Specialists</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            Search for doctors based on specialization.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow border border-emerald-100 dark:border-emerald-900 hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Track Records</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            Monitor appointments and healthcare data easily.
          </p>
        </div>

      </section>

    </div>
  );
}
