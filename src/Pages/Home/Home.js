import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.svg';



function Home() {

  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      type: 'lost',
      title: 'Blue Backpack',
      description: 'Lost near library, has books and a laptop inside.',
      location: 'Main Library',
      date: 'Dec 10, 2024',
      name: 'Rahul S.'
    },
    {
      id: 2,
      type: 'found',
      title: 'Black Wallet',
      description: 'Found near canteen, has some cash and ID card.',
      location: 'Canteen Area',
      date: 'Dec 11, 2024',
      name: 'Priya M.'
    },
    {
      id: 3,
      type: 'lost',
      title: 'Student ID Card',
      description: 'Lost somewhere in Block B classrooms.',
      location: 'Block B',
      date: 'Dec 12, 2024',
      name: 'Amit K.'
    },
  ];

  return (
    <div className="home-page">

      <div className="home-header">
        <img src={logo} alt="Milo Logo" width="60" height="60" />
        <h1 className="home-logo">Milo</h1>
        <p className="home-sub">Kho gaya? Mil jayega.</p>
      </div>

      <div className="home-tabs">
        <button className="tab active">All</button>
        <button className="tab">Lost</button>
        <button className="tab">Found</button>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-top">
              <span className={`post-badge ${post.type}`}>
                {post.type === 'lost' ? 'Lost' : 'Found'}
              </span>
              <span className="post-date">{post.date}</span>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-desc">{post.description}</p>
            <div className="post-bottom">
              <span className="post-location">📍 {post.location}</span>
              <span className="post-name">by {post.name}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-btn"
        onClick={() => navigate('/create-post')}
      >
        + Post Item
      </button>

    </div>
  );
}

export default Home;