import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Database/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Loader from '../../components/Loader';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.log(error); }
    setLoading(false);
  }

  const filteredPosts = posts.filter(p => filter === 'all' ? true : p.type === filter);

  return (
    <div className="home-page">
      {loading && <Loader />}
      <div className="home-header">
        <div>
          <h1 className="home-logo">Milo</h1>
          <p className="home-sub">Kho gaya? Mil jayega.</p>
        </div>
        <div className="header-btns">
          <button className="profile-btn" onClick={() => navigate('/profile')}>My Profile</button>
          <button className="logout-btn" onClick={() => { auth.signOut(); navigate('/'); }}>Logout</button>
        </div>
      </div>
      <div className="home-tabs">
        <button className={`tab ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`tab ${filter==='lost'?'active':''}`} onClick={() => setFilter('lost')}>Lost</button>
        <button className={`tab ${filter==='found'?'active':''}`} onClick={() => setFilter('found')}>Found</button>
      </div>
      {filteredPosts.length === 0 ? (
        <div className="empty-text">No posts yet. Be the first to post!</div>
      ) : (
        <div className="posts-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)} style={{cursor:'pointer'}}>
              <div className="post-top">
                <span className={`post-badge ${post.type}`}>{post.type === 'lost' ? 'Lost' : 'Found'}</span>
                <span className="post-date">{post.createdAt?.toDate().toLocaleDateString()}</span>
              </div>
              {post.photoURL ? <img src={post.photoURL} alt={post.title} className="post-image" /> : null}
              <h3 className="post-title">{post.title}</h3>
              <p className="post-desc">{post.description}</p>
              <div className="post-bottom">
                <span className="post-location">📍 {post.location}</span>
                <span className="post-name">by {post.userName}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="add-btn" onClick={() => navigate('/create-post')}>+ Post Item</button>
    </div>
  );
}

export default Home;