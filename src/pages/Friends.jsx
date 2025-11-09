import React from 'react';

const Friends = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Friends</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Friends</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter friend's email"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
          />
          <button className="bg-eco-green text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors">
            Send Request
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Friend System</h2>
        <p className="text-gray-600">Compete with friends and see who's the eco-champion!</p>
        <p className="text-gray-500 text-sm mt-2">Friend features coming soon!</p>
      </div>
    </div>
  );
};

export default Friends;