const exerciseModel = require('../models/exercise');
const userModel = require('../models/user');

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
        calories = 1;
        const weight = await userModel.findWeight(userID);
        console.log(weight)
        if (weight){
            switch (activity) {
                case "Swimming":
                    calories = (duration * weight * 7) / 200;
                    break;
                case "Running":
                    calories = ((distance * 7 * weight) / 60) / 200;
                    break;
                case "Rowing":
                    calories = (distance / 2 * weight) / 25;
                    break;
                case "Walking":
                    calories = (2.5 * duration * weight) / 200;
                    break;
                case "Cycling":
                    calories = (3.5 * duration * weight) / 200;
                    break;
                case "Squats":
                    calories = 8 * duration;
                    break;
                case "Pushups":
                    calories = 7 * duration;
                    break;
                case "Situps":
                    calories = 0.25 * count;
                default:
                    calories = 10;
                    break;
            }
            console.log(calories);
            calories = Math.round(calories);
        }else{
            calories = 10;
        }
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