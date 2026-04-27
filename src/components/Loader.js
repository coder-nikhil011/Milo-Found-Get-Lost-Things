import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <div className="loader-orbit-wrapper">
          <div className="loader-logo-box">
            <svg width="32" height="32" viewBox="0 0 72 72">
              <circle cx="36" cy="28" r="12" fill="#6C63FF" opacity="0.95"/>
              <path d="M18 52 Q36 36 54 52" stroke="#6C63FF" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="36" cy="28" r="5" fill="white"/>
            </svg>
          </div>
          <div className="orbit dot1"></div>
          <div className="orbit dot2"></div>
          <div className="orbit dot3"></div>
        </div>
        <h1 className="loader-name">Milo</h1>
        <p className="loader-tag">Kho gaya? Mil jayega.</p>
        <div className="loader-dots">
          <div className="blink-dot d1"></div>
          <div className="blink-dot d2"></div>
          <div className="blink-dot d3"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;