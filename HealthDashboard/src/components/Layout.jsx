import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-4">
        {children}
      </main>
    </div>
  );
}