const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet-controller');
const exerciseController = require('../controllers/exercise-controller');
const goalController = require('../controllers/goal-controller');
const mealController = require('../controllers/meal-controller');
const consumableController = require('../controllers/consumable-controller');

const tracking = require('../json/tracking.json');

router.get('/', async (req, res) => {
    if (!res.locals.loggedIn) {
        return res.redirect('/users/login');
    }

    const range = parseInt(req.query.range) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);
    const startDateString = startDate.toISOString().split('T')[0];

    const dietEntries = await dietController.fetchAll(req, res, startDateString);

    // Calories eaten
    let caloriesEaten = [];
    if (dietEntries && Array.isArray(dietEntries)) {
        for (let i = 0; i < dietEntries.length; i++) {
            const diet = dietEntries[i];
            const mealConsumables = await mealController.fetchAllMealConsumables(req, res, diet.MealID);
            let totalCalories = 0;
            for (let j = 0; j < (mealConsumables || []).length; j++) {
                const mealConsumable = mealConsumables[j];
                const consumable = await consumableController.getConsumable(req, res, mealConsumable.ConsumableID);
                if (consumable) {
                    totalCalories += consumable[0].Calories;
                }
            }
            if (diet.Date) {
                caloriesEaten.push({
                    date: new Date(diet.Date).toISOString().split('T')[0],
                    'Calories eaten': totalCalories
                });
            }
        };
    };

    // Exercises
    const distances = [];
    const durations = [];
    const caloriesBurned = [];
    const exerciseEntries = await exerciseController.fetchAll(req, res, startDateString);
    if (exerciseEntries && Array.isArray(exerciseEntries)) {
        for (let i = 0; i < exerciseEntries.length; i++) {
            const entry = exerciseEntries[i];
            const date = new Date(entry.Date).toISOString().split('T')[0];
            distances.push({date, 'Distance': entry.Distance});
            durations.push({date, 'Duration': entry.Duration});
            caloriesBurned.push({date, 'Calories burned': entry.Calories});
        }
    }

    // Date
    const filteredDates = [];
    for (let i = 0; i <= range; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        filteredDates.push(date.toISOString().split('T')[0]);
    }

    const data = {
        caloriesEaten,
        exercises: {
            distance: distances,
            duration: durations,
            calories: caloriesBurned
        }
    };

    const selectedMetrics = req.query.metric ? Array.isArray(req.query.metric) ? req.query.metric : [req.query.metric] : [];
    const rawGoals = await goalController.fetchAll(req, res, startDateString);

    // Transform it into a grouped structure
    const goals = {
        CaloriesBurned: [],
        CaloriesEaten: [],
        Distance: [],
        Duration: []
    };

    for (let i = 0; i < (rawGoals || []).length; i++) {
        const goal = rawGoals[i];
        const date = goal.Date || new Date().toISOString().split('T')[0]; // fallback date
        if (goal.CaloriesBurned) {
            goals.CaloriesBurned.push({date, value: goal.CaloriesBurned});
        }
        if (goal.CaloriesEaten) {
            goals.CaloriesEaten.push({date, value: goal.CaloriesEaten});
        }
        if (goal.Distance) {
            goals.Distance.push({date, value: goal.Distance});
        }
        if (goal.Duration) {
            goals.Duration.push({date, value: goal.Duration});
        }
    }

    res.render('../src/views/pages/tracking', {
        tracking: tracking,
        range,
        filteredDates: filteredDates,
        selectedMetrics,
        data,
        goals
    });
});

module.exports = router;
