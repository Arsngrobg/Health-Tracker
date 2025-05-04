const exerciseModel = require('../models/exercise');

exports.addEntry = async(req, res) => {
    const user = res.locals.user;
    const activity = req.body.activity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    try {
        await exerciseModel.addEntry(activity, user.UserID, duration, distance, calories);
        return res.render('../src/views/pages/exercise', {
            errorMessage: "added to the database"
        });
    }
    catch (err) {
        console.log(err);
    }
};