export default function Doctors() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Find Doctors</h1>

      {/* Search Section */}
      <input
        placeholder="Search specialization..."
        className="border p-2 mt-4 w-full"
      />

      {/* Results */}
      <div className="mt-4">
        <p>Doctor results will appear here</p>
      </div>
    </div>
  );
}