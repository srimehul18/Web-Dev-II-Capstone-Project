import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">
        HealthDash
      </h1>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link className="hover:text-blue-600 transition" to="/">Home</Link>
        <Link className="hover:text-blue-600 transition" to="/doctors">Doctors</Link>
        <Link className="hover:text-blue-600 transition" to="/appointments">Appointments</Link>
        <Link className="hover:text-blue-600 transition" to="/dashboard">Dashboard</Link>

        {/* Profile */}
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </nav>
  );
}