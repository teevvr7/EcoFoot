import React, { useState } from 'react';
import { useActivities } from '../hooks/useActivities';
import { carbonData, calculateActivityImpact } from '../utils/carbonCalculator';
import { useNavigate } from 'react-router-dom';

const LogActivity = () => {
  const { addActivity } = useActivities();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('transport');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [impact, setImpact] = useState({ co2: 0, points: 0, name: '' });

  const categories = {
    transport: '🚗 Transport',
    food: '🍽️ Food',
    waste: '🗑️ Waste',
    energy: '⚡ Energy'
  };

  const handleActivityChange = (activity) => {
    setSelectedActivity(activity);
    if (activity && quantity > 0) {
      const calculatedImpact = calculateActivityImpact(selectedCategory, activity, quantity);
      setImpact(calculatedImpact);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    if (selectedActivity && newQuantity > 0) {
      const calculatedImpact = calculateActivityImpact(selectedCategory, selectedActivity, newQuantity);
      setImpact(calculatedImpact);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedActivity) {
      alert('Please select an activity');
      return;
    }

    try {
      await addActivity({
        category: selectedCategory,
        activity: selectedActivity,
        quantity,
        co2: impact.co2,
        points: impact.points,
        name: impact.name
      });

      alert('Activity logged successfully! 🎉');
      
      // Reset form
      setSelectedActivity('');
      setQuantity(1);
      setImpact({ co2: 0, points: 0, name: '' });
      
      // Navigate back to dashboard
      navigate('/');
      
    } catch (error) {
      alert('Failed to log activity: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Log New Activity</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedCategory(key);
                  setSelectedActivity('');
                  setImpact({ co2: 0, points: 0, name: '' });
                }}
                className={`p-3 rounded-lg border-2 text-center transition-colors ${
                  selectedCategory === key
                    ? 'border-eco-green bg-eco-green text-white'
                    : 'border-gray-300 hover:border-eco-green'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Activity
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.keys(carbonData[selectedCategory] || {}).map((activity) => {
              const activityInfo = carbonData[selectedCategory][activity];
              return (
                <button
                  key={activity}
                  type="button"
                  onClick={() => handleActivityChange(activity)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedActivity === activity
                      ? 'border-eco-green bg-green-50'
                      : 'border-gray-300 hover:border-eco-green'
                  }`}
                >
                  <div className="font-medium">{activityInfo.name}</div>
                  <div className={`text-sm ${
                    activityInfo.points > 0 ? 'text-eco-green' : 'text-eco-red'
                  }`}>
                    {activityInfo.points > 0 ? '+' : ''}{activityInfo.points} pts
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green focus:border-transparent"
          />
        </div>

        {/* Impact Preview */}
        {selectedActivity && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Impact Preview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-xl font-bold ${
                  impact.co2 < 0 ? 'text-eco-green' : 'text-eco-red'
                }`}>
                  {impact.co2 > 0 ? '+' : ''}{impact.co2.toFixed(2)} kg CO₂
                </div>
                <div className="text-sm text-gray-600">Carbon Impact</div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${
                  impact.points > 0 ? 'text-eco-green' : 'text-eco-red'
                }`}>
                  {impact.points > 0 ? '+' : ''}{impact.points} pts
                </div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedActivity}
          className="w-full bg-eco-green text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Log Activity
        </button>
      </form>
    </div>
  );
};

export default LogActivity;