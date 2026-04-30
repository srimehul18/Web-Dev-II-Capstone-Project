import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="font-bold text-lg">HealthCare App</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}