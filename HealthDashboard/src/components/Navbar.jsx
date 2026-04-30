import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "lightblue" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/doctors">Doctors</Link> |{" "}
      <Link to="/appointments">Appointments</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
}