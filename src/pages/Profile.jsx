import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useActivities } from '../hooks/useActivities';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const { activities, getTotalPoints, getTotalCarbonReduced } = useActivities();
  const navigate = useNavigate();

  const totalPoints = getTotalPoints();
  const totalCarbonReduced = getTotalCarbonReduced();
  
  const positiveActivities = activities.filter(a => a.points > 0).length;
  const negativeActivities = activities.filter(a => a.points < 0).length;
  const successRate = activities.length > 0 ? (positiveActivities / activities.length) * 100 : 0;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const stats = [
    { label: 'Total Points', value: totalPoints, color: 'text-eco-blue', icon: '🏆' },
    { label: 'Carbon Reduced', value: `${totalCarbonReduced.toFixed(1)} kg`, color: 'text-eco-green', icon: '🌱' },
    { label: 'Activities Logged', value: activities.length, color: 'text-eco-yellow', icon: '📊' },
    { label: 'Success Rate', value: `${successRate.toFixed(1)}%`, color: 'text-eco-green', icon: '✅' },
  ];

  const getRank = (points) => {
    if (points < 100) return { name: 'Eco Beginner', color: 'text-gray-600' };
    if (points < 500) return { name: 'Green Enthusiast', color: 'text-eco-green' };
    if (points < 1000) return { name: 'Planet Protector', color: 'text-eco-blue' };
    return { name: 'Eco Warrior', color: 'text-eco-yellow' };
  };

  const rank = getRank(totalPoints);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Display Name</label>
                <p className="mt-1 text-gray-900 font-medium">{user?.displayName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Eco Rank</label>
                <p className={`mt-1 font-medium ${rank.color}`}>{rank.name}</p>
              </div>
            </div>
          </div>

          {/* Activity Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-eco-green">{positiveActivities}</div>
                <div className="text-sm text-gray-600">Eco-Friendly</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-eco-red">{negativeActivities}</div>
                <div className="text-sm text-gray-600">Carbon Heavy</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Impact</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Actions</h3>
            <button
              onClick={handleLogout}
              className="w-full bg-eco-red text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors mb-3"
            >
              Sign Out
            </button>
            <button 
              onClick={() => navigate('/log')}
              className="w-full border border-eco-green text-eco-green py-2 px-4 rounded-lg font-medium hover:bg-eco-green hover:text-white transition-colors"
            >
              Log New Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;