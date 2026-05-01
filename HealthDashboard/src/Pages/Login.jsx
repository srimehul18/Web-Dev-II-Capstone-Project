export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-950">
      <h1 className="text-xl font-bold text-emerald-800">Login</h1>

      <input
        placeholder="Enter name"
        className="border border-emerald-200 p-2 mt-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 mt-2 rounded transition">
        Login
      </button>
    </div>
  );
}
