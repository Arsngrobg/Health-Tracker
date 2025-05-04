const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const user = res.locals.user;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    const weight = req.body.weight;
    try {
        await userModel.addGoal(user.UserID, duration, distance, calories, weight);
    }
    catch (err) {
        console.log(err);
    }
};