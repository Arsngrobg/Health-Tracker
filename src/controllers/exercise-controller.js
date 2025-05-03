const exerciseModel = require('../models/exercise');

exports.addEntry = async(req, res) => {
    const user = res.locals.user;
    const activity = req.body.activity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    try {
        await userModel.addEntry(activity, user.UserID, duration, distance, calories);
    }
    catch (err) {
        console.log(err);
    }
};