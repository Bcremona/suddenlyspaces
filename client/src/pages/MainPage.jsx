import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="p-12 flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">A smarter way to rent any space, anywhere.</h1>
      <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 hover:scale-105 transition-transform">
        Get Started!
      </Link>
    </div>
  );
}