import React, { useState, useEffect } from 'react';
import { db } from '../../Database/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import './Leaderboard.css';

function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard() {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('score', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      const usersList = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  }

  function getRankStyle(rank) {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'rank-normal';
  }

  function getRankIcon(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  }

  return (
    <div className="leaderboard-page">

      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <p className="leaderboard-sub">Top honest finders this month</p>
      </div>

      {loading ? (
        <div className="loading-text">Loading leaderboard...</div>
      ) : users.length === 0 ? (
        <div className="empty-text">No scores yet!</div>
      ) : (
        <>
          <div className="top-three">
            {users.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className={`top-card ${getRankStyle(user.rank)}`}
              >
                <div className="top-rank">{getRankIcon(user.rank)}</div>
                <div className="top-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <p className="top-name">{user.name?.split(' ')[0]}</p>
                <p className="top-score">{user.score} pts</p>
              </div>
            ))}
          </div>

          <div className="rest-list">
            {users.slice(3).map((user) => (
              <div key={user.id} className="rest-card">
                <span className="rest-rank">#{user.rank}</span>
                <div className="rest-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="rest-info">
                  <p className="rest-name">{user.name}</p>
                  <p className="rest-campus">{user.campusId}</p>
                </div>
                <span className="rest-score">{user.score} pts</span>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Leaderboard;