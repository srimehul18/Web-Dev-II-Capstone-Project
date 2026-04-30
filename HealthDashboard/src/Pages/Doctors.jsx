import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useApp } from "../context/AppContext";

export default function Doctors() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchDoctors = async () => {
      const res = await fetch("https://randomuser.me/api/?results=6");
      const data = await res.json();

      const docs = data.results.map((u) => ({
        name: u.name.first + " " + u.name.last,
        image: u.picture.medium,
      }));

      setDoctors(docs);
    };

    fetchDoctors();
  }, [debouncedQuery]);

  const handleBook = (doc) => {
    navigate("/appointments", {
      state: { doctor: doc.name },
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen px-6 py-10 transition">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Find Doctors
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search specialists and book appointments بسهولة
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <input
            placeholder="Search specialization like Cardiologist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 pl-4 pr-10 rounded-lg border 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {/* CLEAR BUTTON */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {!query && (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg">🔍 Search for doctors</p>
            <p className="text-sm mt-2">
              Try: Cardiologist, Dentist, Dermatologist
            </p>
          </div>
        )}

        {/* DOCTOR CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100 
              p-5 rounded-xl shadow-sm 
              hover:shadow-lg hover:-translate-y-1 
              transition"
            >
              {/* TOP */}
              <div className="flex items-center gap-4">
                <img
                  src={doc.image}
                  className="w-14 h-14 rounded-full border dark:border-gray-700"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    Dr. {doc.name.split(" ")[0]}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {query || "General Physician"}
                  </p>
                </div>
              </div>

              {/* EXTRA INFO */}
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>⭐ 4.5 Rating</p>
                <p>📍 City Hospital</p>
                <p className="text-green-500 dark:text-green-400">
                  🟢 Available Today
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => handleBook(doc)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full 
                hover:bg-blue-700 hover:scale-105 transition"
              >
                Book Appointment →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}