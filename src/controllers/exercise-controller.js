const exerciseModel = require('../models/exercise');

exports.addEntry = async(req, res) => {
    const userID = res.locals.user.UserID;
    let activity = req.body.activity;
    const customActivity = req.body.customActivity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const caloriesBurned = req.body.caloriesBurned;
    const count = req.body.count;

    let calories = caloriesBurned;
    if(req.body.calories) {
        calories = caloriesBurned;
    }
    else {
        calories = caloriesBurned;
        // Insert functions here
    }
    if (customActivity){
        activity = customActivity;
    }
    try {
        await exerciseModel.addEntry(activity, userID, duration || 0, distance || 0, calories, count || 1);
        res.redirect('/exercise');
    }
    catch (err) {
        console.log(err);
    }
};

exports.deleteEntries = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        await exerciseModel.deleteEntries(userID);
    }
    catch (err) {
        console.log(err);
    }
};

exports.weeklyWorkouts = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        const count = await exerciseModel.weeklyWorkouts(userID);
        return count;
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAll = async(req, res, date) => {
    const userID = res.locals?.user?.UserID;
    try {
        const exercises = await exerciseModel.fetchAll(userID, date);
        return exercises;
    }
    catch (err) {
        console.log(err);
    }
};