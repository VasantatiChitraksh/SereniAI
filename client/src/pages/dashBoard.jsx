import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const moodLabels = {
    '5': '😊 Very Happy',
    '4': '🙂 Happy',
    '3': '😐 Neutral',
    '2': '😔 Sad',
    '1': '😭 Very Sad'
  };


  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email'));
    if (!email) {
      console.error('No user email found in localStorage');
      return;
    }

    const fetchEntries = async () => {
      try{
        const res = await axios.get('http://localhost:8000/get_entries', {
          params: { email }
        });

        if (res.data.success) {
          setEntries(res.data.entries || []);
        } else {
          console.error("Failed to fetch entries:", res.data.message);
        }
      }catch (err) {
        console.error("Error fetching entries:", err);
      }
    }

    fetchEntries();
  }, []);

  const handleEntrySubmit = async (e) => {
  e.preventDefault();

  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const newEntry = {
    date: formattedDate,
    mood,
    note,
  };

  try {
    const res = await axios.post('http://localhost:8000/create_entry', {
      email: JSON.parse(localStorage.getItem('email')),
      mood: newEntry.mood,
      text: newEntry.note,
      timestamp: newEntry.date,
    });

    if (res.data.success) {
      setEntries([...entries, newEntry]);
      setMood('');
      setNote('');
    }
  } catch (err) {
    console.error("Error saving entry:", err);
  }
};


  const chartData = {
  labels: entries.map(e => e.date),
  datasets: [
    {
      label: 'Mood Over Time',
      data: entries.map(e => parseInt(e.mood)),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: '#ec4899',
      fill: true,
      tension: 0.4,
    },
  ],
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-pink-600">SereniAI Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
          <Link to="/profile" className="text-gray-700 hover:text-pink-600 font-medium">Profile</Link>
          <button
            onClick={() => { localStorage.removeItem('email'); window.location.reload(); }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <section className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">New Mood Entry</h2>
          <form onSubmit={handleEntrySubmit} className="space-y-4">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border p-3 rounded-xl text-gray-700"
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
              className="w-full border p-3 rounded-xl text-gray-700"
              rows={4}
            ></textarea>
            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl font-semibold">
              Save Entry
            </button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Mood Trends</h2>
          {entries.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p className="text-gray-500">No mood data to display yet.</p>
          )}
        </section>

        <section className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Entries</h2>
          {entries.length > 0 ? (
            <ul className="space-y-3">
              {entries.slice().reverse().map((entry, index) => (
                <li key={index} className="p-4 border rounded-xl bg-gray-50">
                  <p className="font-medium text-purple-700">{entry.date}</p>
                  <p className="text-md font-semibold mt-1">
                    Mood: <span className="text-pink-600">{moodLabels[entry.mood]}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1 italic">"{entry.note}"</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No entries yet.</p>
          )}
        </section>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        © 2025 SereniAI by Chitraksh and team 💖
      </footer>
    </div>
  );
}
