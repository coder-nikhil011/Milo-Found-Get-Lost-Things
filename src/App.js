import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import CreatePost from './createPost/CreatePost';
import Profile from './Pages/Profile/Profile';
import BottomNav from './components/BottomNav';
import Leaderboard from './Pages/Leaderboard/Leaderboard';

function Layout() {
  const location = useLocation();
  const hideNav = ['/', '/register'];
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      {!hideNav.includes(location.pathname) && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;