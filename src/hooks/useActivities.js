import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);

  // Load activities from localStorage
  useEffect(() => {
    if (user) {
      const savedActivities = localStorage.getItem(`ecofoot-activities-${user.uid}`);
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }
    }
  }, [user]);

  const addActivity = (activityData) => {
    if (!user) throw new Error('User must be logged in');

    const newActivity = {
      id: Date.now().toString(),
      ...activityData,
      userId: user.uid,
      timestamp: new Date().toISOString()
    };

    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    
    // Save to localStorage
    localStorage.setItem(`ecofoot-activities-${user.uid}`, JSON.stringify(updatedActivities));

    return newActivity;
  };

  const getTodayActivities = () => {
    const today = new Date().toDateString();
    return activities.filter(activity => {
      const activityDate = new Date(activity.timestamp).toDateString();
      return activityDate === today;
    });
  };

  const getTotalPoints = () => {
    return activities.reduce((total, activity) => total + activity.points, 0);
  };

  const getTotalCarbonReduced = () => {
    return activities.reduce((total, activity) => total + Math.max(0, -activity.co2), 0);
  };

  return {
    activities,
    addActivity,
    getTodayActivities,
    getTotalPoints,
    getTotalCarbonReduced
  };
};