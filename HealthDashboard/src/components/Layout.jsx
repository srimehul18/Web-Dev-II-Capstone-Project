import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-emerald-50 min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  );
}
