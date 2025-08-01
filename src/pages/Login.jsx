import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // To redirect after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.username);

      setMessage('Login successful!');
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
