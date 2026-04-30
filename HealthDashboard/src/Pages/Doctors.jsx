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
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Find Doctors</h1>

        <input
          placeholder="Search specialization like Cardiologist..."
          className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setQuery(e.target.value)}
        />

        {!query && (
          <div className="text-center mt-20 text-gray-500">
            <p>🔍 Search for doctors</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <img src={doc.image} className="w-14 h-14 rounded-full" />
                <div>
                  <h3 className="font-semibold">
                    Dr. {doc.name.split(" ")[0]}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {query || "General Physician"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleBook(doc)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-full hover:scale-105 transition"
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