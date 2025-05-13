const exerciseModel = require('../models/exercise');

const privacySettings = require('../json/privacy-settings.json');

exports.addEntry = async(req, res) => {
    const userID = res.locals.user.UserID;
    const activity = req.body.activity;
    const customActivity = req.body.customActivity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const caloriesBurnt = req.body.caloriesBurnt;
    const count = req.body.count;

    let calories = caloriesBurnt;
    if(req.body.calories) {
        calories = caloriesBurnt;
    }
    else {
        calories = calories;
        // Insert functions here
    }
    if (customActivity){
        activity = customActivity;
    }
    try {
        await exerciseModel.addEntry(activity, userID, duration, distance, calories, count);
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