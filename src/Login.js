import React, { useState } from 'react';
import './Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    alert('Login ho gaya! Email: ' + email);
  }

  return (
    <div className="login-page">

      <div className="login-header">
        <h1 className="login-logo">Milo</h1>
        <p className="login-sub">Apne campus account se login karo</p>
      </div>

      <div className="login-card">

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="tumhari@email.com"
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
          Login karo
        </button>

        <p className="signup-text">
          Naya account? <span className="signup-link">Register karo</span>
        </p>

      </div>

    </div>
  );
}

export default Login;