import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (!email || !password) {
      alert('Please enter email and password!');
      return;
    }
    alert('Login successful!');
  }

  return (
    <div className="login-page">

      <div className="login-header">
        <h1 className="login-logo">Milo</h1>
        <p className="login-sub">Kho gaya? Mil jayega.</p>
      </div>

      <div className="login-card">

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="signup-text">
          New here?{' '}
          <span
            className="signup-link"
            onClick={() => navigate('/register')}
          >
            Create account
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;