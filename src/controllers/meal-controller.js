const mealModel = require('../models/meal');
const consumableModel = require('../models/consumable');

exports.addEntry = async(req, res) => {
    const user = res.locals.user.UserID;
    const Name = req.body.Name;
    const consumable = req.body.Consumables;
    const Grams = req.body.Grams;
    try {
        for (let i = 0; i < consumable.length; i++) {
            const consumableName = consumable[i];
            const grams = Grams[i];
            await mealModel.addEntry(user, Name, consumableName, grams);
        }
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

exports.getMeal = async(req, res) => {
    const user = res.locals.user.UserID;
    console.log(user)
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
};