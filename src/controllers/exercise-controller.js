const exerciseModel = require('../models/exercise');

const privacySettings = require('../json/privacy-settings.json');

exports.addEntry = async(req, res) => {
    const user = res.locals.user;
    activity = req.body.activity;
    const otheractivity = req.body.otheractivity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    const counting = req.body.count;
    console.log(user)
    console.log(activity)
    console.log(duration)
    console.log(distance)
    console.log(calories)
    console.log(counting)
    console.log(otheractivity)


    //calculate calories if not stated
    let tempCal = req.body.calories;
    if(req.body.calories)
    {
        tempCal = req.body.calories;
    }else
    {
        tempCal = calories;
    }

    if (otheractivity != ""){
        activity = otheractivity
        console.log("done")
    }

    const finalCalories = tempCal;

    try {
        await exerciseModel.addEntry(activity, user.UserID, duration, distance, finalCalories, counting);
        try {
            const count = await exerciseModel.getExercise(user.UserID);
            console.log(count)
            const result = count.map(item => item.Activity);
                
            res.render('../src/views/pages/exercise', { Exercise: result });
                
                    }
        catch (err) {
                console.log(err);
            }
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