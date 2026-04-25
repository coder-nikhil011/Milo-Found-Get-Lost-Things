import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../../Database/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './Register.css';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [campusId, setCampusId] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !campusId) {
      alert('Please fill all fields!');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        campusId: campusId,
        role: 'student',
        score: 0,
        createdAt: new Date()
      });

      alert('Account created! Welcome ' + name);
      navigate('/home');

    } catch (error) {
      alert('Error: ' + error.message);
    }

    setLoading(false);
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

        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/')}>
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Register;