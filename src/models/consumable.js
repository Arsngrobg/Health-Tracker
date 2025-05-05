const db = require('../config/db');
const data = require('../json/food');


const addEntry = async(Name, Type, Amount) => {
    const Consumable = data.find(item => item.item === Name);
    const realamount = Amount / Consumable.perGrams;
    const calories = Consumable.calories * realamount;
    const fats = Consumable.fats * realamount;
    const carbs = Consumable.carbs * realamount;
    const fibre = Consumable.fibre * realamount;
    const saturates = Consumable.saturates * realamount;
    const sugar = Consumable.sugar * realamount;
    const protein = Consumable.protein * realamount;
    try {
        await db.execute('INSERT INTO Consumable (Name, Type, Energy, Fat, Saturates, Carbohydrates, Sugars, Fibre, Protein) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Name, Type, calories, fats, saturates, carbs, sugar, fibre, protein]);
            console.log(Name);
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    addEntry,
}