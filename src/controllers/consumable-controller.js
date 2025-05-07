const consumableModel = require('../models/consumable');
const fs = require('fs');


exports.addEntry = async(req, res) => {
    const user = res.locals.user.UserID;
    const Name = req.body.Name;
    const Type = req.body.Type;
    const Amount = req.body.Amount;
    const calories = req.body.calories;
    const fats = req.body.fats;
    const carbs = req.body.carbs;
    const fibre = req.body.fibre;
    const saturates = req.body.saturates;
    const sugar = req.body.sugar;
    const protein = req.body.protein;

    try {
        await consumableModel.addEntry(user, Name, Type, Amount, calories, fats, carbs, fibre, saturates, sugar, protein);
        try {
            const count = await consumableModel.getConsumable(user);
            const names = count.map(item => item.Name);
    
            res.render('../src/views/pages/diet', { consumable: names });
    
        }
    
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.log(err);
    }
};


exports.getConsumable = async(req, res) => {
    const user = res.locals.user.UserID;
    try {
        const count = await consumableModel.getConsumable(user);
        const names = count.map(item => item.Name);

        res.render('../src/views/pages/diet', { consumable: names });

    }

    catch (err) {
        console.log(err);
    }
};