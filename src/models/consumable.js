const db = require('../config/db');


const addEntry = async(user, Name, Type, Amount, calories, fats, carbs, fibre, saturates, sugar, protein) => {
    try {
        await db.execute('INSERT INTO Consumable (UserID, Name, Type, Energy, Fat, Saturates, Carbohydrates, Sugars, Fibre, Protein, Amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user, Name, Type, calories, fats, saturates, carbs, sugar, fibre, protein, Amount]);
            console.log(Name);
    }
    catch (err) {
        throw err;
    }
};


const getConsumable = async(userID) => {
    try {
        const [result] = await db.promise().query('SELECT * FROM Consumable WHERE UserID = ?', [userID]);
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
    addEntry,
}