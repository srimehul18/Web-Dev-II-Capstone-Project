import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useApp } from "../context/AppContext";

export default function Doctors() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [wikiData, setWikiData] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const { addAppointment } = useApp();

  useEffect(() => {
    if (!debouncedQuery) return;

    fetchData();
  }, [debouncedQuery]);

  const fetchData = async () => {
    try {
      // Wikipedia API
      const wikiRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${debouncedQuery}&limit=3&origin=*`
      );
      const wikiJson = await wikiRes.json();
      setWikiData(wikiJson[1]);

      // RandomUser API
      const userRes = await fetch(
        "https://randomuser.me/api/?results=5"
      );
      const userJson = await userRes.json();

      const docs = userJson.results.map((u) => ({
        name: u.name.first + " " + u.name.last,
        email: u.email,
        image: u.picture.medium,
      }));

      setDoctors(docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBook = (doc) => {
    addAppointment({
      doctor: doc.name,
      patientName: "User",
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Find Doctors</h1>

      {/* Search */}
      <input
        placeholder="Search specialization..."
        className="border p-2 mt-4 w-full"
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Wiki Info */}
      <div className="mt-4">
        {wikiData.map((item, i) => (
          <p key={i} className="text-sm text-gray-600">
            {item}
          </p>
        ))}
      </div>

      {/* Doctors */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {doctors.map((doc, i) => (
          <div key={i} className="border p-3 rounded shadow">
            <img src={doc.image} alt="" className="mb-2" />
            <h3 className="font-semibold">{doc.name}</h3>
            <p className="text-sm">{doc.email}</p>

            <button
              onClick={() => handleBook(doc)}
              className="bg-blue-500 text-white px-3 py-1 mt-2"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}