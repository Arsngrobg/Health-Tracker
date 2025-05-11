const dietModel = require('../models/diet');
const consumableModel = require('../models/consumable');
const mealModel = require('../models/meal');

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
    const user = res.locals.user.UserID;
    const Meal = req.body.Meal;


    try {
        await dietModel.addEntry(user, Meal);
        try {
            const count = await consumableModel.getConsumable(user);
            const result = count.map(item => item.Name);
            
            const count2 = await mealModel.getMeal(user)
            const Meals = count2.map(item => item.Name)
                    
            res.render('../src/views/pages/diet', { consumable: result, Meals });
    
        }
    
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.log(err);
    }
};