const express = require('express');
const router = express.Router();

// Importing JSON files to access page content
const landing = require('../json/landing.json');
const dashboard = require('../json/dashboard.json');

const goalController = require('../controllers/goal-controller');

router.get('/', async(req, res) => {
    if(res.locals.loggedIn) {
        const goals = await goalController.fetchAll(req, res, null) || [];
        if(goals.length > 0){
            let count = 1;
            const today = new Date();
            today.setHours(0,0,0,0);
            goals.forEach(goal => {
                goal.count = count;
                count++;
                switch (goal.Type) {
                    case "Duration exercised":
                        goal.value = goal.Duration;
                        break;
                    case "Distance covered":
                        goal.value = goal.Distance;
                        break;
                    case "Calories burned (per day)":
                        goal.value = goal.CaloriesBurned;
                        break;
                    case "Calories eaten (per day)":
                        goal.value = goal.CaloriesEaten;
                        break;
                    case "Target weight":
                        goal.value = goal.Weight;
                        break;
                    default:
                        goal.value = "No goal";
                }
                const goalDate = new Date(goal.Date);
                goalDate.setHours(0,0,0,0);
                if (!goal.Completed) {
                    goal.expired = goalDate < today ? true : false;
                } 
                else {
                    goal.expired = false;
                }
            });
            res.locals.activeGoals = goals.filter(goal => !goal.Completed && !goal.expired);
            res.locals.completedGoals = goals.filter(goal => goal.Completed);
        } 
        else {
            res.locals.activeGoals = [];
            res.locals.completedGoals = [];
        }
        res.render('../src/views/pages/dashboard', {
            dashboard: dashboard,
            user: res.locals.user,
            goals: goals,
            activeGoals: res.locals.activeGoals,
            completedGoals: res.locals.completedGoals
        });
    } else {
        res.render('../src/views/pages/landing', {
            landing: landing
        });
    }
});

module.exports = router;