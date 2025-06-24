import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState({ name: '', email: '', joined: '23-07-2024' });
  const [moodStats, setMoodStats] = useState({ avgMood: '-', bestDay: '', worstDay: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  const moodLabels = {
    '5': '😊 Very Happy',
    '4': '🙂 Happy',
    '3': '😐 Neutral',
    '2': '😔 Sad',
    '1': '😭 Very Sad'
  };


  useEffect(() => {
    const fetch_userData = async () => {
      const email = JSON.parse(localStorage.getItem('email'));
      if (!email) {
        console.error('No user email found in localStorage');
        return;
      }

      const res = await axios.get('http://localhost:8000/get_user_data', {
        params: { email }
      });

      if (res.data.success) {
        setUserData({
          name: res.data.name,
          email: res.data.email,
          joined: res.data.joined || '23-07-2024'
        });
      }
    };

    fetch_userData();

    setMoodStats({
      avgMood: '7.4',
      bestDay: 'Wednesday',
      worstDay: 'Monday'
    });

    const fetchMoodJournal = async () =>{
        const email = JSON.parse(localStorage.getItem('email'));
        if (!email) {
          console.error('No user email found in localStorage');
          return;
        }
        try{
          const res = await axios.get('http://localhost:8000/get_entries',{
            params: { email: email }
          });

          if(res.data.success){
            const entries = res.data.entries || [];
            const formattedEntries = entries.map(entry => ({
              date: entry.date,
              mood: moodLabels[entry.mood] || '😐 Neutral',
              note: entry.note
            }));

            setJournalEntries(formattedEntries);
          }
          
        }catch (err) {
          console.error("Error fetching mood journal:", err);
        }  
    }

    fetchMoodJournal();

    const fetchSuggestion = async () => {
      console.log("Fetching Suggestions To the frontend")
      const email = JSON.parse(localStorage.getItem('email'));
      if(!email){
        console.log("No email found");
      }
      try{
        console.log("Awaiting Response")
        const res = await axios.get('http://localhost:8000/get_suggestions', {
          params: {email: email}
        });

        console.log("Got rresponse")
        console.log(res)
        if(res.data.success){
          console.log(res.data.suggestions)
          setSuggestions(res.data.suggestions)
        }
      }catch(err){
        console.log(err);
      }
    }

    fetchSuggestion();
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 text-gray-800">
      {/* Top Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-pink-600">Your Profile</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-pink-600 font-medium">Home</Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-pink-600 font-medium">Dashboard</Link>
          <button
            onClick={() => {
              localStorage.removeItem('email');
              window.location.reload();
            }}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-4xl mx-auto space-y-6">
        {/* User Info */}
        <section className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">👤 User Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Joined:</strong> {userData.joined}</p>
        </section>

        {/* Mood Stats */}
        <section className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">📊 Mood Stats</h2>
          <p><strong>Average Mood Score:</strong> {moodStats.avgMood}</p>
          <p><strong>Best Day:</strong> {moodStats.bestDay}</p>
          <p><strong>Worst Day:</strong> {moodStats.worstDay}</p>
        </section>

        {/* AI Suggestions */}
        <section className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">🤖 AI Suggestions</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            {suggestions.map((tip, idx) => (
              <li key={idx}>
                <span className="font-semibold">{tip.suggestion}</span>
                <br />
                <span className="text-sm italic text-gray-600">({tip["what it improves"]})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mood Journal */}
        <section className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">📔 Mood Journal</h2>
          <ul className="divide-y">
            {journalEntries.map((entry, idx) => (
              <li key={idx} className="py-3">
                <span className="font-semibold">{entry.date}</span> — {entry.mood}
                <p className="text-sm text-gray-600 mt-1">{entry.note}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-400 py-6">
        © 2025 SereniAI — Built with 🌸 by Chitraksh & Team
      </footer>
    </div>
  );
}
