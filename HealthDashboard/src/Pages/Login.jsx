export default function Login() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Login</h1>

      <input
        placeholder="Enter name"
        className="border p-2 mt-4"
      />

      <button className="bg-blue-500 text-white p-2 mt-2">
        Login
      </button>
    </div>
  );
}