const exerciseModel = require('../models/diet');

exports.addEntry = async(req, res) => {
    const user = res.locals.user;
    const activity = req.body.activity;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    try {
        await exerciseModel.addEntry(user.UserID, duration, distance, calories);
        return res.render('../src/views/pages/diet', {
            errorMessage: "added to the database"
        });
    }
    catch (err) {
        console.log(err);
    }
};