const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const type = req.body.type;
    let tempDuration = null;
    let tempDistance = null;
    let tempCalories = null;
    let tempWeight = null;
    const date = req.body.date;

    switch(type)
    {
        case "Weight":
            tempWeight = req.body.value;
            break;
        case "Calories":
            tempCalories = req.body.value;
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
    const calories = tempCalories;
    const weight = tempWeight;
    
    

    try {
        await goalModel.addGoal(userID, type, duration, distance, calories, weight, date);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAll = async(req, res) => {
    const userID = res.locals.user.UserID;
    try{
        const goals = await goalModel.fetchAll(userID);
        return goals;
    }
    catch (err)
    {
        console.log(err);
    }
};

exports.removeGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const goalID = req.body.duration;
};