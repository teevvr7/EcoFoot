import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LogActivity from './pages/LogActivity';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

// Navigation component that uses auth
function Navigation() {
  const { user } = useAuth();

  if (!user) {
    return null; // Don't show nav when logged out
  }

  return (
    <nav className="bg-eco-green text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">🌍 EcoFoot</Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/log" className="hover:underline">Log Activity</Link>
          <Link to="/friends" className="hover:underline">Friends</Link>
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<LogActivity />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;