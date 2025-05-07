const exerciseModel = require('../models/exercise');

const privacySettings = require('../json/privacy-settings.json');

exports.addEntry = async(req, res) => {
    const user = res.locals.user;
    const activity = req.body.activity;
    const duration = req.body.duration;
    const distance = req.body.distance;

    //calculate calories if not stated
    let tempCal = req.body.calories;
    if(req.body.calories)
    {
        tempCal = req.body.calories;
    }else
    {
        tempCal = 10;
    }

    const calories = tempCal;

    try {
        await exerciseModel.addEntry(activity, user.UserID, duration, distance, calories);
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