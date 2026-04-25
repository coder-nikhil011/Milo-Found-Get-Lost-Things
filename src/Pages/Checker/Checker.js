import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../database/firebase';
import {
  collection, getDocs, query,
  where, doc, updateDoc
} from 'firebase/firestore';
import './Checker.css';

function Checker() {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  async function fetchPendingPosts() {
    try {
      const q = query(
        collection(db, 'posts'),
        where('checkerApproved', '==', false),
        where('status', '==', 'open')
      );
      const snapshot = await getDocs(q);
      const postsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsList);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  }

  async function handleVerdict(postId, verdict) {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        checkerApproved: verdict === 'genuine',
        checkerVerdict: verdict,
        checkerId: auth.currentUser.uid,
        checkedAt: new Date()
      });

      setPosts(posts.filter(p => p.id !== postId));
      alert(verdict === 'genuine' ? 'Marked as Genuine!' : 'Marked as Fraud!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="checker-page">

      <div className="checker-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Back
        </button>
        <h2 className="checker-title">Checker Dashboard</h2>
      </div>

      <p className="checker-sub">
        {posts.length} pending {posts.length === 1 ? 'item' : 'items'} to verify
      </p>

      {loading ? (
        <div className="loading-text">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="empty-text">No pending posts to verify!</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="checker-card">

              <div className="post-top">
                <span className={`post-badge ${post.type}`}>
                  {post.type === 'lost' ? 'Lost' : 'Found'}
                </span>
                <span className="post-date">
                  {post.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>

              {post.photoURL ? (
                <img
                  src={post.photoURL}
                  alt={post.title}
                  className="post-image"
                />
              ) : null}

              <h3 className="post-title">{post.title}</h3>
              <p className="post-desc">{post.description}</p>

              <div className="post-bottom">
                <span className="post-location">📍 {post.location}</span>
                <span className="post-name">by {post.userName}</span>
              </div>

              <div className="verdict-btns">
                <button
                  className="genuine-btn"
                  onClick={() => handleVerdict(post.id, 'genuine')}
                >
                  ✓ Genuine
                </button>
                <button
                  className="fraud-btn"
                  onClick={() => handleVerdict(post.id, 'fraud')}
                >
                  ✗ Fraud
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Checker;