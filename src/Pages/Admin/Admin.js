import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Database/firebase';
import {
  collection, getDocs, query,
  orderBy, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import './Admin.css';

function Admin() {

  const navigate = useNavigate();
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  async function fetchUsers() {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('score', 'desc')
      );
      const snapshot = await getDocs(q);
      const usersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  }

  async function fetchPosts() {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
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
  }

  async function changeRole(userId, newRole) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole
      });
      setUsers(users.map(u =>
        u.id === userId ? { ...u, role: newRole } : u
      ));
      alert('Role updated to ' + newRole + '!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  async function deletePost(postId) {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter(p => p.id !== postId));
      alert('Post deleted!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  async function resetScore(userId) {
    if (!window.confirm('Reset this user score to 0?')) return;
    try {
      await updateDoc(doc(db, 'users', userId), {
        score: 0
      });
      setUsers(users.map(u =>
        u.id === userId ? { ...u, score: 0 } : u
      ));
      alert('Score reset!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  const fraudPosts = posts.filter(p => p.checkerVerdict === 'fraud');

  return (
    <div className="admin-page">

      <div className="admin-header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ← Back
        </button>
        <h2 className="admin-title">Admin Dashboard</h2>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <h3 className="stat-number">{users.length}</h3>
          <p className="stat-label">Total Users</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">{posts.length}</h3>
          <p className="stat-label">Total Posts</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-number">{fraudPosts.length}</h3>
          <p className="stat-label">Fraud Cases</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${tab === 'users' ? 'active' : ''}`}
          onClick={() => setTab('users')}
        >
          Users
        </button>
        <button
          className={`tab ${tab === 'posts' ? 'active' : ''}`}
          onClick={() => setTab('posts')}
        >
          Posts
        </button>
        <button
          className={`tab ${tab === 'fraud' ? 'active' : ''}`}
          onClick={() => setTab('fraud')}
        >
          Fraud ({fraudPosts.length})
        </button>
      </div>

      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : tab === 'users' ? (
        <div className="list">
          {users.map((user) => (
            <div key={user.id} className="admin-card">
              <div className="admin-card-top">
                <div className="admin-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="admin-info">
                  <p className="admin-name">{user.name}</p>
                  <p className="admin-email">{user.email}</p>
                  <p className="admin-campus">{user.campusId}</p>
                </div>
                <div className="admin-score-badge">
                  ⭐ {user.score || 0}
                </div>
              </div>
              <div className="admin-actions">
                <select
                  className="role-select"
                  value={user.role}
                  onChange={(e) => changeRole(user.id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="checker">Checker</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  className="reset-btn"
                  onClick={() => resetScore(user.id)}
                >
                  Reset Score
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : tab === 'posts' ? (
        <div className="list">
          {posts.map((post) => (
            <div key={post.id} className="admin-card">
              <div className="post-top">
                <span className={`post-badge ${post.type}`}>
                  {post.type === 'lost' ? 'Lost' : 'Found'}
                </span>
                <span className={`verdict-badge ${post.checkerVerdict}`}>
                  {post.checkerVerdict || 'pending'}
                </span>
              </div>
              <p className="post-title">{post.title}</p>
              <p className="post-desc">{post.description}</p>
              <div className="post-meta">
                <span>by {post.userName}</span>
                <span>📍 {post.location}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Delete Post
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="list">
          {fraudPosts.length === 0 ? (
            <div className="empty-text">No fraud cases!</div>
          ) : (
            fraudPosts.map((post) => (
              <div key={post.id} className="admin-card fraud-card">
                <div className="fraud-tag">⚠️ Fraud Detected</div>
                <p className="post-title">{post.title}</p>
                <p className="post-desc">{post.description}</p>
                <div className="post-meta">
                  <span>by {post.userName}</span>
                  <span>📍 {post.location}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deletePost(post.id)}
                >
                  Delete Post
                </button>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default Admin;