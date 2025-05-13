const mealModel = require('../models/meal');

exports.addMeal = async(req, res) => {
    const userID = res.locals.user.UserID;
    const name = req.body.name;
    const consumables = req.body.consumables;
    try {
        await mealModel.addMeal(userID, name);
        for (let i = 0; i < consumables.length; i++) {
            const consumableID = consumables[i];
            await mealModel.addMealConsumable(userID, consumableID);
        }
        res.redirect('/diet');
    }
    catch (err) {
        console.log(err);
    }
};

exports.fetchAll = async(req, res) => {
    const userID = res.locals.user.UserID;
    try {
        const meals = await mealModel.fetchAll(userID);
        return meals;
    }
    catch (err) {
        console.log(err);
    }
};