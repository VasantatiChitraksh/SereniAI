import { useEffect, useState } from 'react';

export default function Profile() {
  const [userData, setUserData] = useState({ name: '', email: '', joined: '' });
  const [moodStats, setMoodStats] = useState({ avgMood: '-', bestDay: '', worstDay: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Mocking user data fetch
    setUserData({
      name: 'John Doe',
      email: 'john@example.com',
      joined: 'March 2024'
    });

    setMoodStats({
      avgMood: '7.4',
      bestDay: 'Wednesday',
      worstDay: 'Monday'
    });

    setSuggestions([
      'Try a 10-min walk at 5 PM to reduce stress.',
      'You tend to feel down on Mondays. Try journaling or listening to music.'
    ]);

    setJournalEntries([
      { date: '2025-06-10', mood: 'Happy', note: 'Had a productive day' },
      { date: '2025-06-09', mood: 'Tired', note: 'Slept late' },
    ]);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Joined:</strong> {userData.joined}</p>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Mood Stats</h2>
        <p><strong>Average Mood Score:</strong> {moodStats.avgMood}</p>
        <p><strong>Best Day:</strong> {moodStats.bestDay}</p>
        <p><strong>Worst Day:</strong> {moodStats.worstDay}</p>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">AI Suggestions</h2>
        <ul className="list-disc ml-6">
          {suggestions.map((tip, idx) => <li key={idx}>{tip}</li>)}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-2">Mood Journal</h2>
        <ul className="divide-y">
          {journalEntries.map((entry, idx) => (
            <li key={idx} className="py-2">
              <strong>{entry.date}</strong>: {entry.mood} - {entry.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
