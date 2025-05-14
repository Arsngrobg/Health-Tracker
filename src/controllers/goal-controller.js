const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const caloriesBurned = req.body.caloriesBurned;
    const caloriesEaten = req.body.caloriesEaten;
    const weight = req.body.weight;
    try {
        await goalModel.addGoal(userID, duration, distance, caloriesBurned, caloriesEaten, weight);
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