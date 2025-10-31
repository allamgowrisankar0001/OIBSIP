import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || null;

  // Sample stats (could be loaded from API later)
  const stats = {
    orders: 5,
    favorites: 2,
    pending: 1,
  };

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{user?.name || 'Guest'}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{user?.email || ''}</div>
        </div>
      </header>

    </div>
  );
};

export default Dashboard;
