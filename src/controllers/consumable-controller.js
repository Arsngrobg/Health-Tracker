const consumableModel = require('../models/consumable');

exports.addEntry = async(req, res) => {
    const Name = req.body.Name;
    const Type = req.body.Type;
    const Amount = req.body.Amount;
    try {
        await consumableModel.addEntry(Name, Type, Amount);
        return res.render('../src/views/pages/diet', {
            errorMessage: "added to the database"
        });
    }
    catch (err) {
        console.log(err);
    }
};