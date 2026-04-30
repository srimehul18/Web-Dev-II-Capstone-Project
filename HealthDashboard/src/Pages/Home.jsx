import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      
      <h1 className="text-3xl font-bold">
        Smart Healthcare Dashboard
      </h1>

      <p className="mt-4 text-gray-600 max-w-md">
        Search doctors, book appointments, and manage your healthcare easily.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/doctors"
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Find Doctors
        </Link>

        <Link
          to="/appointments"
          className="bg-gray-200 px-5 py-2 rounded"
        >
          View Appointments
        </Link>
      </div>

    </div>
  );
}