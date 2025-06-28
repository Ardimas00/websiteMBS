import { useState } from 'react';
import axios from 'axios';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      if (res.data.success) window.location.href = '/admin';
      else alert('Login gagal');
    } catch {
      alert('Error login');
    }
  };

  return (
    <div className="p-4">
      <h1>Login Admin</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
  );
}
