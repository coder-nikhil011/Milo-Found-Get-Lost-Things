import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Database/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Loader from '../../components/Loader';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfile(); }, []);

  async function fetchProfile() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) { navigate('/'); return; }
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        setUser({ name: currentUser.displayName || 'User', email: currentUser.email, campusId: '', score: 0, role: 'student' });
      }
      const q = query(collection(db, 'posts'), where('userId', '==', currentUser.uid));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) { console.log(error); }
    setLoading(false);
  }

  if (loading) return <Loader />;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate('/home')}>← Back</button>
        <h2 className="profile-title">My Profile</h2>
        <button className="logout-btn" onClick={() => { auth.signOut(); navigate('/'); }}>Logout</button>
      </div>
      <div className="profile-card">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>
        <p className="profile-campus">Campus ID: {user?.campusId || 'Not set'}</p>
      </div>
      <div className="score-card">
        <div className="score-item">
          <h3 className="score-number">{user?.score || 0}</h3>
          <p className="score-label">Trust Score</p>
        </div>
        <div className="score-divider"></div>
        <div className="score-item">
          <h3 className="score-number">{posts.length}</h3>
          <p className="score-label">Total Posts</p>
        </div>
        <div className="score-divider"></div>
        <div className="score-item">
          <h3 className="score-number">{posts.filter(p => p.status === 'returned').length}</h3>
          <p className="score-label">Returned</p>
        </div>
      </div>
      {user?.role === 'checker' && (
        <button className="checker-btn" onClick={() => navigate('/checker')}>Go to Checker Dashboard</button>
      )}
      {user?.role === 'admin' && (
        <button className="checker-btn" onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
      )}
      <h3 className="my-posts-title">My Posts</h3>
      {posts.length === 0 ? (
        <div className="empty-text">No posts yet!</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)} style={{cursor:'pointer'}}>
              <div className="post-top">
                <span className={`post-badge ${post.type}`}>{post.type === 'lost' ? 'Lost' : 'Found'}</span>
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </div>
              {post.photoURL ? <img src={post.photoURL} alt={post.title} className="post-image" /> : null}
              <h3 className="post-title">{post.title}</h3>
              <p className="post-desc">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;