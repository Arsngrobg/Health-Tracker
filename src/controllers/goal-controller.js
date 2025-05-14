const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const type = req.body.type;
    const date = req.body.date;
    let tempDuration = null;
    let tempDistance = null;
    let tempCaloriesBurned = null;
    let tempCaloriesEaten = null;
    let tempWeight = null;

    switch(type)
    {
        case "Weight":
            tempWeight = req.body.value;
            break;
        case "CaloriesBurned":
            tempCaloriesBurned = req.body.value;
            break;
        case "CaloriesEaten":
            tempCaloriesEaten = req.body.value;
            break;
        case "Distance":
            tempDistance = req.body.value;
            break;
        case "Duration":
            tempDuration = req.body.value;
            break;
    }

    const duration = tempDuration;
    const distance = tempDistance;
    const caloriesBurned = tempCaloriesBurned;
    const caloriesEaten = tempCaloriesEaten;
    const weight = tempWeight;

    try {
        await goalModel.addGoal(userID, type, duration, distance, caloriesBurned, caloriesEaten, weight, date);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAll = async(req, res, date) => {
    const userID = res.locals.user.UserID;
    try {
        const goals = await goalModel.fetchAll(userID, date);
        return goals;
    }
    catch (err) {
        console.log(err);
    }
};

exports.completeGoal = async(req, res) => {
    const goalID = req.body.goalID;
    try{
        await goalModel.completeGoal(goalID);
        res.redirect('/');
    }
    catch (err){
        console.log(err);
    }
};