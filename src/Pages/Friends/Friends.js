import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../database/firebase';
import {
  collection, getDocs, query, where,
  addDoc, updateDoc, doc, getDoc
} from 'firebase/firestore';
import './Friends.css';

function Friends() {

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('friends');

  useEffect(() => {
    fetchFriends();
    fetchRequests();
  }, []);

  async function fetchFriends() {
    try {
      const q = query(
        collection(db, 'friendRequests'),
        where('status', '==', 'accepted'),
        where('participants', 'array-contains', auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const friendsList = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const friendId = data.participants.find(
          id => id !== auth.currentUser.uid
        );
        const friendDoc = await getDoc(doc(db, 'users', friendId));
        if (friendDoc.exists()) {
          friendsList.push({
            id: docSnap.id,
            friendId,
            ...friendDoc.data()
          });
        }
      }
      setFriends(friendsList);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  async function fetchRequests() {
    try {
      const q = query(
        collection(db, 'friendRequests'),
        where('receiverId', '==', auth.currentUser.uid),
        where('status', '==', 'pending')
      );
      const snapshot = await getDocs(q);
      const requestsList = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const senderDoc = await getDoc(doc(db, 'users', data.senderId));
        if (senderDoc.exists()) {
          requestsList.push({
            id: docSnap.id,
            senderId: data.senderId,
            ...senderDoc.data()
          });
        }
      }
      setRequests(requestsList);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  }

  async function acceptRequest(requestId) {
    try {
      await updateDoc(doc(db, 'friendRequests', requestId), {
        status: 'accepted',
        acceptedAt: new Date()
      });
      alert('Friend request accepted!');
      fetchFriends();
      fetchRequests();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  async function rejectRequest(requestId) {
    try {
      await updateDoc(doc(db, 'friendRequests', requestId), {
        status: 'rejected'
      });
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="friends-page">

      <div className="friends-header">
        <h2 className="friends-title">Friends</h2>
      </div>

      <div className="friends-tabs">
        <button
          className={`tab ${tab === 'friends' ? 'active' : ''}`}
          onClick={() => setTab('friends')}
        >
          Friends ({friends.length})
        </button>
        <button
          className={`tab ${tab === 'requests' ? 'active' : ''}`}
          onClick={() => setTab('requests')}
        >
          Requests ({requests.length})
        </button>
      </div>

      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : tab === 'friends' ? (
        friends.length === 0 ? (
          <div className="empty-text">No friends yet! Return an item to connect.</div>
        ) : (
          <div className="friends-list">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-avatar">
                  {friend.name?.charAt(0).toUpperCase()}
                </div>
                <div className="friend-info">
                  <p className="friend-name">{friend.name}</p>
                  <p className="friend-campus">{friend.campusId}</p>
                  <p className="friend-score">⭐ {friend.score || 0} pts</p>
                </div>
                <button
                  className="chat-btn"
                  onClick={() => navigate(`/chat/${friend.friendId}`)}
                >
                  Chat
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        requests.length === 0 ? (
          <div className="empty-text">No pending requests!</div>
        ) : (
          <div className="friends-list">
            {requests.map((req) => (
              <div key={req.id} className="friend-card">
                <div className="friend-avatar">
                  {req.name?.charAt(0).toUpperCase()}
                </div>
                <div className="friend-info">
                  <p className="friend-name">{req.name}</p>
                  <p className="friend-campus">{req.campusId}</p>
                </div>
                <div className="request-btns">
                  <button
                    className="accept-btn"
                    onClick={() => acceptRequest(req.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => rejectRequest(req.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

    </div>
  );
}

export default Friends;