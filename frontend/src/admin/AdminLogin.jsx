import { useState } from 'react';
import axios from 'axios';


export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('/login', { username, password });
      if (res.data.success) window.location.href = '/admin';
      else alert('Login gagal');
    } catch {
      alert('Error login');
    }
  };

  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post('/login', { username, password });
      if (res.data.success) {
        sessionStorage.setItem("admin_logged_in", "true");
        window.location.href = '/admin';
      } else {
        sessionStorage.removeItem("admin_logged_in");
        setError('Login gagal, username atau password salah!');
      }
    } catch {
      setError('Terjadi error saat login.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 flex items-center justify-center py-10 px-2">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 flex flex-col items-center">
        <img src="/images/logo.png" alt="Logo" className="h-16 w-16 mb-4 mx-auto" />
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">Login Admin</h1>
        {error && <div className="bg-red-100 text-red-700 rounded px-4 py-2 mb-4 w-full text-center text-sm">{error}</div>}
        <form className="w-full flex flex-col items-center" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] text-lg"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] text-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 shadow-md transition text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
