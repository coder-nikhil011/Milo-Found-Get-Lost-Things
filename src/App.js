import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import CreatePost from './CreatePost/CreatePost';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/create-post' element={<CreatePost />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;