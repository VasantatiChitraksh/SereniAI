import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import './App.css'; // Assuming you have a global CSS file for styles
import './index.css'; // Importing Tailwind CSS styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<div>Home Page (Protected)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
