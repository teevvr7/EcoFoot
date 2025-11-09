import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useActivities } from '../hooks/useActivities';

const Leaderboard = () => {
  const { user } = useAuth();
  const { getTotalPoints } = useActivities();

  const userPoints = getTotalPoints();
  
  // Mock leaderboard data - in real app this would come from backend
  const leaderboardData = [
    { rank: 1, name: 'Eco Warrior', points: 1250, isCurrentUser: false },
    { rank: 2, name: 'Green Giant', points: 980, isCurrentUser: false },
    { rank: 3, name: user?.displayName || 'You', points: userPoints, isCurrentUser: true },
    { rank: 4, name: 'Tree Hugger', points: 620, isCurrentUser: false },
    { rank: 5, name: 'Planet Saver', points: 580, isCurrentUser: false },
  ].sort((a, b) => b.points - a.points)
   .map((user, index) => ({ ...user, rank: index + 1 }));

  const getUserRank = () => {
    return leaderboardData.findIndex(player => player.isCurrentUser) + 1;
  };

  const userRank = getUserRank();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Global Leaderboard</h1>
      <p className="text-gray-600 mb-8">Compete with eco-warriors worldwide</p>

      {/* User's Current Rank */}
      <div className="bg-eco-green bg-opacity-10 border border-eco-green rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800">Your Position</div>
            <div className="text-sm text-gray-600">
              Rank #{userRank} with {userPoints} points
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
        
        {leaderboardData.map((player) => (
          <div key={player.rank} className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-200 ${
            player.isCurrentUser ? 'bg-eco-green bg-opacity-10' : ''
          }`}>
            <div className="col-span-1 flex items-center">
              {player.rank === 1 && <span className="text-yellow-500">🥇</span>}
              {player.rank === 2 && <span className="text-gray-500">🥈</span>}
              {player.rank === 3 && <span className="text-orange-500">🥉</span>}
              {player.rank > 3 && <span className="text-sm font-bold text-gray-600">#{player.rank}</span>}
            </div>
            <div className="col-span-8 flex items-center space-x-3">
              <span className={`font-medium ${
                player.isCurrentUser ? 'text-eco-green font-bold' : 'text-gray-800'
              }`}>
                {player.name}
                {player.isCurrentUser && ' (You)'}
              </span>
            </div>
            <div className="col-span-3 text-right">
              <div className="font-bold text-eco-blue text-lg">
                {player.points}
              </div>
              <div className="text-sm text-gray-600">points</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tips Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips to Climb Higher</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">🚲</span>
            <div>
              <div className="font-semibold">+50 points</div>
              <div className="text-gray-600">Bike 5km instead of driving</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">♻️</span>
            <div>
              <div className="font-semibold">+15 points</div>
              <div className="text-gray-600">Recycle 3 items</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">🌱</span>
            <div>
              <div className="font-semibold">+12 points</div>
              <div className="text-gray-600">Eat vegetarian meal</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <span className="text-eco-green text-lg">💡</span>
            <div>
              <div className="font-semibold">+18 points</div>
              <div className="text-gray-600">Use LED lights for 6 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;