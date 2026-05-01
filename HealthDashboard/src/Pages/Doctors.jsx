import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import useDebounce from "../hooks/useDebounce";
import { validFields } from "./validfields";

const doctorNames = [
  "Aarav Sharma",
  "Maya Patel",
  "Noah Williams",
  "Anika Rao",
  "Ethan Miller",
  "Sara Johnson",
  "Kabir Mehta",
  "Olivia Brown",
  "Rohan Gupta",
  "Sophia Davis",
  "Liam Wilson",
  "Isha Kapoor",
];

const formatSpecialization = (field) =>
  field.charAt(0).toUpperCase() + field.slice(1);

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

const createMockDoctors = () =>
  validFields.map((field, index) => ({
    name: doctorNames[index % doctorNames.length],
    image: `https://randomuser.me/api/portraits/${
      index % 2 === 0 ? "men" : "women"
    }/${(index % 70) + 1}.jpg`,
    rating: (4 + (index % 10) / 10).toFixed(1),
    available: index % 4 !== 0,
    specialization: formatSpecialization(field),
  }));

export default function Doctors() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [doctors, setDoctors] = useState([]);
  const [topDoctors] = useState(() => shuffle(createMockDoctors()));
  const [availability, setAvailability] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const doctorsPerPage = 6;

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
        const result = ologistSuggestion || suggestions[0] || debouncedQuery;

        setSpecialization(result);
        return result;
      } catch {
        setSpecialization(debouncedQuery);
        return debouncedQuery;
      }
    };

    const fetchDoctors = async (resolvedSpecialization) => {
      const res = await fetch("https://randomuser.me/api/?results=6");
      const data = await res.json();

      const docs = data.results.map((u) => ({
        name: `${u.name.first} ${u.name.last}`,
        image: u.picture.medium,
        rating: (Math.random() * 2 + 3).toFixed(1),
        available: Math.random() > 0.3,
        specialization: resolvedSpecialization,
      }));

      setDoctors(docs);
    };

    const loadDoctors = async () => {
      const resolvedSpecialization = await fetchSpecialization();
      fetchDoctors(resolvedSpecialization);
    };

    loadDoctors();
  }, [debouncedQuery]);

  const handleBook = (doc) => {
    navigate("/appointments", {
      state: {
        doctor: doc.name,
        specialization: doc.specialization,
      },
    });
  };

  const handleSpecialtyClick = (field) => {
    setQuery(field);
    setCurrentPage(1);
  };

  const searchTerm = (specialization || debouncedQuery).toLowerCase();
  const sourceDoctors = debouncedQuery ? doctors : topDoctors;

  const filteredDoctors = sourceDoctors.filter((doc) => {
    const matchesSearch =
      !debouncedQuery ||
      doc.specialization.toLowerCase().includes(searchTerm) ||
      doc.specialization.toLowerCase().includes(debouncedQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (availability && !doc.available) return false;
    if (ratingFilter && Number(doc.rating) < 4) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  );

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
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (!value) setSpecialization("");
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-emerald-200 bg-white p-3 pl-4 pr-10 text-gray-900 shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-emerald-900 dark:bg-gray-900 dark:text-white"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSpecialization("");
                setCurrentPage(1);
              }}
              className="absolute right-3 top-3 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
            >
              X
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {validFields.slice(0, 8).map((field) => (
            <button
              key={field}
              onClick={() => handleSpecialtyClick(field)}
              className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm shadow-slate-200 transition hover:bg-emerald-50 hover:text-emerald-700 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20 dark:hover:bg-emerald-950"
            >
              {formatSpecialization(field)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={() => {
              setAvailability(!availability);
              setCurrentPage(1);
            }}
            className={`rounded-full px-3 py-1 transition ${
              availability
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-black/20"
                : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            }`}
          >
            Available Today
          </button>

          <button
            onClick={() => {
              setRatingFilter(!ratingFilter);
              setCurrentPage(1);
            }}
            className={`rounded-full px-3 py-1 transition ${
              ratingFilter
                ? "bg-amber-500 text-white shadow-md shadow-amber-200 dark:shadow-black/20"
                : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-amber-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            }`}
          >
            Rating 4+
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {query ? "Search Results" : "Top Doctors"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {query
              ? `Showing specialists for ${specialization || query}`
              : "Browse specialists available for consultation"}
          </p>
        </div>

        {query && filteredDoctors.length === 0 && (
          <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg">No doctors match your filters</p>
            <p className="mt-2 text-sm">
              Try clearing filters or searching another specialization.
            </p>
          </div>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedDoctors.map((doc) => (
            <DoctorCard
              key={`${doc.name}-${doc.specialization}-${doc.image}`}
              doc={doc}
              onBook={handleBook}
              query={specialization}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm shadow-slate-200 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-black/20"
                    : "bg-white text-gray-700 shadow-sm shadow-slate-200 hover:bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm shadow-slate-200 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-900 dark:text-gray-200 dark:shadow-black/20"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
