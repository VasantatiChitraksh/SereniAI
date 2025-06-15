import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen w-full font-sans bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white animate-fade-in">
      <section className="px-8 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to <span className="bg-white text-pink-600 px-3 py-1 rounded-xl">SereniAI</span></h1>
        <p className="text-xl max-w-4xl mx-auto leading-relaxed">
          Your personal mental wellness companion, built with care to help you understand, reflect, and improve your emotional well-being.
          Whether you're tracking your moods, exploring insights, or seeking mindful tips, SereniAI is here for you — 24/7.
        </p>
      </section>

      <section className="bg-gradient-to-b from-red-500 to-yellow-400 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">🌟 Why SereniAI?</h2>
        <ul className="max-w-3xl mx-auto text-lg space-y-4">
          <li>✨ Tracks your moods with beautiful visuals and analytics</li>
          <li>💬 Uses intelligent AI to suggest tips based on how you feel</li>
          <li>📈 Monitors progress with graphs, charts, and journals</li>
          <li>🛡️ Fully private, secure, and runs even on low-spec devices</li>
        </ul>
      </section>

      <section className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-500 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">💡 Our Motto</h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          “Technology should not only make life easier — it should make life better.”  
          SereniAI is designed with the belief that **mental wellness is for everyone**, and we aim to bridge the gap between tech and emotional care.
        </p>
      </section>

      <footer className="bg-black text-white py-10 text-center">
        <p className="text-lg font-semibold mb-2">Developed with ❤️ by</p>
        <p className="text-xl">Chitraksh and team</p>
        <p className="text-sm mt-4 text-gray-400">More contributors will be added soon as we grow 🚀</p>
      </footer>
    </div>
  );
}
