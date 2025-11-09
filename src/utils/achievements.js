export const achievements = [
  {
    id: 'first_activity',
    name: 'Getting Started',
    description: 'Log your first activity',
    icon: '🎯',
    reward: 50,
    condition: (activities) => activities.length >= 1
  },
  {
    id: 'points_100',
    name: 'Century Club',
    description: 'Reach 100 total points',
    icon: '💯',
    reward: 25,
    condition: (activities, totalPoints) => totalPoints >= 100
  },
  {
    id: 'points_500',
    name: 'Point Collector',
    description: 'Reach 500 total points',
    icon: '🏆',
    reward: 100,
    condition: (activities, totalPoints) => totalPoints >= 500
  },
  {
    id: 'carbon_10',
    name: 'Carbon Crusader',
    description: 'Reduce 10kg of carbon',
    icon: '🦸',
    reward: 50,
    condition: (activities, totalPoints, carbonReduced) => carbonReduced >= 10
  },
  {
    id: 'activities_10',
    name: 'Consistent Contributor',
    description: 'Log 10 activities',
    icon: '📊',
    reward: 30,
    condition: (activities) => activities.length >= 10
  },
  {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Log only positive activities for a day',
    icon: '⭐',
    reward: 20,
    condition: (activities, totalPoints, carbonReduced, todayActivities) => 
      todayActivities.length > 0 && todayActivities.every(a => a.points > 0)
  }
];

export const checkAchievements = (activities, totalPoints, carbonReduced, todayActivities, currentAchievements = []) => {
  const unlocked = [];
  const currentIds = currentAchievements.map(a => a.id);

  for (const achievement of achievements) {
    if (!currentIds.includes(achievement.id) && 
        achievement.condition(activities, totalPoints, carbonReduced, todayActivities)) {
      unlocked.push(achievement);
    }
  }

  return unlocked;
};