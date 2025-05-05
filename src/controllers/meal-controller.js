const mealModel = require('../models/meal');

exports.addEntry = async(req, res) => {
    const Name = req.body.Name;
    try {
        await mealModel.addEntry(Name);
        return res.render('../src/views/pages/diet', {
            errorMessage: "added to the database"
        });
    }
    catch (err) {
        console.log(err);
    }
};