import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [campusId, setCampusId] = useState('');

  function handleRegister() {
    if (!name || !email || !password || !campusId) {
      alert('Please fill all fields!');
      return;
    }
    alert('Account created! Welcome ' + name);
  }

  return (
    <div className="register-page">

      <div className="register-header">
        <h1 className="register-logo">Milo</h1>
        <p className="register-sub">Create a new account</p>
      </div>

      <div className="register-card">

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label>Campus ID</label>
          <input
            type="text"
            placeholder="e.g. 2021CSE1234"
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
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

        <button className="register-btn" onClick={handleRegister}>
          Create Account
        </button>

        <p className="login-text">
          Already have an account?{' '}
          <span
            className="login-link"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;