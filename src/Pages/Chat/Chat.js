import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../../Database/firebase';
import {
  collection, addDoc, query,
  orderBy, onSnapshot, doc, getDoc
} from 'firebase/firestore';
import './Chat.css';

function Chat() {

  const navigate = useNavigate();
  const { friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const chatId = [auth.currentUser.uid, friendId].sort().join('_');

  useEffect(() => {
    fetchFriend();
    listenMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function fetchFriend() {
    try {
      const friendDoc = await getDoc(doc(db, 'users', friendId));
      if (friendDoc.exists()) {
        setFriend(friendDoc.data());
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  }

  function listenMessages() {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesList);
    });

    return unsubscribe;
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: newMessage,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || 'User',
        createdAt: new Date()
      });
      setNewMessage('');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const isMyMessage = (msg) => msg.senderId === auth.currentUser.uid;

  if (loading) {
    return <div className="loading-text">Loading chat...</div>;
  }

  return (
    <div className="chat-page">

      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate('/friends')}>
          ← Back
        </button>
        <div className="chat-friend-info">
          <div className="chat-avatar">
            {friend?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="chat-friend-name">{friend?.name}</p>
            <p className="chat-friend-campus">{friend?.campusId}</p>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            Say hello to {friend?.name}! 👋
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-wrapper ${isMyMessage(msg) ? 'my-message' : 'their-message'}`}
            >
              <div className={`message-bubble ${isMyMessage(msg) ? 'my-bubble' : 'their-bubble'}`}>
                <p className="message-text">{msg.text}</p>
                <p className="message-time">
                  {msg.createdAt?.toDate().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-btn" onClick={sendMessage}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

    </div>
  );
}

export default Chat;