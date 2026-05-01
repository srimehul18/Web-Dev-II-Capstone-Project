import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import useDebounce from "../hooks/useDebounce";

export default function Doctors() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) {
      return;
    }

    const fetchSpecialization = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
            debouncedQuery
          )}&limit=5&origin=*`
        );
        const data = await res.json();
        const suggestions = data[1] || [];
        const ologistSuggestion = suggestions.find((suggestion) =>
          suggestion.toLowerCase().includes("ologist")
        );

        setSpecialization(
          ologistSuggestion || suggestions[0] || debouncedQuery
        );
      } catch {
        setSpecialization(debouncedQuery);
      }
    };

    const fetchDoctors = async () => {
      const res = await fetch("https://randomuser.me/api/?results=6");
      const data = await res.json();

      const docs = data.results.map((u) => ({
        name: `${u.name.first} ${u.name.last}`,
        image: u.picture.medium,
        rating: (Math.random() * 2 + 3).toFixed(1),
        available: Math.random() > 0.3,
      }));

      setDoctors(docs);
    };

    fetchSpecialization();
    fetchDoctors();
  }, [debouncedQuery]);

  const handleBook = (doc) => {
    navigate("/appointments", {
      state: { doctor: doc.name },
    });
  };

  const filteredDoctors = doctors.filter((doc) => {
    if (availability && !doc.available) return false;
    if (ratingFilter && Number(doc.rating) < 4) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 transition dark:bg-gray-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Find Doctors
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Search specialists and book appointments easily.
          </p>
        </div>

        <div className="relative">
          <input
            placeholder="Search specialization like Cardiologist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white p-3 pl-4 pr-10 text-gray-900 shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-emerald-900 dark:bg-gray-900 dark:text-white"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
            >
              X
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={() => setAvailability(!availability)}
            className={`rounded-full px-3 py-1 transition ${
              availability
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-black/20"
                : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            }`}
          >
            Available Today
          </button>

          <button
            onClick={() => setRatingFilter(!ratingFilter)}
            className={`rounded-full px-3 py-1 transition ${
              ratingFilter
                ? "bg-amber-500 text-white shadow-md shadow-amber-200 dark:shadow-black/20"
                : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-amber-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            }`}
          >
            Rating 4+
          </button>
        </div>

        {!query && (
          <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">Search for doctors</p>
            <p className="mt-2 text-sm">
              Try: Cardiologist, Dentist, Dermatologist
            </p>
          </div>
        )}

        {query && filteredDoctors.length === 0 && (
          <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">No doctors match your filters</p>
            <p className="mt-2 text-sm">
              Try clearing filters or searching another specialization.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {filteredDoctors.map((doc) => (
            <DoctorCard
              key={`${doc.name}-${doc.image}`}
              doc={doc}
              onBook={handleBook}
              query={specialization}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
