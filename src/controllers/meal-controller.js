const mealModel = require('../models/meal');

exports.addEntry = async(req, res) => {
    const user = res.locals.user.UserID;
    const Name = req.body.Name;
    try {
        await mealModel.addEntry(user, Name);
        return res.render('../src/views/pages/diet', {
            errorMessage: "added to the database"
        });
    }
    catch (err) {
        console.log(err);
    }
};