import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useApp } from "../context/AppContext";
import { validFields } from "./validfields";

export default function Doctors() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    const [wikiData, setWikiData] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const { addAppointment } = useApp();

    useEffect(() => {
        if (!debouncedQuery) return;

        if (!validFields.includes(debouncedQuery.toLowerCase())) {
            setDoctors([]);
            setWikiData([]);
            return;
        }

        fetchData();
    }, [debouncedQuery]);

    const fetchData = async () => {
        try {
            // Wikipedia
            const wikiRes = await fetch(
                `https://en.wikipedia.org/w/api.php?action=opensearch&search=${debouncedQuery}&limit=2&origin=*`
            );
            const wikiJson = await wikiRes.json();
            setWikiData(wikiJson[1]);

            // RandomUser
            const userRes = await fetch(
                "https://randomuser.me/api/?results=5"
            );
            const userJson = await userRes.json();

            const docs = userJson.results.map((u) => ({
                name: u.name.first + " " + u.name.last,
                image: u.picture.medium,
            }));

            setDoctors(docs);
        } catch (err) {
            console.error(err);
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
        <div className="flex items-center justify-center min-h-[80vh]">
            {/* CENTER BOX */}
            <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg">

                {/* TITLE */}
                <h1 className="text-xl font-bold text-center">
                    Find a Doctor
                </h1>

                {/* SEARCH */}
                <input
                    placeholder="Search specialization (e.g. Cardiologist)"
                    className="border p-3 mt-4 w-full rounded-lg"
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* EMPTY STATE */}
                {!query && (
                    <p className="text-center text-gray-500 mt-4">
                        Start typing to search doctors
                    </p>
                )}

                {/* WIKI */}
                {wikiData.length > 0 && (
                    <div className="mt-4 text-sm text-gray-600">
                        {wikiData.map((item, i) => (
                            <p key={i}>{item}</p>
                        ))}
                    </div>
                )}

                {/* RESULTS LIST */}
                <div className="mt-4 space-y-3">
                    {doctors.map((doc, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border p-3 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={doc.image}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">
                                        Dr. {doc.name.split(" ")[0]}
                            
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {query || "General"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBook(doc)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}