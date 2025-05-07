const mealModel = require('../models/meal');
const consumableModel = require('../models/consumable');

exports.addEntry = async(req, res) => {
    const user = res.locals.user.UserID;
    const Name = req.body.Name;
    try {
        await mealModel.addEntry(user, Name);
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