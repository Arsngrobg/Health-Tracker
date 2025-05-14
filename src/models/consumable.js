const db = require('../config/db');

const addConsumable = async(userID, name, type, calories, fats, saturates, carbohydrates, sugar, fibre, protein, amount) => {
    try {
        await db.execute('INSERT INTO Consumable (UserID, Name, Type, Calories, Fat, Saturates, Carbohydrates, Sugars, Fibre, Protein, Amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userID, name, type, calories, fats, saturates, carbohydrates, sugar, fibre, protein, amount]);
    }
    catch (err) {
        throw err;
    }
};

const fetchAll = async(userID) => {
    try {
        const [result] = await db.query('SELECT * FROM Consumable WHERE UserID = ? OR UserID IS NULL', [userID]);
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};

const getConsumable = async(consumableID) => {
    try {
        const [result] = await db.query('SELECT * FROM Consumable WHERE ConsumableID = ?', [consumableID]);
        if (result.length === 0) {
            return null;
        }
        return result;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
};


module.exports = {
    addConsumable,
    getConsumable,
    fetchAll
}