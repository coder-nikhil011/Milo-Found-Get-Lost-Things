
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../../Database/firebase';
import {
    doc, getDoc, updateDoc, increment, addDoc, collection
} from 'firebase/firestore';
import './PostDetail.css';

function PostDetail() {

    const navigate = useNavigate();
    const { postId } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchPost();
    }, []);

    async function fetchPost() {
        try {
            const postDoc = await getDoc(doc(db, 'posts', postId));

            if (postDoc.exists()) {
                setPost({ id: postDoc.id, ...postDoc.data() });
            }

        } catch (error) {
            alert('Error: ' + error.message);
        }

        setLoading(false);
    }

    async function handleMarkReturned() {

        if (!post.checkerApproved) {
            alert('Checker has not approved this post yet!');
            return;
        }

        if (post.status === 'returned') {
            alert('This item is already returned!');
            return;
        }

        setUpdating(true);

        try {
            // Update post
            await updateDoc(doc(db, 'posts', postId), {
                status: 'returned',
                returnedAt: new Date()
            });

            // Increase user score
            await updateDoc(doc(db, 'users', post.userId), {
                score: increment(10)
            });

            alert('Item marked as returned! +10 points added!');
            navigate('/home');

        } catch (error) {
            alert('Error: ' + error.message);
        }

        setUpdating(false);
    }

    // ✅ FIXED: Friend Request Function
    async function sendFriendRequest() {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                alert('Please login first');
                return;
            }

            if (currentUser.uid === post.userId) {
                alert("You can't send request to yourself!");
                return;
            }

            await addDoc(collection(db, 'friendRequests'), {
                from: currentUser.uid,
                to: post.userId,
                postId: post.id,
                status: 'pending',
                createdAt: new Date()
            });

            alert('Friend request sent!');

        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    const isOwner = auth.currentUser?.uid === post?.userId;

    if (loading) {
        return <div className="loading-text">Loading...</div>;
    }

    if (!post) {
        return <div className="loading-text">Post not found!</div>;
    }

    return (
        <div className="detail-page">

            {/* Header */}
            <div className="detail-header">
                <button className="back-btn" onClick={() => navigate('/home')}>
                    ← Back
                </button>
                <h2 className="detail-title">Item Detail</h2>
            </div>

            {/* Card */}
            <div className="detail-card">

                <div className="post-top">
                    <span className={`post-badge ${post.type}`}>
                        {post.type === 'lost' ? 'Lost' : 'Found'}
                    </span>

                    <span className={`status-badge ${post.status}`}>
                        {post.status}
                    </span>
                </div>

                {post.photoURL && (
                    <img
                        src={post.photoURL}
                        alt={post.title}
                        className="detail-image"
                    />
                )}

                <h2 className="detail-item-title">{post.title}</h2>
                <p className="detail-desc">{post.description}</p>

                {/* Info */}
                <div className="detail-info">

                    <div className="info-row">
                        <span className="info-label">Location</span>
                        <span className="info-value">📍 {post.location}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Posted by</span>
                        <span className="info-value">{post.userName}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Date</span>
                        <span className="info-value">
                            {post.createdAt?.toDate().toLocaleDateString()}
                        </span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Checker Status</span>
                        <span className={`info-value ${post.checkerApproved ? 'approved' : 'pending'}`}>
                            {post.checkerApproved ? '✓ Approved' : '⏳ Pending'}
                        </span>
                    </div>

                </div>

                {/* Mark Returned Button */}
                {isOwner && post.status !== 'returned' && (
                    <button
                        className="returned-btn"
                        onClick={handleMarkReturned}
                        disabled={updating}
                    >
                        {updating ? 'Updating...' : 'Mark as Returned (+10 pts)'}
                    </button>
                )}

                {/* Returned Section */}
                {post.status === 'returned' && (
                    <div className="returned-msg">

                        {!isOwner && (
                            <button
                                className="friend-req-btn"
                                onClick={sendFriendRequest}
                            >
                                + Send Friend Request
                            </button>
                        )}

                        Item successfully returned! 🎉
                    </div>
                )}

            </div>

        </div>
    );
}

export default PostDetail;

