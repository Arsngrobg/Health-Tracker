const consumableModel = require('../models/consumable');

exports.addConsumable = async(req, res) => {
    const userID = res.locals.user.UserID;
    const name = req.body.name;
    const type = req.body.type;
    const calories = req.body.calories;
    const fats = req.body.fats;
    const saturates = req.body.saturates;
    const carbohydrates = req.body.carbohydrates;
    const sugar = req.body.sugar;
    const fibre = req.body.fibre;
    const protein = req.body.protein;
    const amount = req.body.amount;
    try {
        await consumableModel.addConsumable(userID, name, type, calories, fats, saturates, carbohydrates, sugar, fibre, protein, amount);
        res.redirect('/diet');
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAll = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        const consumables = await consumableModel.fetchAll(userID);
        return consumables;
    }
    catch (err) {
        console.log(err);
    }
};