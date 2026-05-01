import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useApp } from "../context/AppContext";

export default function Doctors() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchDoctors = async () => {
      const res = await fetch("https://randomuser.me/api/?results=6");
      const data = await res.json();

      const docs = data.results.map((u) => ({
        name: u.name.first + " " + u.name.last,
        image: u.picture.medium,
        rating: (Math.random() * 2 + 3).toFixed(1),
        available: Math.random() > 0.3,
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

  const filteredDoctors = doctors.filter((doc) => {
    if (availability && !doc.available) return false;
    if (ratingFilter && doc.rating < 4) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 transition dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Find Doctors
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search specialists and book appointments بسهولة
          </p>
        </div>

        <div className="relative">
          <input
            placeholder="Search specialization like Cardiologist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 pl-4 pr-10 rounded-lg border 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white
            border-emerald-200 dark:border-emerald-900
            focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-4 mt-4 flex-wrap">
          <button
            onClick={() => setAvailability(!availability)}
            className={`px-3 py-1 rounded-full border transition ${
              availability
                ? "bg-green-500 text-white"
                : "bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-900 text-gray-700 dark:text-gray-200"
            }`}
          >
            Available Today
          </button>

          <button
            onClick={() => setRatingFilter(!ratingFilter)}
            className={`px-3 py-1 rounded-full border transition ${
              ratingFilter
                ? "bg-yellow-500 text-white"
                : "bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-900 text-gray-700 dark:text-gray-200"
            }`}
          >
            Rating 4+
          </button>
        </div>

        {!query && (
          <div className="text-center mt-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg">🔍 Search for doctors</p>
            <p className="text-sm mt-2">
              Try: Cardiologist, Dentist, Dermatologist
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filteredDoctors.map((doc, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 
              text-gray-900 dark:text-gray-100 
              p-5 rounded-2xl shadow-lg shadow-slate-200/70
              hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]
              transition duration-300 dark:shadow-black/20"
            >
              <div className="flex items-center gap-4">
                <img
                  src={doc.image}
                  className="w-14 h-14 rounded-full border border-emerald-100 dark:border-emerald-900"
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

              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>⭐ {doc.rating} Rating</p>
                <p>📍 City Hospital</p>
                <p className={doc.available ? "text-green-500 dark:text-green-400" : "text-gray-400"}>
                  {doc.available ? "🟢 Available Today" : "Not Available"}
                </p>
              </div>

              <button
                onClick={() => handleBook(doc)}
                className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-full shadow-lg shadow-emerald-200
                hover:bg-emerald-700 hover:scale-105 hover:shadow-xl transition duration-300 dark:shadow-black/20"
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
