import { Link } from 'react-router-dom';

export default function Navbar() {
  const email = localStorage.getItem('email');

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
      </div>

      <div className="flex gap-4">
        {!email ? (
          <>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">Login</Link>
            <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">Register</Link>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                localStorage.removeItem('email');
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
