export const carbonData = {
  transport: {
    car_km: { co2: 0.21, points: -5, name: "Car Travel" },
    bus_km: { co2: 0.08, points: 2, name: "Bus Travel" },
    train_km: { co2: 0.06, points: 3, name: "Train Travel" },
    bike_km: { co2: -0.05, points: 10, name: "Bike Ride" },
    walk_km: { co2: -0.02, points: 8, name: "Walking" }
  },
  food: {
    beef_meal: { co2: 3.0, points: -15, name: "Beef Meal" },
    chicken_meal: { co2: 1.5, points: -8, name: "Chicken Meal" },
    vegetarian_meal: { co2: -0.5, points: 12, name: "Vegetarian Meal" },
    vegan_meal: { co2: -0.8, points: 15, name: "Vegan Meal" },
    local_produce: { co2: -0.3, points: 8, name: "Local Produce" }
  },
  waste: {
    recycled_plastic: { co2: -0.1, points: 5, name: "Recycled Plastic" },
    recycled_paper: { co2: -0.08, points: 4, name: "Recycled Paper" },
    recycled_glass: { co2: -0.12, points: 6, name: "Recycled Glass" },
    wasted_food: { co2: 0.5, points: -10, name: "Wasted Food" },
    composted: { co2: -0.3, points: 12, name: "Composted" }
  },
  energy: {
    led_light: { co2: -0.02, points: 3, name: "LED Light Use" },
    incandescent_light: { co2: 0.06, points: -4, name: "Incandescent Light" },
    turned_off_appliance: { co2: -0.1, points: 6, name: "Turned Off Appliance" },
    solar_power: { co2: -0.15, points: 10, name: "Solar Power" }
  }
};

export const calculateActivityImpact = (category, activity, quantity) => {
  const activityData = carbonData[category]?.[activity];
  if (!activityData) return { co2: 0, points: 0, name: "Unknown Activity" };
  
  return {
    co2: activityData.co2 * quantity,
    points: activityData.points * quantity,
    name: activityData.name
  };
};