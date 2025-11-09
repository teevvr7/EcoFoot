import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useActivities } from '../hooks/useActivities';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, userProfile, logout } = useAuth();
  const displayName = user?.displayName || userProfile?.displayName || 'Friend';
  const { getTodayActivities, getTotalPoints, getTotalCarbonReduced } = useActivities();
  const navigate = useNavigate();

  const todayActivities = getTodayActivities();
  const totalPoints = getTotalPoints();
  const totalCarbonReduced = getTotalCarbonReduced();

  const calculateTodayStats = () => {
    const todayCarbon = todayActivities.reduce((sum, activity) => sum + activity.co2, 0);
    const todayPoints = todayActivities.reduce((sum, activity) => sum + activity.points, 0);

    return {
      carbonScore: Math.max(0, todayCarbon),
      points: todayPoints,
      activityCount: todayActivities.length,
      trend: todayPoints >= 0 ? 'improving' : 'worsening'
    };
  };

  const todayStats = calculateTodayStats();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {displayName}!
          </h1>
          <p className="text-gray-600">Track your environmental impact</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-eco-red text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Carbon</h3>
          <p className="text-2xl font-bold text-eco-green">{todayStats.carbonScore.toFixed(1)} kg CO₂</p>
          <p className="text-sm text-gray-600">{todayStats.activityCount} activities</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Points</h3>
          <p className="text-2xl font-bold text-eco-blue">{todayStats.points} pts</p>
          <p className="text-sm text-gray-600">Earned today</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Points</h3>
          <p className="text-2xl font-bold text-eco-yellow">{totalPoints} pts</p>
          <p className="text-sm text-gray-600">All time</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Carbon Reduced</h3>
          <p className="text-2xl font-bold text-eco-green">{totalCarbonReduced.toFixed(1)} kg</p>
          <p className="text-sm text-gray-600">Total saved</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/log')}
            className="bg-eco-green text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Log Activity
          </button>
          <button 
            onClick={() => navigate('/friends')}
            className="bg-eco-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            View Friends
          </button>
          <button 
            onClick={() => navigate('/leaderboard')}
            className="bg-eco-yellow text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Leaderboard
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Your Profile
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      {todayActivities.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Activities</h2>
          <div className="space-y-3">
            {todayActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{activity.name}</div>
                  <div className="text-sm text-gray-600">{activity.quantity} {activity.quantity === 1 ? 'unit' : 'units'}</div>
                </div>
                <div className={`font-medium ${
                  activity.points > 0 ? 'text-eco-green' : 'text-eco-red'
                }`}>
                  {activity.points > 0 ? '+' : ''}{activity.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;