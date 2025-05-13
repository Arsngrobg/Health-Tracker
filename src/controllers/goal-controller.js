const goalModel = require('../models/goal');

exports.addGoal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const duration = req.body.duration;
    const distance = req.body.distance;
    const calories = req.body.calories;
    const weight = req.body.weight;
    
    try {
        await goalModel.addGoal(userID, duration, distance, calories, weight);
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
};