import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import About from './pages/aboutPage';
import Dashboard from './pages/dashBoard';
import Profile from './pages/profilePage';
import './App.css'; // Assuming you have a global CSS file for styles
import './index.css'; // Importing Tailwind CSS styles
import HomePage from './pages/homePage';

function ProtectedRoute({children}){
  const email = localStorage.getItem('email');
  if(!email){
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
