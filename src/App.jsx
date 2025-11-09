import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LogActivity from './pages/LogActivity';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Footer from './components/Footer';

// Navigation component that uses auth
function Navigation() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!user) {
    return null; // Don't show nav when logged out
  }

  return (
    <nav className="bg-eco-green text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">🌍 EcoFoot</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/log" className="hover:underline">Log Activity</Link>
          <Link to="/friends" className="hover:underline">Friends</Link>
          <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link to="/" className="block py-2 hover:underline">Dashboard</Link>
          <Link to="/log" className="block py-2 hover:underline">Log Activity</Link>
          <Link to="/friends" className="block py-2 hover:underline">Friends</Link>
          <Link to="/leaderboard" className="block py-2 hover:underline">Leaderboard</Link>
          <Link to="/profile" className="block py-2 hover:underline">Profile</Link>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/log" element={<LogActivity />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;