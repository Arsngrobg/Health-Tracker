const express = require('express');
const router = express.Router();

// Importing JSON files to access page content
const landing = require('../json/landing.json');
const dashboard = require('../json/dashboard.json');

const goalController = require('../controllers/goal-controller');

router.get('/', async(req, res) => {
    if(res.locals.loggedIn) {
        const goals = await goalController.fetchAll(req, res) || [];
        if(goals != []){
            let count = 1;

            goals.forEach(goal => {
                goal["Count"] = count;
                
                if(goal.type == "Weight"){
                    goal["value"] = goal.Weight;
                }
                if(goal.type == "Calories"){
                    goal["value"] = goal.Calories;
                }
                if(goal.type == "Duration"){
                    goal["value"] = goal.Duration;
                }
                if(goal.type == "Distance"){
                    goal["value"] = goal.Distance;
                }

                count++;
            });
        }
        
        console.log(goals);

        res.render('../src/views/pages/dashboard', {
            dashboard: dashboard,
            user: res.locals.user,
            goals: goals
        });
    }
    else {
        res.render('../src/views/pages/landing', {
            landing: landing
        });
    }
});

module.exports = router;