import { use, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:8000/auth', {
        params: {
          email: email,
          password: password,
        },
      });

      console.log(res.data);
      if (res.data.success) {
        localStorage.setItem('email', res.data.email);
        setSuccess('Login successful!');
        navigator('/');
        setError('');
      } else {
        setError('Invalid credentials');
        setSuccess('');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded-xl"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">Login</button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
}
