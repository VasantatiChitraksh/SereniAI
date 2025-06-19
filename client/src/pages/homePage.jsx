import { Link } from 'react-router-dom';

export default function Home() {
  const email = localStorage.getItem('email');

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-200 to-pink-100 text-gray-800 font-sans">
      
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to <span className="text-pink-600">SereniAI</span></h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Your companion for emotional well-being. Track your mood, reflect on your thoughts, and grow happier every day — powered by AI.
        </p>
        <Link
          to={email ? "/dashboard" : "/register"}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg shadow-lg"
        >
          {email ? "Go to Dashboard" : "Get Started"}
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-white shadow-inner rounded-t-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-100 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">📔 Mood Journaling</h3>
            <p>Write about your day and feelings in a private journal, stored securely.</p>
          </div>
          <div className="p-6 bg-purple-100 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">📊 Emotional Analytics</h3>
            <p>Track your mood trends and discover patterns through interactive charts.</p>
          </div>
          <div className="p-6 bg-pink-100 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🤖 AI Suggestions</h3>
            <p>Receive helpful wellness tips based on your mood and journaling patterns.</p>
          </div>
        </div>
      </section>

      {/* Call to Action (only if not logged in) */}
      {!email && (
        <section className="py-16 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your well-being?</h2>
          <p className="text-lg mb-6">Join SereniAI and start your journey to a healthier, happier you.</p>
          <div className="flex justify-center gap-6">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg">
              Login
            </Link>
            <Link to="/register" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg">
              Create Account
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center mt-10">
        <p>Made with ❤️ by Chitraksh and team</p>
      </footer>
    </div>
  );
}
