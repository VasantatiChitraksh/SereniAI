import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // Fetch past entries from backend
    // fetch('/api/entries').then(res => res.json()).then(setEntries);
  }, []);

  const handleEntrySubmit = async (e) => {
    e.preventDefault();
    const newEntry = { date: new Date().toISOString().slice(0, 10), mood, note };
    setEntries(prev => [...prev, newEntry]);
    setMood('');
    setNote('');
  };

  const chartData = {
    labels: entries.map(e => e.date),
    datasets: [
      {
        label: 'Mood Over Time',
        data: entries.map(e => parseInt(e.mood)),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: '#3b82f6',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
          <button onClick={() => { localStorage.removeItem('email'); window.location.reload(); }}
            className="text-red-500 hover:underline">Logout</button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">New Mood Entry</h2>
          <form onSubmit={handleEntrySubmit} className="space-y-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border p-2 rounded-xl"
              required
            >
              <option value="">Select Mood</option>
              <option value="5">😊 Very Happy</option>
              <option value="4">🙂 Happy</option>
              <option value="3">😐 Neutral</option>
              <option value="2">😔 Sad</option>
              <option value="1">😭 Very Sad</option>
            </select>
            <textarea
              placeholder="What's on your mind?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border p-2 rounded-xl"
              rows={4}
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
              Save Entry
            </button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Mood Trends</h2>
          {entries.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p className="text-gray-500">No mood data to display yet.</p>
          )}
        </section>

        <section className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
          {entries.length > 0 ? (
            <ul className="space-y-3">
              {entries.slice().reverse().map((entry, index) => (
                <li key={index} className="p-4 border rounded-xl bg-gray-50">
                  <p className="font-medium">{entry.date} — Mood: {entry.mood}</p>
                  <p className="text-sm text-gray-700 mt-1">{entry.note}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No entries yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
