const express = require('express');
const router = express.Router();

// Importing JSON files to access page content
const landing = require('../json/landing.json');
const dashboard = require('../json/dashboard.json');

const goalController = require('../controllers/goal-controller');

router.get('/', async(req, res) => {
    if(res.locals.loggedIn) {
        const goals = await goalController.fetchAll(req, res, null) || [];
        if(goals != []){
            let count = 1;

            goals.forEach(goal => {
                goal["Count"] = count;

                count++;

                switch (goal.Type)
                {
                    case "Weight":
                        goal["value"] = goal.Weight;
                        break;
                    case "CaloriesBurned":
                        goal["value"] = goal.CaloriesBurned;
                        break;
                    case "CaloriesEaten":
                        goal["value"] = goal.CaloriesEaten;
                        break;
                    case "Duration":
                        goal["value"] = goal.Duration;
                        break;
                    case "Distance":
                        goal["value"] = goal.Distance;
                        break;
                    default:
                        goal["value"] = "No goal";
                        break;
                }

                const date = new Date();

                console.log(goal.Date);
                console.log(date);

                if(goal.Date >= date){
                    goal["expired"] = false;
                }else{
                    goal["expired"] = true;
                }
            });

            console.log(goals);
        }

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