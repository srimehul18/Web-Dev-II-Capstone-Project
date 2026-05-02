import { useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom" 
import DoctorFilters from "../components/DoctorFilters"
import DoctorList from "../components/DoctorList"
import DoctorSearchBar from "../components/DoctorSearchBar"
import Pagination from "../components/Pagination"
import { validFields } from "./validfields" 

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
] 

const formatSpecialization = (field) =>
  field.charAt(0).toUpperCase() + field.slice(1) 

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5) 

const createMockDoctors = () =>
  validFields.map((field, index) => ({
    name: doctorNames[index % doctorNames.length],
    image: `https://randomuser.me/api/portraits/${
      index % 2 === 0 ? "men" : "women"
    }/${(index % 70) + 1}.jpg`,
    rating: (4 + (index % 10) / 10).toFixed(1),
    available: index % 4 !== 0,
    specialization: formatSpecialization(field),
  })) 

export default function Doctors() {
  const [query, setQuery] = useState("") 
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [specialization, setSpecialization] = useState("") 

  const [doctors, setDoctors] = useState([]) 
  const [topDoctors] = useState(() => shuffle(createMockDoctors())) 
  const [availability, setAvailability] = useState(false) 
  const [ratingFilter, setRatingFilter] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1) 

  const navigate = useNavigate() 
  const doctorsPerPage = 6 

  const handleQueryChange = (value) => {
    setQuery(value) 
    if (!value) setSpecialization("") 
    setCurrentPage(1) 
  }

  const clearSearch = () => {
    setQuery("") 
    setSpecialization("") 
    setCurrentPage(1) 
  }

  useEffect(() => {
    if (!debouncedQuery) {
      return 
    }

    const fetchSpecialization = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
            debouncedQuery
          )}&limit=5&origin=*`
        ) 
        const data = await res.json() 
        const suggestions = data[1] || [] 
        const ologistSuggestion = suggestions.find((suggestion) =>
          suggestion.toLowerCase().includes("ologist")
        ) 
        const result = ologistSuggestion || suggestions[0] || debouncedQuery 

        setSpecialization(result) 
        return result 
      } catch {
        setSpecialization(debouncedQuery) 
        return debouncedQuery 
      }
    } 

    const fetchDoctors = async (resolvedSpecialization) => {
      const res = await fetch("https://randomuser.me/api/?results=6") 
      const data = await res.json() 

      const docs = data.results.map((u) => ({
        name: `${u.name.first} ${u.name.last}`,
        image: u.picture.medium,
        rating: (Math.random() * 2 + 3).toFixed(1),
        available: Math.random() > 0.3,
        specialization: resolvedSpecialization,
      })) 

      setDoctors(docs) 
    } 

    const loadDoctors = async () => {
      const resolvedSpecialization = await fetchSpecialization() 
      fetchDoctors(resolvedSpecialization) 
    } 

    loadDoctors() 
  }, [debouncedQuery]) 

  const handleBook = (doc) => {
    navigate("/appointments", {
      state: {
        doctor: doc.name,
        specialization: doc.specialization,
      },
    }) 
  } 

  const handleSpecialtyClick = (field) => {
    setQuery(field) 
    setCurrentPage(1) 
  } 

  const searchTerm = (specialization || debouncedQuery).toLowerCase() 
  const sourceDoctors = debouncedQuery ? doctors : topDoctors 

  const filteredDoctors = sourceDoctors.filter((doc) => {
    const matchesSearch =
      !debouncedQuery ||
      doc.specialization.toLowerCase().includes(searchTerm) ||
      doc.specialization.toLowerCase().includes(debouncedQuery.toLowerCase()) 

    if (!matchesSearch) return false 
    if (availability && !doc.available) return false 
    if (ratingFilter && Number(doc.rating) < 4) return false 
    return true 
  }) 

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage) 
  const startIndex = (currentPage - 1) * doctorsPerPage 
  const paginatedDoctors = filteredDoctors.slice(
    startIndex,
    startIndex + doctorsPerPage
  ) 

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

        <DoctorSearchBar
          query={query}
          onClear={clearSearch}
          onDebouncedQueryChange={setDebouncedQuery}
          onQueryChange={handleQueryChange}
        />

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

        <DoctorFilters
          availability={availability}
          ratingFilter={ratingFilter}
          onToggleAvailability={() => {
            setAvailability(!availability) 
            setCurrentPage(1) 
          }}
          onToggleRating={() => {
            setRatingFilter(!ratingFilter) 
            setCurrentPage(1) 
          }}
        />

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

        <DoctorList
          doctors={paginatedDoctors}
          onBook={handleBook}
          query={specialization}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  ) 
}
