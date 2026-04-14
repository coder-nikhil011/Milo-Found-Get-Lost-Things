import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

function CreatePost() {

  const navigate = useNavigate();

  const [type, setType] = useState('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit() {
    if (!title || !description || !location) {
      alert('Please fill all fields!');
      return;
    }
    alert('Post created successfully!');
    navigate('/home');
  }

  return (
    <div className="create-page">

      <div className="create-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Back
        </button>
        <h2 className="create-title">Post an Item</h2>
      </div>

      <div className="type-selector">
        <button
          className={`type-btn ${type === 'lost' ? 'active-lost' : ''}`}
          onClick={() => setType('lost')}
        >
          Lost
        </button>
        <button
          className={`type-btn ${type === 'found' ? 'active-found' : ''}`}
          onClick={() => setType('found')}
        >
          Found
        </button>
      </div>

      <div className="create-card">

        <div className="photo-upload" onClick={() => document.getElementById('photo-input').click()}>
          {preview ? (
            <img src={preview} alt="Preview" className="photo-preview" />
          ) : (
            <div className="photo-placeholder">
              <span className="photo-icon">📷</span>
              <p>Tap to add photo</p>
            </div>
          )}
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            style={{ display: 'none' }}
          />
        </div>

        <div className="input-group">
          <label>Item Name</label>
          <input
            type="text"
            placeholder="e.g. Blue Backpack"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            placeholder="Describe the item in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. Main Library, Block B"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Post Item
        </button>

      </div>

    </div>
  );
}

export default CreatePost;