const dietModel = require('../models/diet');

exports.deleteEntries = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        await dietModel.deleteEntries(userID);
    }
    catch (err) {
        console.log(err);
    }
};

exports.mealsToday = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        const count = await dietModel.mealsToday(userID);
        return count;
    }
    catch (err) {
        console.log(err);
    }
};

exports.addEntry = async(req, res) => {
    const userID = res.locals.user.UserID;
    const mealID = req.body.mealID;
    try {
        await dietModel.addEntry(userID, mealID);
        res.redirect('/diet');
    }
    catch (err) {
        console.log(err);
    }
};