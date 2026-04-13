import React from 'react';
import './App.css';

function App() {
  return (
    <div className="splash">

      <div className="circles-bg">
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>
      </div>

      <div className="logo-box">
        <svg width="60" height="60" viewBox="0 0 72 72">
          <circle cx="36" cy="30" r="12" fill="white" opacity="0.95"/>
          <path d="M20 52 Q36 38 52 52" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <circle cx="36" cy="30" r="5" fill="#6C63FF"/>
        </svg>
      </div>

      <h1 className="app-name">Milo</h1>
      <p className="tagline">Kho gaya? Mil jayega.</p>

      <div className="home-indicator"></div>

    </div>
  );
}

export default App;