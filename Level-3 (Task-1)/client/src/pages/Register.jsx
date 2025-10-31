import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiurl = 'http://localhost:5000/api/users';

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${apiurl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Save user and navigate to dashboard
      try {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Dispatch custom login event with proper name
        window.dispatchEvent(new CustomEvent('userLogin'));
      } catch (e) {
        console.warn('Could not save user to localStorage', e);
      }

      alert(data.message || 'Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error', err);
      setError('Something went wrong, please try again');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}>
      <h2 style={{ marginTop: 0, color: 'orangered' }}>Create Account</h2>
      <p style={{ color: '#666' }}>Join PizzaHub and start ordering!</p>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />

        {error && (
          <div style={{ color: 'orangered', padding: '8px 10px', borderRadius: 6, background: '#fff0f1' }}>{error}</div>
        )}

        <button type="submit" style={{ padding: 10, background: 'orangered', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
