import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useActivities } from '../hooks/useActivities';
import { subscribeToLeaderboard } from '../services/firebaseService';

const Leaderboard = () => {
  const { user, userProfile } = useAuth();
  const { getTotalPoints } = useActivities();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Subscribe to real-time leaderboard updates
    const unsubscribe = subscribeToLeaderboard((leaderboardData) => {
      setLeaderboard(leaderboardData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const userPoints = getTotalPoints();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Global Leaderboard</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Global Leaderboard</h1>
      <p className="text-gray-600 mb-8">Live competition with eco-warriors</p>

      {/* User's Current Rank */}
      <div className="bg-eco-green bg-opacity-10 border border-eco-green rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">Your Stats</div>
            <div className="text-sm text-gray-600">
              {userPoints} points • {userProfile?.totalCarbonReduced?.toFixed(1) || 0} kg carbon reduced
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-eco-green text-xl">{userPoints}</div>
            <div className="text-sm text-gray-600">your points</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-8">User</div>
          <div className="col-span-3 text-right">Points</div>
        </div>
        
        {leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No users on the leaderboard yet. Be the first!
          </div>
        ) : (
          leaderboard.map((player, index) => {
            const rank = index + 1;
            const isCurrentUser = user && player.id === user.uid;
            
            return (
              <div key={player.id} className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-200 ${
                isCurrentUser ? 'bg-eco-green bg-opacity-10' : ''
              } ${rank <= 3 ? 'bg-opacity-20' : ''}`}>
                <div className="col-span-1 flex items-center">
                  {rank === 1 && <span className="text-yellow-500">🥇</span>}
                  {rank === 2 && <span className="text-gray-500">🥈</span>}
                  {rank === 3 && <span className="text-orange-500">🥉</span>}
                  {rank > 3 && <span className="text-sm font-bold text-gray-600">#{rank}</span>}
                </div>
                <div className="col-span-8 flex items-center space-x-3">
                  <span className={`font-medium truncate ${
                    isCurrentUser ? 'text-eco-green font-bold' : 'text-gray-800'
                  }`}>
                    {player.displayName || player.email}
                    {isCurrentUser && ' (You)'}
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <div className="font-bold text-eco-blue text-lg">
                    {player.totalPoints || 0}
                  </div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Tips Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Earn More Points</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">🚲</span>
            <div>
              <div className="font-semibold">Bike 5km</div>
              <div className="text-gray-600">+50 points</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">🌱</span>
            <div>
              <div className="font-semibold">Vegan meal</div>
              <div className="text-gray-600">+15 points</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">♻️</span>
            <div>
              <div className="font-semibold">Recycle 5 items</div>
              <div className="text-gray-600">+25 points</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">💡</span>
            <div>
              <div className="font-semibold">LED lights 5h</div>
              <div className="text-gray-600">+15 points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;