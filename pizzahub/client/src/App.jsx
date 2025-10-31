import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/Register';
import OrderPage from './pages/Order';
import MyOrders from './pages/MyOrders';

// Protected Route Component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Public Route Component (only accessible when NOT logged in)
function PublicRoute({ children }) {
  const user = localStorage.getItem('user');
  
  if (user) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function NavContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state with current login status
    return !!localStorage.getItem('user');
  });

  useEffect(() => {
    // Create a custom event handler that forces a re-render
    const handleLoginEvent = () => {
      setIsLoggedIn(true);
    };

    const handleLogoutEvent = () => {
      setIsLoggedIn(false);
    };

    // Add event listeners
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLogoutEvent);
    
    return () => {
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLogoutEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('userLogout'));
    navigate('/login');
  };

  return (
    <nav>
      <h1 style={{ margin: 0 }}>🍕 PH</h1>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/order">Order Now</Link></li>
            <li><Link to="/my-orders">My Orders</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavContent />
      <Routes>
        {/* Public routes - only accessible when NOT logged in */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } />

        {/* Protected routes - only accessible when logged in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/order" element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        } />
        <Route path="/my-orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />

        {/* Default route */}
        <Route path="*" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
