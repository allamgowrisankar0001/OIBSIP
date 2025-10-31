import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';


function Login() {
    const baseurl = 'http://localhost:5000/api/users';
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState(''); // add state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function login() {
        try {
            const response = await fetch(`${baseurl}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful!');
                console.log('User:', data.user);
                localStorage.setItem('user', JSON.stringify(data.user)); // store user
                navigate('/dashboard'); // ✅ navigate to dashboard
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('Something went wrong!');
        }
    }

    async function signup() {
        try {
            const response = await fetch(`${baseurl}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Signup successful!');
                console.log('User:', data.user);
                localStorage.setItem('user', JSON.stringify(data.user)); // store user

                navigate('/dashboard'); // ✅ navigate to dashboard

            } else {
                setMessage(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            setMessage('Something went wrong!');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? login() : signup();
    };

    return (
        <div className="main">
            {/* Left Form */}
            <div className="form">
                <form className="form1" onSubmit={handleSubmit}>
                    <h2 className="form-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

                    {!isLogin && (
                        <>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                            />
                        </>
                    )}

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={isLogin ? 'current-password' : 'new-password'}
                    />

                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

                    {message && <p>{message}</p>}

                    <p className="signup-text">
                        {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
                        <span className="signup-link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </form>
            </div>

            {/* Right Image with overlay text */}
            <div className="image">
  <div className="overlay-text">
    {isLogin ? (
      <>
        <h1>Welcome Back, Friend!</h1>
        <p>Sign in and continue your journey with us.</p>
        <ul className="overlay-features">
          <li>🔹 Access your personalized dashboard</li>
          {/* <li>🔹 Track your progress and goals</li> */}
          <li>🔹 Connect with our community</li>
        </ul>
        <p className="cta">🚀 Let’s get started!</p>
      </>
    ) : (
      <>
        <h1>Hello, New Adventurer!</h1>
        <p>Create an account and start your adventure today.</p>
        <ul className="overlay-features">
          {/* <li> Join our growing community</li>
          <li>Unlock exclusive features</li>
          <li>Customize your experience</li> */}
        </ul>
        <p className="cta">✨ Sign up and explore now!</p>
      </>
    )}
  </div>
</div>

        </div>
    );
}

export default Login;
