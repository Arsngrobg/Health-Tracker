const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const type = req.body.type;
    let duration = 0;
    let distance = 0;
    let caloriesBurned = 0;
    let caloriesEaten = 0;
    let weight = 0;
    const date = req.body.date;
    switch(type)
    {
        case "Duration exercised":
            duration = req.body.value;
            break;
        case "Distance covered":
            distance = req.body.value;
            break;
        case "Calories burned (per day)":
            caloriesBurned = req.body.value;
            break;
        case "Calories eaten (per day)":
            caloriesEaten = req.body.value;
            break;
        case "Target weight":
            weight = req.body.value;
            break;
    }
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