import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  subscribeToUserActivities, 
  logActivity, 
  updateUserProfile 
} from '../services/firebaseService';

export const useActivities = () => {
  const { user, userProfile } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Real-time subscription to activities
  useEffect(() => {
    if (!user) {
      setActivities([]);
      return;
    }

    const unsubscribe = subscribeToUserActivities(user.uid, (userActivities) => {
      setActivities(userActivities);
    });

    return unsubscribe;
  }, [user]);

  const addActivity = async (activityData) => {
    if (!user) throw new Error('User must be logged in');

    setLoading(true);
    try {
      // Add user ID to activity data
      const activityWithUser = {
        ...activityData,
        userId: user.uid,
        userName: userProfile?.displayName || user.email
      };

      // Save activity to Firebase
      await logActivity(activityWithUser);

      // Update user's total points and carbon reduced
      if (userProfile) {
        const newTotalPoints = (userProfile.totalPoints || 0) + activityData.points;
        const newCarbonReduced = (userProfile.totalCarbonReduced || 0) + Math.max(0, -activityData.co2);
        
        await updateUserProfile(user.uid, {
          totalPoints: newTotalPoints,
          totalCarbonReduced: newCarbonReduced
        });
      }

    } catch (error) {
      console.error('Error adding activity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTodayActivities = () => {
    const today = new Date().toDateString();
    return activities.filter(activity => {
      if (!activity.timestamp) return false;
      const activityDate = new Date(activity.timestamp.toDate()).toDateString();
      return activityDate === today;
    });
  };

  const getTotalPoints = () => {
    return userProfile?.totalPoints || 0;
  };

  const getTotalCarbonReduced = () => {
    return userProfile?.totalCarbonReduced || 0;
  };

  return {
    activities,
    addActivity,
    loading,
    getTodayActivities,
    getTotalPoints,
    getTotalCarbonReduced
  };
};