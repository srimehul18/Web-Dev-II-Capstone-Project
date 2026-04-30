import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-3 flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}