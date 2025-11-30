
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreateEdit from './pages/CreateEdit';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './state/auth.context';

function Nav(){
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {user ? (
        <div>
          <Link to="/posts/new">Create</Link>
          <Link to="/profile">{user.username}</Link>
          <button onClick={logout} className="btn">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <div className="app">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/new" element={<CreateEdit />} />
          <Route path="/posts/:id/edit" element={<CreateEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
