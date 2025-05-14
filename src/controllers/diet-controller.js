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

exports.fetchAll = async(req, res, date) => {
    const userID = res.locals.user.UserID;
    try {
        const dietEntries = await dietModel.fetchAll(userID, date);
        return dietEntries;
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAllHistory = async(req, res) => {
    const userID = req.session.user.UserID;
    try {
        const rows = dietModel.fetchAllHistory(userID);
        return rows;
    } 
    catch (err) {
        console.log(err);
    }
}