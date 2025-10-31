import React, { useEffect, useState } from 'react';
import Login from './login';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [user, setUser] = useState(null);
    const navigate = useNavigate();
  // Check if user is logged in (from localStorage or API)
  useEffect(() => {
    // Example: fetch user from localStorage (replace with real JWT auth later)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user info from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>You are not logged in</h2>
        <p>Please login to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>You have successfully logged in to the dashboard.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
